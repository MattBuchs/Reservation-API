import CoreDatamapper from "./core.datamapper.js";

export default class SessionDatamapper extends CoreDatamapper {
    tableName = "session";

    async addNewDay() {
        try {
            await this.client.query(
                `
            DO $$
            DECLARE
            last_day timestamptz;
            next_day timestamptz;
            room_rec RECORD;
            BEGIN
            -- Trouve le dernier jour enregistré dans la table "session"
            SELECT MAX("day") INTO last_day FROM "session";

            -- Ajoute un jour au dernier jour enregistré pour obtenir le jour suivant
            next_day := last_day + INTERVAL '1 day';

            -- Boucle pour traiter chaque salle
            FOR room_rec IN
                SELECT "id" FROM "room" -- Sélectionner chaque "room_id" dans la table "room"
            LOOP
                -- Insert les enregistrements pour chaque heure de la journée pour cette salle
                INSERT INTO "session" ("day", "hourly_id", "room_id")
                SELECT 
                    DATE(next_day + CAST("hourly"."hour" AS time)) AS "day_hour",
                    "hourly"."id" AS "hourly_id",
                    room_rec."id" AS "room_id" -- Utiliser l'ID de la salle actuelle
                FROM 
                    "hourly_has_room"
                JOIN
                    "hourly" ON "hourly_has_room"."hourly_id" = "hourly"."id"
                WHERE
                    "hourly_has_room"."room_id" = room_rec."id"; -- Limiter aux heures disponibles pour cette salle
            END LOOP;
            END$$;
            `
            );

            return true;
        } catch (err) {
            return false;
        }
    }

    async deletePastDay() {
        try {
            await this.client.query(
                `
            DELETE FROM session
            WHERE DATE_TRUNC('day', day) < CURRENT_DATE - INTERVAL '1 day';
            `
            );

            return true;
        } catch (err) {
            return false;
        }
    }
}

import CoreDatamapper from "./core.datamapper.js";

export default class RoomDatamapper extends CoreDatamapper {
    tableName = "room";

    async getRoomsForDay(date) {
        const result = await this.client.query(
            `
            SELECT "room"."id" AS room_id, "room"."name", "room"."icon",
            TO_CHAR("session"."day", 'YYYY-MM-DD') AS day, "session"."is_blocked",
            "hourly"."hour"
            FROM "room"
            LEFT JOIN "room_has_session" ON "room_has_session"."room_id" = "room"."id"
            LEFT JOIN "session" ON "room_has_session"."session_id" = "session"."id"
            LEFT JOIN "hourly" ON "session"."hourly_id" = "hourly"."id"
            WHERE "session"."day" = $1
            GROUP BY 
                "room"."id", "room"."name", 
                "session"."day", "session"."is_blocked", 
                "hourly"."hour";
            `,
            [date]
        );

        return result.rows;
    }
}

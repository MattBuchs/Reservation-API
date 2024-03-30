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
            LEFT JOIN "session" ON "session"."room_id" = "room"."id"
            LEFT JOIN "hourly" ON "session"."hourly_id" = "hourly"."id"
            WHERE "session"."day" = $1
            GROUP BY 
                "room"."id", "room"."name", 
                "session"."day", "session"."is_blocked", 
                "hourly"."hour"
            ORDER BY "room"."name", "hourly"."hour";
            `,
            [date]
        );

        return result.rows;
    }

    async getPriceWithRoomId(id) {
        const result = await this.client.query(
            `
            SELECT 
                "room"."id" AS room_id,
                MAX("price"."capacity") AS highest_capacity,
                MIN("price"."capacity") AS lowest_capacity,
                JSON_AGG(
                    json_build_object(
                        'price_id', "price"."id",
                        'price', "price"."price",
                        'capacity', "price"."capacity"
                    )
                ) AS prices
            FROM 
                "room"
            LEFT JOIN 
                "price_has_room" ON "price_has_room"."room_id" = "room"."id"
            LEFT JOIN 
                "price" ON "price_has_room"."price_id" = "price"."id"
            WHERE 
                "room"."id" = $1
            GROUP BY 
                "room"."id";
            `,
            [id]
        );

        return result.rows[0];
    }

    async getFarthestDay() {
        const result = await this.client.query(
            `
            SELECT 
                TO_CHAR(GREATEST(MAX("day"), MIN("day")), 'YYYY-MM-DD') AS farthest_day
            FROM 
                "session";
            `
        );

        return result.rows[0].farthest_day;
    }
}

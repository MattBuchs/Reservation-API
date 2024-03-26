import CoreDatamapper from "./core.datamapper.js";

export default class RoomDatamapper extends CoreDatamapper {
    tableName = "room";

    async getRoomsWithDetails() {
        const result = await this.client.query(
            `
            SELECT 
            "room"."id",
            "room"."name", 
            "room"."icon",
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'price', "price"."price",
                    'capacity', "price"."capacity"
                )
            ) AS "prices_and_capacities",
            ARRAY_AGG(DISTINCT "hourly"."id") AS "hourly_ids", 
            ARRAY_AGG(DISTINCT "hourly"."available_time") AS "available_times", 
            ARRAY_AGG(DISTINCT "blockedSlot"."id") AS "blockedSlot_ids", 
            ARRAY_AGG(DISTINCT "blockedSlot"."date") AS "blockedSlot_dates", 
            ARRAY_AGG(DISTINCT "blockedSlot"."hour") AS "blockedSlot_hours"
            FROM "room"
            LEFT JOIN "price_has_room" ON "price_has_room"."room_id" = "room"."id"
            LEFT JOIN "price" ON "price_has_room"."price_id" = "price"."id"
            LEFT JOIN "hourly_has_room" ON "hourly_has_room"."room_id" = "room"."id"
            LEFT JOIN "hourly" ON "hourly_has_room"."hourly_id" = "hourly"."id"
            LEFT JOIN "blockedSlot_has_room" ON "blockedSlot_has_room"."room_id" = "room"."id"
            LEFT JOIN "blockedSlot" ON "blockedSlot_has_room"."blockedSlot_id" = "blockedSlot"."id"
            GROUP BY "room"."id", "room"."name", "room"."icon"
            ORDER BY "room"."id";
            `
        );

        return result.rows;
    }
}

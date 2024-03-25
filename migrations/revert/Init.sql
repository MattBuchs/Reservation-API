-- Revert AngelsGame-Reservation:Init from pg

BEGIN;

DROP TABLE 
    "user",
    "room",
    "reservation",
    "hourly",
    "blockedSlot",
    "room_has_user",
    "hourly_has_room",
    "blockedSlot_has_room",
    "price",
    "price_has_room";

COMMIT;

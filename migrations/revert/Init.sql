-- Revert AngelsGame-Reservation:Init from pg

BEGIN;

DROP TABLE 
    "user",
    "room",
    "price",
    "hourly",
    "session",
    "reservation",
    "room_has_user",
    "room_has_session",
    "hourly_has_room",
    "price_has_room";

COMMIT;

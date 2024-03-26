-- Verify AngelsGame-Reservation:Init on pg

BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM "room" WHERE false;
SELECT * FROM "price" WHERE false;
SELECT * FROM "hourly" WHERE false;
SELECT * FROM "session" WHERE false;
SELECT * FROM "reservation" WHERE false;
SELECT * FROM "room_has_user" WHERE false;
SELECT * FROM "room_has_session" WHERE false;
SELECT * FROM "price_has_room" WHERE false;

ROLLBACK;

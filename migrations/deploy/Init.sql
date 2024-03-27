-- Deploy AngelsGame-Reservation:Init to pg

BEGIN;

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" text NOT NULL UNIQUE,
    "email" text NOT NULL UNIQUE CHECK (
        "email" ~ '^(?:[a-zA-Z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$'
    ),
    "password" text NOT NULL,
    "is_admin" boolean NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "room" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "icon" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "price" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "price" int NOT NULL,
    "capacity" int NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "hourly" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "available_time" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "session" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "day" timestamptz NOT NULL,
    "is_blocked" boolean NOT NULL DEFAULT false,
    "hourly_id" int NOT NULL REFERENCES "hourly"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "reservation" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "email" text NOT NULL CHECK (
        "email" ~ '^(?:[a-zA-Z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$'
    ),
    "phone" int NOT NULL,
    "date" timestamptz NOT NULL,
    "hour" text NOT NULL,
    "number_person" int NOT NULL,
    "discovered" text,
    "room_id" int NOT NULL REFERENCES "room"("id"),
    "session_id" int NOT NULL REFERENCES "session"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

-- CONNECTION TABLES --
CREATE TABLE "room_has_user" (
    "room_id" int NOT NULL REFERENCES "room"("id"),
    "user_id" int NOT NULL REFERENCES "user"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "room_has_session" (
    "room_id" int NOT NULL REFERENCES "room"("id"),
    "session_id" int NOT NULL REFERENCES "session"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "hourly_has_room" (
    "hourly_id" int NOT NULL REFERENCES "hourly"("id"),
    "room_id" int NOT NULL REFERENCES "room"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "price_has_room" (
    "price_id" int NOT NULL REFERENCES "price"("id"),
    "room_id" int NOT NULL REFERENCES "room"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

COMMIT;

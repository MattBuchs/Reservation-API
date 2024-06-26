BEGIN;

INSERT INTO room(name, icon) VALUES
('Agents H98 Absinthe', '/img/absinthe.svg'),
('Le Dragon de l''île mystérieuse', '/img/dragon.svg'),
('Sherlock Holmes', '/img/magnifying-glass.svg'),
('Les Pirates', '/img/pirate.svg'),
('Magie & Sorcellerie', '/img/magic.svg');

INSERT INTO price(price, capacity) VALUES 
(25, 6),
(25, 5),
(27, 4),
(29, 3),
(36, 2),
(20, 5),
(22, 4),
(24, 3),
(30, 2),
(20, 10),
(20, 9),
(20, 8),
(20, 7),
(20, 6),
(24, 5),
(24, 4),
(24, 3);

INSERT INTO hourly(hour) VALUES
('14:00'),
('16:00'),
('18:00'),
('13:45'),
('18:15'),
('20:30');

INSERT INTO hourly_has_room(hourly_id, room_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 3),
(2, 3),
(5, 3),
(6, 3),
(4, 4),
(2, 4),
(5, 4),
(6, 4),
(1, 5),
(2, 5),
(3, 5);

INSERT INTO price_has_room(price_id, room_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(10, 4),
(11, 4),
(12, 4),
(13, 4),
(14, 4),
(15, 4),
(16, 4),
(17, 4),
(10, 5),
(11, 5),
(12, 5),
(13, 5),
(14, 5),
(15, 5),
(16, 5),
(17, 5);

-- Déclaration de la variable pour la date de début (aujourd'hui)
DO $$
DECLARE
  start_date timestamptz := CURRENT_DATE;
  end_date timestamptz := CURRENT_DATE + INTERVAL '3 months';
  room_rec RECORD;
BEGIN
  -- Boucle pour insérer des enregistrements pour chaque jour
  WHILE start_date <= end_date LOOP
    -- Boucle pour traiter chaque salle
    FOR room_rec IN
      SELECT "id" FROM "room" -- Sélectionner chaque "room_id" dans la table "room"
    LOOP
      -- Insertion des enregistrements pour chaque heure de la journée pour cette salle
      INSERT INTO "session" ("day", "hourly_id", "room_id", "is_closed")
      SELECT 
          DATE(start_date + CAST("hourly"."hour" AS time)) AS "day_hour",
          "hourly"."id" AS "hourly_id",
          room_rec."id" AS "room_id", -- Utiliser l'ID de la salle actuelle
          CASE WHEN EXTRACT(DOW FROM start_date) IN (1, 2) THEN true ELSE false END AS "is_closed" -- Si c'est Lundi ou Mardi, mettre is_closed à true, sinon à false
      FROM 
          "hourly_has_room"
      JOIN
          "hourly" ON "hourly_has_room"."hourly_id" = "hourly"."id"
      WHERE
          "hourly_has_room"."room_id" = room_rec."id"; -- Limiter aux heures disponibles pour cette salle

    END LOOP;

    -- Passage au jour suivant
    start_date := start_date + INTERVAL '1 day';
  END LOOP;
END$$;

COMMIT;
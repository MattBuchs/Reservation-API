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

INSERT INTO hourly(available_time) VALUES
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

COMMIT;
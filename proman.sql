DROP TABLE if exists boards;


DROP TABLE if exists users;


DROP TABLE if exists cards;


DROP TABLE if exists statuses;


CREATE TABLE boards (id serial PRIMARY KEY,
                                       title varchar(200) NOT NULL,
                                                          username varchar);


CREATE TABLE users (id serial PRIMARY KEY,
                                      username varchar(200) NOT NULL,
                                                            password varchar(200) NOT NULL,
                                                                                  email varchar(200) NOT NULL);


CREATE TABLE cards (id serial PRIMARY KEY,
                                      board_id integer NOT NULL CONSTRAINT fk_cards_board_id REFERENCES boards,
                                                                                                        status_id integer NOT NULL CONSTRAINT fk_cards_status_id REFERENCES statuses,
                                                                                                                                                                            title varchar(200) NOT NULL,
                                                                                                                                                                                               card_order integer NOT NULL);


CREATE TABLE statuses (id serial PRIMARY KEY,
                                         title varchar(200) NOT NULL,
                                                            board_id integer, username varchar);


INSERT INTO boards (id, title, username)
VALUES (7, 'new try', 'titi');


INSERT INTO boards (id, title, username)
VALUES (8, 'dede', 'titi');


INSERT INTO boards (id, title, username)
VALUES (9, 'sssss', 'titi');


INSERT INTO boards (id, title, username)
VALUES (10, 'gigi', 'gigi');


INSERT INTO boards (id, title, username)
VALUES (11, 'titi', 'titi');


INSERT INTO boards (id, title, username)
VALUES (1, 'Complete the drag and drop', 'public');


INSERT INTO boards (id, title, username)
VALUES (4, 'Deploy to Heroku', 'public');


INSERT INTO boards (id, title, username)
VALUES (2, 'Agile', 'public');


INSERT INTO users (id, username, password, email)
VALUES (1, 'mimi', 'dasadda@dsa', '$2b$12$c7UzEcwgBG9sCv5DPgRX/.Sbf/uhxTl42jwkzWZWN8fvhCpDvmwN6');


INSERT INTO users (id, username, password, email)
VALUES (2, 'titi', '$2b$12$qDQeDiGKPAwvNfqNEHX6feAbug5dHM19jhLQNmKiui132eISfdBFe', 'asdada@dsa');


INSERT INTO users (id, username, password, email)
VALUES (3, 'gigi', '$2b$12$Pn9lcI5RmRfQp9GcacXKPOZODinK0EPVcN1atqCzgRdCmY47Yl9O2', 'xzscxc@asds');


INSERT INTO users (id, username, password, email)
VALUES (4, 'fifi', '$2b$12$WUeayyED5BhsR5cvHgvmuexY7roIPykNYIoi4N.coTZd5gj9llWKG', 'sasa@xa');


INSERT INTO users (id, username, password, email)
VALUES (5, 'didi', '$2b$12$W/092wBWJ06bETCD6R247ePyq/YC2gG52XkPVx0eCz.Eq0RZb8Sje', 'dsfv@112');


INSERT INTO users (id, username, password, email)
VALUES (6, 'sisi', '$2b$12$PqOPke/i/1uHLzFupnyra.4Tpbuin0uRo3JTbtew21WSb9QZ4bwgS', 'dasd@sf');


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (3, 1, 2, 'in progress card', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (4, 1, 3, 'planning', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (5, 1, 4, 'done card 1', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (6, 1, 4, 'done card 1', 2);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (8, 2, 1, 'new card 2', 2);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (9, 2, 2, 'in progress card', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (12, 2, 4, 'done card 1', 2);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (7, 2, 1, 'new card 1', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (10, 2, 3, 'planning', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (11, 2, 4, 'done card 1', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (13, 2, 1, 'NewCafdvfxdvxdvdxvrd', 3);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (1, 1, 1, 'function for drag', 1);


INSERT INTO cards (id, board_id, status_id, title, card_order)
VALUES (2, 1, 1, 'made the board', 2);


INSERT INTO statuses (id, title, board_id, username)
VALUES (3, 'testing', 2, 'public');


INSERT INTO statuses (id, title, board_id, username)
VALUES (1, 'new', 1, 'public');


INSERT INTO statuses (id, title, board_id, username)
VALUES (4, 'done', 2, 'public');


INSERT INTO statuses (id, title, board_id, username)
VALUES (5, 'addColumn', 1, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (6, 'addColumn', 8, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (7, 'addColumn', 9, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (8, 'addColumn', 2, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (9, 'addColumn', 8, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (10, 'new', 10, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (11, 'in progress', 10, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (12, 'testing', 10, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (13, 'done', 10, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (14, 'addColumn', 1, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (2, 'sawdsfsdvdzfvdFVdzfvdfzvfvzs', 1, 'public');


INSERT INTO statuses (id, title, board_id, username)
VALUES (15, 'new', 11, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (16, 'in progress', 11, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (17, 'testing', 11, NULL);


INSERT INTO statuses (id, title, board_id, username)
VALUES (18, 'done', 11, NULL);
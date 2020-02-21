use reimagined_db;

-- password : 1234 
-- below passwords are encrypted one 
INSERT INTO user(firstName, lastName, username, password, createdAt, updatedAt)
VALUES
('Francisco','Ortiz','ffortizn','$2a$12$pQ1Xx.AUpwCAnazrpK.qmOlPC8WzaV/.jtBl3wHHtX2Ozxf149lHS','2020-02-15','2020-02-15'),
('Emily','Yu','bluerainmango','$2a$12$BFsY2u5QidCUaX5CuObPs.cG1/tLMdVDb0D4vYuqL2sX4k6WvBCNi','2020-02-15','2020-02-15'),
('Fabiola','Guzman','fguzmanrs','$2a$12$qgtvnoEhAvmo0X9FiihFPuMA08DxlSBvOw0LDbLD2crlSYnx1sAtq','2020-02-15','2020-02-15'),
('Hayden','Cross','hcross28','$2a$12$/Gmy4NJd8Xj3gLk9x813E./tfRxegTG49bBfv.kGiHB/1lQoFYBlG','2020-02-15','2020-02-15')
;

INSERT INTO movie(title, genreId, popularity, posterPath, releaseDate, createdAt, updatedAt)
VALUES
('Ad Astra','[12,18,9648,878,53]',341.544, '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg','2019-09-17','2020-02-15','2020-02-15'),
('Parasite','[35,18,53]',312.633,'/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg','2019-09-17','2020-02-15','2020-02-15')
;

INSERT INTO review(userId, movieId, grade, createdAt, updatedAt)
VALUES
(1,1,2,'2020-02-15','2020-02-15'),
(1,2,2,'2020-02-15','2020-02-15'),
(2,1,2,'2020-02-15','2020-02-15'),
(2,2,2,'2020-02-15','2020-02-15'),
(3,1,2,'2020-02-15','2020-02-15'),
(3,2,2,'2020-02-15','2020-02-15'),
(4,1,2,'2020-02-15','2020-02-15'),
(4,2,2,'2020-02-15','2020-02-15')
;

INSERT INTO watchlist(userId, movieId, createdAt, updatedAt)
VALUES
(1,1,'2020-02-15','2020-02-15'),
(1,2,'2020-02-15','2020-02-15'),
(2,1,'2020-02-15','2020-02-15'),
(2,2,'2020-02-15','2020-02-15'),
(3,1,'2020-02-15','2020-02-15'),
(3,2,'2020-02-15','2020-02-15'),
(4,1,'2020-02-15','2020-02-15'),
(4,2,'2020-02-15','2020-02-15')
;
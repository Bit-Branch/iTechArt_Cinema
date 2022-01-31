CREATE TABLE Halls
(
    Id         INT IDENTITY (1,1) NOT NULL,
    Name       VARCHAR(100)       NOT NULL,
    SeatsCount INT                NOT NULL,
    CinemaId   INT                NOT NULL
);
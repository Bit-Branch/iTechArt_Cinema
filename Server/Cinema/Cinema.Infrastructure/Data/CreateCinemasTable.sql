CREATE TABLE Cinemas
(
    Id      INT IDENTITY (1,1) NOT NULL,
    Name    VARCHAR(50)        NOT NULL,
    Address VARCHAR(100)       NOT NULL,
    CityId  INT                NOT NULL
);
CREATE TABLE Halls
(
    Id         INT IDENTITY (1,1) NOT NULL,
    Name       VARCHAR(100)       NOT NULL,
    CinemaId   INT                NOT NULL,
    CONSTRAINT PK_Halls PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Halls_Cinemas FOREIGN KEY (CinemaId) REFERENCES Cinemas (Id)
);
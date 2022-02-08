CREATE TABLE Seats
(
    Id         INT IDENTITY (1,1) NOT NULL,
    HallId     INT                NOT NULL,
    SeatTypeId TINYINT            NOT NULL,
    CONSTRAINT PK_Seats PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Seats_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id),
    CONSTRAINT FK_Seats_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes (Id)
);
CREATE TABLE Seats
(
    Id          INT IDENTITY (1,1) NOT NULL,
    HallId      INT                NOT NULL,
    SeatGroupId INT                NOT NULL,
    SeatTypeId  INT                NOT NULL,
    RowName     VARCHAR(15)        NOT NULL,
    SeatNo      SMALLINT           NOT NULL,
    CONSTRAINT PK_Seats PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Seats_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id),
    CONSTRAINT FK_Seats_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes (Id)
);
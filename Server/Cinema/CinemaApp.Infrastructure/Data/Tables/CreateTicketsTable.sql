CREATE TABLE Tickets
(
    Id                 BIGINT IDENTITY (1,1) NOT NULL,
    UserId             INT                   NOT NULL,
    MovieSessionDateId BIGINT                NOT NULL,
    CONSTRAINT PK_Tickets PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Tickets_Users FOREIGN KEY (UserId) REFERENCES Users (Id),
    CONSTRAINT FK_Tickets_MovieSessionDates FOREIGN KEY (MovieSessionDateId) REFERENCES MovieSessionDates (Id)
);
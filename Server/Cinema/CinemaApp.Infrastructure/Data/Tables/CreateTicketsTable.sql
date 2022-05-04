CREATE TABLE Tickets
(
    Id             BIGINT IDENTITY (1,1) NOT NULL,
    UserId         INT                   NOT NULL,
    MovieSessionId BIGINT                NOT NULL,
    CONSTRAINT PK_Tickets PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Tickets_Users FOREIGN KEY (UserId) REFERENCES Users (Id) ON DELETE CASCADE,
    CONSTRAINT FK_Tickets_MovieSessions FOREIGN KEY (MovieSessionId) REFERENCES MovieSessions (Id) ON DELETE CASCADE
);
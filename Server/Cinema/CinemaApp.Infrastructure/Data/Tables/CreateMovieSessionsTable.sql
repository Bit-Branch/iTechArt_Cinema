CREATE TABLE MovieSessions
(
    Id       BIGINT IDENTITY (1,1) NOT NULL,
    StartShowingTime DATETIME2     NOT NULL,
    EndShowingTime DATETIME2       NOT NULL,
    MovieId     INT                    NULL,
    HallId      INT                    NULL,
    CONSTRAINT PK_MovieSessions PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_MovieSessions_Movies FOREIGN KEY (MovieId) REFERENCES Movies (Id) ON DELETE SET NULL,
    CONSTRAINT FK_MovieSessions_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id) ON DELETE SET NULL
);
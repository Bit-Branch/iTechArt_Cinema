CREATE TABLE MovieSessions
(
    Id       BIGINT IDENTITY (1,1) NOT NULL,
    ShowTime TIME(0)               NOT NULL,
    ShowDate DATE                  NOT NULL,
    MovieId  INT                   NOT NULL,
    HallId   INT                   NOT NULL,
    CONSTRAINT PK_MovieSessions PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_MovieSessions_Movies FOREIGN KEY (MovieId) REFERENCES Movies (Id),
    CONSTRAINT FK_MovieSessions_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id)
);
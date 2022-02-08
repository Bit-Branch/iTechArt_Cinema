CREATE TABLE MovieSessionDates
(
    Id             BIGINT IDENTITY (1,1) NOT NULL,
    ShowDate       DATE                  NOT NULL,
    MovieSessionId INT                   NOT NULL,
    CONSTRAINT PK_MovieSessionDates PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_MovieSessionDates_MovieSessions FOREIGN KEY (MovieSessionId) REFERENCES MovieSessions (Id)
);
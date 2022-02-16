CREATE TABLE MovieCovers
(
    MovieId INT UNIQUE     NOT NULL,
    Cover   VARBINARY(MAX) NOT NULL,
    CONSTRAINT FK_MovieCovers_Movies FOREIGN KEY (MovieId) REFERENCES Movies (Id)
);
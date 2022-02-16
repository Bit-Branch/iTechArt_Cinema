CREATE TABLE Movies
(
    Id                INT IDENTITY (1,1) NOT NULL,
    Title             VARCHAR(100)       NOT NULL,
    ImageId           BIGINT             NOT NULL,
    Description       VARCHAR(1000)      NOT NULL,
    StartDate         DATE               NOT NULL,
    EndDate           DATE               NOT NULL,
    DurationInMinutes SMALLINT           NOT NULL,
    GenreId           INT                NOT NULL,
    CONSTRAINT PK_Movies PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Movies_Genres FOREIGN KEY (GenreId) REFERENCES Genres (Id),
    CONSTRAINT FK_Movies_Images FOREIGN KEY (ImageId) REFERENCES Images (Id)
);
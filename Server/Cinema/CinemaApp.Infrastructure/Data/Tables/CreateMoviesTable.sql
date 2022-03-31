CREATE TABLE Movies
(
    Id                     INT IDENTITY (1,1) NOT NULL,
    Title                  NVARCHAR(100)      NOT NULL,
    ImageId                BIGINT                 NULL,
    Description            NVARCHAR(1000)     NOT NULL,
    ShowInCinemasStartDate DATE               NOT NULL,
    ShowInCinemasEndDate   DATE               NOT NULL,
    DurationInMinutes      SMALLINT           NOT NULL,
    GenreId                INT                NOT NULL,
    CONSTRAINT PK_Movies PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Movies_Genres FOREIGN KEY (GenreId) REFERENCES Genres (Id),
    CONSTRAINT FK_Movies_Images FOREIGN KEY (ImageId) REFERENCES Images (Id)
);
CREATE TABLE CinemaFavors
(
    CinemaId INT            NOT NULL,
    FavorId  SMALLINT       NOT NULL,
    Price    DECIMAL(18, 4) NOT NULL,
    CONSTRAINT PK_CinemaFavors PRIMARY KEY CLUSTERED (CinemaId ASC, FavorId ASC),
    CONSTRAINT FK_CinemaFavors_Cinemas FOREIGN KEY (CinemaId) REFERENCES Cinemas (Id),
    CONSTRAINT FK_CinemaFavors_Favors FOREIGN KEY (FavorId) REFERENCES Favors (Id)
);
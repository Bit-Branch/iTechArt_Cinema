CREATE TABLE Cinemas
(
    Id      INT IDENTITY (1,1) NOT NULL,
    Name    VARCHAR(50)        NOT NULL,
    Address VARCHAR(100)       NOT NULL,
    CityId  SMALLINT           NOT NULL,
    CONSTRAINT PK_Cinemas PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Cinemas_Cities FOREIGN KEY (CityId) REFERENCES Cities (Id)
);
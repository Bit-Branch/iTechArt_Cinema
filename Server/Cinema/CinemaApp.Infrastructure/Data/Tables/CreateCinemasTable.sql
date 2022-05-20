CREATE TABLE Cinemas
(
    Id      INT IDENTITY (1,1) NOT NULL,
    Name    NVARCHAR(50)       NOT NULL,
    Address NVARCHAR(100)      NOT NULL,
    CityId  INT                    NULL,
    CONSTRAINT PK_Cinemas PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Cinemas_Cities FOREIGN KEY (CityId) REFERENCES Cities (Id) ON DELETE SET NULL
);
﻿CREATE TABLE Genres
(
    Id   INT IDENTITY (1,1) NOT NULL,
    Name NVARCHAR(30)       NOT NULL,
    CONSTRAINT PK_Genres PRIMARY KEY CLUSTERED (Id ASC)
);
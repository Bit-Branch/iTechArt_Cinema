﻿CREATE TABLE Genres
(
    Id   TINYINT IDENTITY (1,1) NOT NULL,
    Name VARCHAR(30)            NOT NULL,
    CONSTRAINT PK_Genres PRIMARY KEY CLUSTERED (Id ASC)
);
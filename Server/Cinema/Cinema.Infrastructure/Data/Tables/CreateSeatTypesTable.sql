﻿CREATE TABLE SeatTypes
(
    Id   TINYINT IDENTITY (1,1) NOT NULL,
    Name VARCHAR(50)            NOT NULL,
    CONSTRAINT PK_SeatTypes PRIMARY KEY CLUSTERED (Id ASC)
);
CREATE TABLE Favors
(
    Id          SMALLINT IDENTITY (1,1) NOT NULL,
    Name        VARCHAR(100)       NOT NULL,
    Description VARCHAR(100)       NOT NULL,
    Image       VARBINARY(MAX)     NULL,
    CONSTRAINT PK_Favors PRIMARY KEY CLUSTERED ( Id ASC )
);
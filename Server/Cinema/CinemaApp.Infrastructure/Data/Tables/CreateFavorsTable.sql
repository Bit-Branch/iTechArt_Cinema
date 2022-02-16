CREATE TABLE Favors
(
    Id          INT IDENTITY (1,1) NOT NULL,
    Name        VARCHAR(100)       NOT NULL,
    Description VARCHAR(100)       NOT NULL,
    ImageId     BIGINT             NOT NULL,
    CONSTRAINT PK_Favors PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Favors_Images FOREIGN KEY (ImageId) REFERENCES Images (Id)
);
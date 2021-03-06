CREATE TABLE Favors
(
    Id          INT IDENTITY (1,1) NOT NULL,
    Name        NVARCHAR(100)      NOT NULL,
    Description NVARCHAR(100)      NOT NULL,
    ImageId     BIGINT                 NULL,
    CONSTRAINT PK_Favors PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Favors_Images FOREIGN KEY (ImageId) REFERENCES Images (Id)
);
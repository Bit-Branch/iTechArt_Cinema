CREATE TABLE Images
(
    Id      BIGINT IDENTITY (1,1) NOT NULL,
    Content VARBINARY(MAX)        NOT NULL,
    CONSTRAINT PK_Images PRIMARY KEY CLUSTERED (Id ASC)
);
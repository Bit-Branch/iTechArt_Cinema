CREATE TABLE Services
(
    Id          INT IDENTITY (1,1) NOT NULL,
    Name        VARCHAR(100)       NOT NULL,
    Description VARCHAR(100)       NOT NULL,
    Image       VARBINARY(MAX)     NULL
);
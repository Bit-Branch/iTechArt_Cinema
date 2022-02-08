CREATE TABLE Users
(
    Id           INT IDENTITY (1,1) NOT NULL,
    Email        VARCHAR(254)       NOT NULL,
    PasswordHash CHAR(60)           NOT NULL,
    Role         VARCHAR(20)        NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY CLUSTERED (Id ASC)
);
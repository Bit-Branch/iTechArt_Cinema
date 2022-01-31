CREATE TABLE Movies
(
    Id                INT IDENTITY (1,1) NOT NULL,
    Title             VARCHAR(100)  NOT NULL,
    Cover             VARBINARY (MAX) NULL,
    Description       VARCHAR(1000) NOT NULL,
    StartDate         DATE          NOT NULL,
    EndDate           DATE          NOT NULL,
    DurationInMinutes INT           NOT NULL,
    GenreId           INT   NOT NULL,
);
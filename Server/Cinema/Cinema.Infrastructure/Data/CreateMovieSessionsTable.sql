CREATE TABLE MovieSessions
(
    Id           INT IDENTITY (1,1) NOT NULL,
    ShowDateTime DATETIME2          NOT NULL,
    TicketPrice  DECIMAL(18, 4)     NULL,
    MovieId      INT                NOT NULL,
    CinemaId     INT                NOT NULL,
    HallId       INT                NOT NULL
);
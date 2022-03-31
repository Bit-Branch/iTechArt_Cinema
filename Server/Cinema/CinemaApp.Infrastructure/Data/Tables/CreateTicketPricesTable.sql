CREATE TABLE TicketPrices
(
    MovieSessionId BIGINT         NOT NULL,
    SeatTypeId     INT            NOT NULL,
    Price          DECIMAL(18, 4) NOT NULL,
    CONSTRAINT PK_TicketPrices PRIMARY KEY CLUSTERED (MovieSessionId ASC, SeatTypeId ASC),
    CONSTRAINT FK_TicketPrices_MovieSessions FOREIGN KEY (MovieSessionId) REFERENCES MovieSessions (Id),
    CONSTRAINT FK_TicketPrices_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes (Id)
);
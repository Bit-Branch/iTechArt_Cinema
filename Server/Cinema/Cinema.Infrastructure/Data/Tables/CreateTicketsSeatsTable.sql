CREATE TABLE TicketsSeats
(
    TicketId BIGINT NOT NULL,
    SeatId   INT NOT NULL,
    IsBooked BIT NOT NULL,
    CONSTRAINT PK_TicketsSeats PRIMARY KEY CLUSTERED (TicketId ASC, SeatId ASC),
    CONSTRAINT FK_TicketsSeats_Tickets FOREIGN KEY (TicketId) REFERENCES Tickets (Id),
    CONSTRAINT FK_TicketsSeats_Seats FOREIGN KEY (SeatId) REFERENCES Seats (Id)
);
CREATE TABLE Users
(
    Id           INT IDENTITY (1,1) NOT NULL,
    Email        VARCHAR(254)       NOT NULL,
    PasswordHash CHAR(60)           NOT NULL,
    Role         VARCHAR(20)        NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Cities
(
    Id   SMALLINT IDENTITY (1,1) NOT NULL,
    Name VARCHAR(189)            NOT NULL,
    CONSTRAINT PK_Cities PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Favors
(
    Id          SMALLINT IDENTITY (1,1) NOT NULL,
    Name        VARCHAR(100)            NOT NULL,
    Description VARCHAR(100)            NOT NULL,
    Image       VARBINARY(MAX)          NULL,
    CONSTRAINT PK_Favors PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Genres
(
    Id   TINYINT IDENTITY (1,1) NOT NULL,
    Name VARCHAR(30)            NOT NULL,
    CONSTRAINT PK_Genres PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE SeatTypes
(
    Id   TINYINT IDENTITY (1,1) NOT NULL,
    Name VARCHAR(50)            NOT NULL,
    CONSTRAINT PK_SeatTypes PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Cinemas
(
    Id      INT IDENTITY (1,1) NOT NULL,
    Name    VARCHAR(50)        NOT NULL,
    Address VARCHAR(100)       NOT NULL,
    CityId  SMALLINT           NOT NULL,
    CONSTRAINT PK_Cinemas PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Cinemas_Cities FOREIGN KEY (CityId) REFERENCES Cities (Id)
);

CREATE TABLE CinemaFavors
(
    CinemaId INT            NOT NULL,
    FavorId  SMALLINT       NOT NULL,
    Price    DECIMAL(18, 4) NOT NULL,
    CONSTRAINT PK_CinemaFavors PRIMARY KEY CLUSTERED (CinemaId ASC, FavorId ASC),
    CONSTRAINT FK_CinemaFavors_Cinemas FOREIGN KEY (CinemaId) REFERENCES Cinemas (Id),
    CONSTRAINT FK_CinemaFavors_Favors FOREIGN KEY (FavorId) REFERENCES Favors (Id)
);

CREATE TABLE Halls
(
    Id       INT IDENTITY (1,1) NOT NULL,
    Name     VARCHAR(100)       NOT NULL,
    CinemaId INT                NOT NULL,
    CONSTRAINT PK_Halls PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Halls_Cinemas FOREIGN KEY (CinemaId) REFERENCES Cinemas (Id)
);

CREATE TABLE Seats
(
    Id         INT IDENTITY (1,1) NOT NULL,
    HallId     INT                NOT NULL,
    SeatTypeId TINYINT            NOT NULL,
    CONSTRAINT PK_Seats PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Seats_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id),
    CONSTRAINT FK_Seats_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes (Id)
);

CREATE TABLE Movies
(
    Id                INT IDENTITY (1,1) NOT NULL,
    Title             VARCHAR(100)       NOT NULL,
    Cover             VARBINARY(MAX)     NULL,
    Description       VARCHAR(1000)      NOT NULL,
    StartDate         DATE               NOT NULL,
    EndDate           DATE               NOT NULL,
    DurationInMinutes SMALLINT           NOT NULL,
    GenreId           TINYINT            NOT NULL,
    CONSTRAINT PK_Movies PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Movies_Genres FOREIGN KEY (GenreId) REFERENCES Genres (Id)
);

CREATE TABLE MovieSessions
(
    Id       INT IDENTITY (1,1) NOT NULL,
    ShowTime TIME(0)            NOT NULL,
    MovieId  INT                NOT NULL,
    HallId   INT                NOT NULL,
    CONSTRAINT PK_MovieSessions PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_MovieSessions_Movies FOREIGN KEY (MovieId) REFERENCES Movies (Id),
    CONSTRAINT FK_MovieSessions_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id)
);

CREATE TABLE MovieSessionDates
(
    Id             BIGINT IDENTITY (1,1) NOT NULL,
    ShowDate       DATE                  NOT NULL,
    MovieSessionId INT                   NOT NULL,
    CONSTRAINT PK_MovieSessionDates PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_MovieSessionDates_MovieSessions FOREIGN KEY (MovieSessionId) REFERENCES MovieSessions (Id)
);

CREATE TABLE Tickets
(
    Id                 BIGINT IDENTITY (1,1) NOT NULL,
    UserId             INT                   NOT NULL,
    MovieSessionDateId BIGINT                NOT NULL,
    SeatId             INT                   NOT NULL,
    CONSTRAINT PK_Tickets PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Tickets_Users FOREIGN KEY (UserId) REFERENCES Users (Id),
    CONSTRAINT FK_Tickets_MovieSessionDates FOREIGN KEY (MovieSessionDateId) REFERENCES MovieSessionDates (Id),
    CONSTRAINT FK_Tickets_Seats FOREIGN KEY (SeatId) REFERENCES Seats (Id)
);

CREATE TABLE TicketsSeats
(
    TicketId BIGINT NOT NULL,
    SeatId   INT    NOT NULL,
    IsBooked BIT    NOT NULL,
    CONSTRAINT PK_TicketsSeats PRIMARY KEY CLUSTERED (TicketId ASC, SeatId ASC),
    CONSTRAINT FK_TicketsSeats_Tickets FOREIGN KEY (TicketId) REFERENCES Tickets (Id),
    CONSTRAINT FK_TicketsSeats_Seats FOREIGN KEY (SeatId) REFERENCES Seats (Id)
);

CREATE TABLE TicketPrices
(
    MovieSessionId INT            NOT NULL,
    SeatTypeId     TINYINT        NOT NULL,
    Price          DECIMAL(18, 4) NOT NULL,
    CONSTRAINT PK_TicketPrices PRIMARY KEY CLUSTERED (MovieSessionId ASC, SeatTypeId ASC),
    CONSTRAINT FK_TicketPrices_MovieSessions FOREIGN KEY (MovieSessionId) REFERENCES MovieSessions (Id),
    CONSTRAINT FK_TicketPrices_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes (Id)
);
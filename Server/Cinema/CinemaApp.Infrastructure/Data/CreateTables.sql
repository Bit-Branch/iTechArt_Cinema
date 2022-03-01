CREATE TABLE Users
(
    Id           INT IDENTITY (1,1) NOT NULL,
    Email        NVARCHAR(254)      NOT NULL,
    PasswordHash CHAR(60)           NOT NULL,
    Role         NVARCHAR(20)       NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Cities
(
    Id   INT IDENTITY (1,1) NOT NULL,
    Name NVARCHAR(189)      NOT NULL,
    CONSTRAINT PK_Cities PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Images
(
    Id      BIGINT IDENTITY (1,1) NOT NULL,
    Content VARBINARY(MAX)        NOT NULL,
    CONSTRAINT PK_Images PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Favors
(
    Id          INT IDENTITY (1,1) NOT NULL,
    Name        NVARCHAR(100)      NOT NULL,
    Description NVARCHAR(100)      NOT NULL,
    ImageId     BIGINT             NOT NULL,
    CONSTRAINT PK_Favors PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Favors_Images FOREIGN KEY (ImageId) REFERENCES Images (Id)
);

CREATE TABLE Genres
(
    Id   INT IDENTITY (1,1) NOT NULL,
    Name NVARCHAR(30)       NOT NULL,
    CONSTRAINT PK_Genres PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE SeatTypes
(
    Id   INT IDENTITY (1,1) NOT NULL,
    Name NVARCHAR(50)       NOT NULL,
    CONSTRAINT PK_SeatTypes PRIMARY KEY CLUSTERED (Id ASC)
);

CREATE TABLE Cinemas
(
    Id      INT IDENTITY (1,1) NOT NULL,
    Name    NVARCHAR(50)       NOT NULL,
    Address NVARCHAR(100)      NOT NULL,
    CityId  INT                NOT NULL,
    CONSTRAINT PK_Cinemas PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Cinemas_Cities FOREIGN KEY (CityId) REFERENCES Cities (Id)
);

CREATE TABLE CinemaFavors
(
    CinemaId INT            NOT NULL,
    FavorId  INT            NOT NULL,
    Price    DECIMAL(18, 4) NOT NULL,
    CONSTRAINT PK_CinemaFavors PRIMARY KEY CLUSTERED (CinemaId ASC, FavorId ASC),
    CONSTRAINT FK_CinemaFavors_Cinemas FOREIGN KEY (CinemaId) REFERENCES Cinemas (Id),
    CONSTRAINT FK_CinemaFavors_Favors FOREIGN KEY (FavorId) REFERENCES Favors (Id)
);

CREATE TABLE Halls
(
    Id       INT IDENTITY (1,1) NOT NULL,
    Name     NVARCHAR(100)      NOT NULL,
    CinemaId INT                NOT NULL,
    CONSTRAINT PK_Halls PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Halls_Cinemas FOREIGN KEY (CinemaId) REFERENCES Cinemas (Id)
);

CREATE TABLE Seats
(
    Id         BIGINT IDENTITY (1,1) NOT NULL,
    HallId     INT                   NOT NULL,
    SeatTypeId INT                   NOT NULL,
    RowName    NVARCHAR(15)          NOT NULL,
    SeatNo     SMALLINT              NOT NULL,
    CONSTRAINT PK_Seats PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Seats_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id),
    CONSTRAINT FK_Seats_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes (Id)
);

CREATE TABLE Movies
(
    Id                     INT IDENTITY (1,1) NOT NULL,
    Title                  NVARCHAR(100)      NOT NULL,
    ImageId                BIGINT             NOT NULL,
    Description            NVARCHAR(1000)     NOT NULL,
    ShowInCinemasStartDate DATE               NOT NULL,
    ShowInCinemasEndDate   DATE               NOT NULL,
    DurationInMinutes      SMALLINT           NOT NULL,
    GenreId                INT                NOT NULL,
    CONSTRAINT PK_Movies PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Movies_Genres FOREIGN KEY (GenreId) REFERENCES Genres (Id),
    CONSTRAINT FK_Movies_Images FOREIGN KEY (ImageId) REFERENCES Images (Id)
);

CREATE TABLE MovieSessions
(
    Id       BIGINT IDENTITY (1,1) NOT NULL,
    ShowTime TIME(0)               NOT NULL,
    ShowDate DATE                  NOT NULL,
    MovieId  INT                   NOT NULL,
    HallId   INT                   NOT NULL,
    CONSTRAINT PK_MovieSessions PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_MovieSessions_Movies FOREIGN KEY (MovieId) REFERENCES Movies (Id),
    CONSTRAINT FK_MovieSessions_Halls FOREIGN KEY (HallId) REFERENCES Halls (Id)
);


CREATE TABLE Tickets
(
    Id             BIGINT IDENTITY (1,1) NOT NULL,
    UserId         INT                   NOT NULL,
    MovieSessionId BIGINT                NOT NULL,
    CONSTRAINT PK_Tickets PRIMARY KEY CLUSTERED (Id ASC),
    CONSTRAINT FK_Tickets_Users FOREIGN KEY (UserId) REFERENCES Users (Id),
    CONSTRAINT FK_Tickets_MovieSessions FOREIGN KEY (MovieSessionId) REFERENCES MovieSessions (Id)
);

CREATE TABLE TicketsSeats
(
    TicketId BIGINT NOT NULL,
    SeatId   BIGINT NOT NULL,
    IsBooked BIT    NOT NULL,
    CONSTRAINT PK_TicketsSeats PRIMARY KEY CLUSTERED (TicketId ASC, SeatId ASC),
    CONSTRAINT FK_TicketsSeats_Tickets FOREIGN KEY (TicketId) REFERENCES Tickets (Id),
    CONSTRAINT FK_TicketsSeats_Seats FOREIGN KEY (SeatId) REFERENCES Seats (Id)
);

CREATE TABLE TicketPrices
(
    MovieSessionId BIGINT         NOT NULL,
    SeatTypeId     INT            NOT NULL,
    Price          DECIMAL(18, 4) NOT NULL,
    CONSTRAINT PK_TicketPrices PRIMARY KEY CLUSTERED (MovieSessionId ASC, SeatTypeId ASC),
    CONSTRAINT FK_TicketPrices_MovieSessions FOREIGN KEY (MovieSessionId) REFERENCES MovieSessions (Id),
    CONSTRAINT FK_TicketPrices_SeatTypes FOREIGN KEY (SeatTypeId) REFERENCES SeatTypes (Id)
);
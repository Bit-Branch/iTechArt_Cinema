﻿namespace Cinema.Domain.Settings
{
    public class JwtSettings
    {
        public const string Position = "JWTSettings";
        public string SecurityKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int ExpiryInMinutes { get; set; }
    }
}
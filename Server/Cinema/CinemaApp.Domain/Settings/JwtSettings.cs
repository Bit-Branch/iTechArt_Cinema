namespace CinemaApp.Domain.Settings
{
    public class JwtSettings
    {
        public const string Position = "JWTSettings";
        public string SecurityKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public TimeSpan ExpireIn { get; set; }
    }
}
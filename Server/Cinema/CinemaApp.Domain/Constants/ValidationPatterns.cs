namespace CinemaApp.Domain.Constants
{
    public static class ValidationPatterns
    {
        public const string PasswordValidationPattern = @"^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$";
    }
}
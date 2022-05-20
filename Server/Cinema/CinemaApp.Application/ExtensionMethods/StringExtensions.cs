namespace CinemaApp.Application.ExtensionMethods
{
    public static class StringExtensions
    {
        public static string CapitalizeFirstLetter(this string value)
        {
            return value.Length > 1
                ? $"{char.ToUpper(value[0])}{value.Substring(1)}"
                : char.ToUpper(value[0]).ToString();
        }
    }
}
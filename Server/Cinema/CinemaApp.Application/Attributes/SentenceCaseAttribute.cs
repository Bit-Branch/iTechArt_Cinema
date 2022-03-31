using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.Attributes
{
    public class SentenceCaseAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string text)
            {
                if (Char.IsLower(text[0]))
                {
                    return new ValidationResult("String should start with uppercase character.");
                }

                return ValidationResult.Success;
            }

            return new ValidationResult(
                $"Invalid field type. Expected ${typeof(string)}, but gained ${value?.GetType()}."
            );
        }
    }
}
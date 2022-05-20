using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace CinemaApp.Application.Attributes
{
    public class AllowedYearRangeAttribute : ValidationAttribute
    {
        private readonly int _minYear;
        private readonly int _maxYear;

        public AllowedYearRangeAttribute(int minYear, [Optional] int maxYear)
        {
            _minYear = minYear;
            _maxYear = maxYear != 0 ? maxYear : DateTime.UtcNow.Year;
        }

        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (int.TryParse(value?.ToString(), out int year))
            {
                if (year < _minYear || year > _maxYear)
                {
                    return new ValidationResult($"Year should be between ${_minYear} and ${_maxYear}");
                }

                return ValidationResult.Success;
            }

            return new ValidationResult(
                $"Invalid field type. Expected ${typeof(int)}, but gained ${value?.GetType()}."
            );
        }
    }
}
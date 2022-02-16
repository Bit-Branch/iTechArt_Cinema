using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.Attributes
{
    public class MaxFileSizeAttribute : ValidationAttribute
    {
        private readonly double _maxFileSize;

        public MaxFileSizeAttribute(double maxFileSize)
        {
            _maxFileSize = maxFileSize;
        }

        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IFormFile file)
            {
                if (file.Length > _maxFileSize)
                {
                    return new ValidationResult($"Maximum allowed file size is {_maxFileSize} bytes.");
                }

                return ValidationResult.Success;
            }

            return new ValidationResult(
                $"Invalid field type. Expected ${typeof(IFormFile)}, but gained ${value?.GetType()}."
            );
        }
    }
}
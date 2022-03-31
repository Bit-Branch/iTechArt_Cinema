using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.Attributes
{
    public class MaxFileSizeInMegabytesAttribute : ValidationAttribute
    {
        private readonly double _maxFileSize;

        public MaxFileSizeInMegabytesAttribute(double maxFileSize)
        {
            _maxFileSize = maxFileSize;
        }

        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IFormFile file)
            {
                //converting _maxFileSize from megabytes to bytes
                if (file.Length > _maxFileSize * Math.Pow(1024, 2))
                {
                    return new ValidationResult($"Maximum allowed file size is {_maxFileSize} megabytes.");
                }

                return ValidationResult.Success;
            }

            return new ValidationResult(
                $"Invalid field type. Expected ${typeof(IFormFile)}, but gained ${value?.GetType()}."
            );
        }
    }
}
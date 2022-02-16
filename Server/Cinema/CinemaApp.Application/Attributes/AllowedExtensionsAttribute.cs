using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.Attributes
{
    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] _extensions;

        public AllowedExtensionsAttribute(string[] extensions)
        {
            _extensions = extensions;
        }

        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IFormFile file)
            {
                var extension = Path.GetExtension(file.FileName);

                if (!_extensions.Contains(extension.ToLower()))
                {
                    return new ValidationResult(
                        $"This image extension type is not allowed! You can use only {string.Join(",", _extensions)}"
                    );
                }

                return ValidationResult.Success;
            }

            return new ValidationResult(
                $"Invalid field type. Expected ${typeof(IFormFile)}, but gained ${value?.GetType()}."
            );
        }
    }
}
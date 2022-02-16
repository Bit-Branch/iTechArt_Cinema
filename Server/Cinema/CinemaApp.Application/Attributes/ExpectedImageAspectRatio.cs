using Microsoft.AspNetCore.Http;
using System.Drawing;
using System.ComponentModel.DataAnnotations;

namespace CinemaApp.Application.Attributes
{
    public class ExpectedImageAspectRatio : ValidationAttribute
    {
        private readonly int _expectedRatioX;
        private readonly int _expectedRatioY;

        public ExpectedImageAspectRatio(int expectedRatioX, int expectedRatioY)
        {
            _expectedRatioX = expectedRatioX;
            _expectedRatioY = expectedRatioY;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IFormFile file)
            {
                using (var image = Image.FromStream(file.OpenReadStream()))
                {
                    var actualRatio = image.Width / image.Height;

                    var expectedRatio = _expectedRatioX / _expectedRatioY;

                    if (Math.Abs(actualRatio - expectedRatio) > 0.1)
                    {
                        return new ValidationResult(
                            $"Invalid image aspect ratio. It should be {_expectedRatioX}:{_expectedRatioY}."
                        );
                    }

                    return ValidationResult.Success;
                }
            }

            return new ValidationResult(
                $"Invalid field type. Expected ${typeof(IFormFile)}, but gained ${value?.GetType()}."
            );
        }
    }
}
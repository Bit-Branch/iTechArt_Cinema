import { FileInput } from 'ngx-material-file-input';

import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export function aspectRatioValidator(expectedAspectRatioX: number, expectedAspectRatioY: number): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const image = (control.value as FileInput)?.files[0];
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      return new Promise(
        resolve => {
          reader.onload = async function (event: ProgressEvent<FileReader>) {
            const image = new Image();
            image.src = event.target?.result as string;
            image.onload = function (event) {
              const loadedImage = event.currentTarget as HTMLImageElement;
              const actualAspectRatio = loadedImage.width / loadedImage.height;
              const expectedAspectRatio = expectedAspectRatioX / expectedAspectRatioY;
              // is calculated and expected ratio are approximately equal (calculation error no more than 0.1)
              resolve(
                Math.abs(expectedAspectRatio - actualAspectRatio) <= 0.1
                  ? null
                  : { invalidAspectRatio: { expectedAspectRatioX, expectedAspectRatioY } }
              );
            };
          };
        }
      );
    } else {
      return Promise.resolve(null);
    }
  };
}

import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Image } from '@core/models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  checkImageAspectRatio(
    url: string,
    fileInput: AbstractControl,
    expectedAspectRatioX: number,
    expectedAspectRatioY: number
  ) {
    const image = new Image();
    image.src = url;
    image.onload = (event) => {
      const loadedImage = event.currentTarget as HTMLImageElement;
      const actualAspectRatio = loadedImage.width / loadedImage.height;
      const expectedAspectRatio = expectedAspectRatioX / expectedAspectRatioY;
      if (Math.abs(expectedAspectRatio - actualAspectRatio) < 0.1) {
        fileInput?.setErrors({ invalidAspectRatio: null });
        fileInput?.updateValueAndValidity();
      } else {
        fileInput?.setErrors({ invalidAspectRatio: true });
      }
    };
  }
}

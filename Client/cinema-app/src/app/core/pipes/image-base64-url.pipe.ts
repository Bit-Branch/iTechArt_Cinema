import { Pipe, PipeTransform } from '@angular/core';

import { checkIsBase64String } from '@core/utils/check-is-base64-string';

/**
 * Pipe to transform image Base64 data to its data url analog
 */
@Pipe({
  name: 'imageBase64Url'
})
export class ImageBase64UrlPipe implements PipeTransform {
  transform(value: string, defaultUrl?: string): string {
    if (value) {
      return checkIsBase64String(value) ? `data:image/jpg;base64,${value}` : value;
    }
    return defaultUrl ? defaultUrl : '';
  }
}

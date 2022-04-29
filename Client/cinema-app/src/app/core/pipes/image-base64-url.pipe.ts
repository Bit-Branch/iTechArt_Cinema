import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to transform image Base64 data to its data url analog
 */
@Pipe({
  name: 'imageBase64Url'
})
export class ImageBase64UrlPipe implements PipeTransform {
  transform(value: string, defaultUrl?: string): string {
    if (value) {
      return this.isBase64(value) ? `data:image/jpg;base64,${value}` : value;
    }
    return defaultUrl ? defaultUrl : '';
  }

  private isBase64(value: string): boolean {
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(value);
  }
}

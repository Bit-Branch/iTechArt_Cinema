import { Image } from '@core/models/image/image';
import { checkIsBase64String } from '@core/utils/check-is-base64-string';

export function isImage(value: unknown): value is Image {
  if (typeof value === 'object' && value) {
    if ('content' in value && 'id' in value) {
      const img = value as Image;
      return Number.isInteger(img.id) && checkIsBase64String(img.content);
    }
  }
  return false;
}

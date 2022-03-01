import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  async getImageFileFromUrl(url: string, name: string) {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type
    });
  }
}

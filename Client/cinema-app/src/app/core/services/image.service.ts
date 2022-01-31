import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  async convertFileToByteArray(file: File): Promise<Uint8Array> {
    return new Uint8Array(await file.arrayBuffer());
  }
}

import { Image } from '@core/models/image/image';

export interface Favor {
  id: number,
  name: string,
  image: Image,
  description: string
}

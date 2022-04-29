import { City } from '@core/models/city/city';
import { Genre } from '@core/models/genre/genre';
import { SeatType } from '@core/models/seat-type/seat-type';

export type CreationPageActions = 'update' | 'create';
export type CreationPageTypeNames = 'Genre' | 'City' | 'SeatType';
export type CreationPageTypes = Genre | City | SeatType;
export type CreationPageKeys = `${CreationPageActions}${CreationPageTypeNames}`;

export interface CreationPageDialogData {
  object?: CreationPageTypes,
  action: CreationPageKeys
}

export interface CreationPageElements {
  title: string,
  label: string,
  successMessage: string
}

export const creationPageMessages: Record<CreationPageKeys, CreationPageElements> = {
  createGenre: {
    title: 'Enter new genre name',
    label: 'New genre',
    successMessage: 'Genre successfully created'
  },
  createCity: {
    title: 'Enter new city name',
    label: 'New city',
    successMessage: 'City successfully created'
  },
  createSeatType: {
    title: 'Enter new seat type',
    label: 'New seat type',
    successMessage: 'Seat type successfully created'
  },
  updateGenre: {
    title: 'Enter new genre name',
    label: 'Edit genre',
    successMessage: 'Genre successfully updated'
  },
  updateCity: {
    title: 'Enter new city name',
    label: 'Edit city',
    successMessage: 'City successfully updated'
  },
  updateSeatType: {
    title: 'Enter new seat type',
    label: 'Edit seat type',
    successMessage: 'Seat type successfully updated'
  }
};

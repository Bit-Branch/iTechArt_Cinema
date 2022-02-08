export type CreationPageKeys = 'genre' | 'city' | 'seatType';

export interface CreationPageObject {
  title: string,
  label: string,
  successMessage: string
}

export const creationPageMessages: Record<CreationPageKeys, CreationPageObject> = {
  genre: {
    title: 'Enter new genre name',
    label: 'New genre',
    successMessage: 'Genre successfully created'
  },
  city: {
    title: 'Enter new city name',
    label: 'New city',
    successMessage: 'City successfully created'
  },
  seatType: {
    title: 'Enter new seat type',
    label: 'New seat type',
    successMessage: 'Seat type successfully created'
  }
};

export interface UpdateMovie {
  id: number
  title: string,
  description: string,
  genreId: number,
  yearOfIssue: number,
  imageId?: number,
  showInCinemasStartDate: Date,
  showInCinemasEndDate: Date,
  durationInMinutes: number
}

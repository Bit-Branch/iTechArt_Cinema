export function convertTimeStringToMinutes(time: string, separator = ':'): number {
  const minutesInHour = 60;
  const [hours, minutes, seconds] = time.split(separator);
  return (+hours || 0) * minutesInHour + (+minutes || 0) + (+seconds || 0) / minutesInHour;
}

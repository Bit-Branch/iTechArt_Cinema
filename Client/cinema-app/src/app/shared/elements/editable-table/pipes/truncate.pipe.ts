import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that slices large text and inserts three dots after it
 */
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    return `${value.slice(start, end)}...`;
  }
}

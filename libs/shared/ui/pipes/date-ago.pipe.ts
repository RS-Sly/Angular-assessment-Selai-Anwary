import { Pipe, PipeTransform } from '@angular/core';

/**
 * Date Ago Pipe
 * Part of SharedUiModule - needs to be converted to standalone
 *
 * TODO: Add standalone: true
 */
@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {
  transform(value: Date | string | number, args?: any): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) {
      return 'just now';
    }

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const counter = Math.floor(seconds / secondsInUnit);
      if (counter >= 1) {
        return counter === 1
          ? `1 ${unit} ago`
          : `${counter} ${unit}s ago`;
      }
    }

    return 'just now';
  }
}
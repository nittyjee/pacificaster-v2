import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeline', standalone: true })
export class TimelinePipe implements PipeTransform {
  transform(value: number): any {
    const seconds = value;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let timeString = [hours, minutes, remainingSeconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .join(':');

    // // If the hours are 0, return just MM:SS.
    // if (hours === 0) {
    //   timeString = timeString.substr(3);
    // }

    return timeString;
  }
}

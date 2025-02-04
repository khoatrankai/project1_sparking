import { PipeTransform, Injectable } from '@nestjs/common';
// import { parseISO } from 'date-fns';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any) {
    //console.log(value)
    // if (value && typeof value === 'string') {
    //   const parsedDate = parseISO(value); // Convert string to Date
    //   if (isNaN(parsedDate.getTime())) {
    //     throw new Error('Invalid date format');
    //   }
    //   return parsedDate; // Return the Date object
    // }
    return value;
  }
}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'commaStyle'
})
export class CommaStylePipe implements PipeTransform {

    public transform(num: number): string {
      if (num === 0) {
          return '0';
      } else if (!num) {
          return '';
      } else {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
}

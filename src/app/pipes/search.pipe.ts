import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(markers: any, value: string): any {
    return markers.filter(marker => {
      return marker.name.includes(value);
    });
  }

}

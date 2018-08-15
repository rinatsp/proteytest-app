import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(markers: any, value: string): any {
    if(!markers) return [];
    if(!value) return markers;

    value = value.toLowerCase();
    return markers.filter(marker => {
      return marker.name.toLowerCase().includes(value);
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {MapService} from './services/map.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public selectedMarker: any = null;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.registerMap('map');
    this.mapService.loadJSONdata();
    /**marker.bindPopup(`
        <h3>Leaflet PopUp</h1>
        <p>Some text</p>
    `);*/
    for(let marker of this.mapService.markers) {
      marker.marker.on('click', () => {
        this.onMarker(marker);
      });
    }
  }

  onMarker(marker: any) {
    if (this.selectedMarker !== null) {
      this.selectedMarker.marker.setIcon(this.mapService.setColor('green'));
    }
    this.selectedMarker = marker;
    this.selectedMarker.marker.setIcon(this.mapService.setColor('red'));
    this.mapService.setCenter(marker.marker);
  }




}

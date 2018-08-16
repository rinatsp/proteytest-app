import {Component, OnInit} from '@angular/core';
import {MapService} from './services/map.service';
import {MapObject} from './services/mapobject.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedMarker: MapObject = null;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.registerMap('map');
    this.mapService.loadJSONdata();
    /**marker.bindPopup(`
        <h3>Leaflet PopUp</h1>
        <p>Some text</p>
    `);*/
    for(let mapObject of this.mapService.mapObjects) {
      mapObject.marker.on('click', () => {
        this.onMarker(mapObject);
      });
    }
  }

  onMarker(mapObject: MapObject) {
    if (this.selectedMarker !== null) {
      this.selectedMarker.marker.setIcon(this.mapService.setColor('green'));
    }
    this.selectedMarker = mapObject;
    this.selectedMarker.marker.setIcon(this.mapService.setColor('red'));
    this.mapService.setCenter(mapObject.marker);
  }




}

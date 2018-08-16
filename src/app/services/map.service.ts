import { Injectable } from '@angular/core';
import {
  Icon,
  marker,
  Map,
  LatLng,
  latLng,
  Marker,
  control,
  tileLayer,
  divIcon,
  map
} from 'leaflet';

import * as data from './markers.json';
import {MapObject} from './mapobject.module';

@Injectable()
export class MapService {
  private mapElement: Map;
  public mapObjects: MapObject[] = [];

  public registerMap(mapId: string, tilesURL: string = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') {
    this.createMapElement(mapId, tilesURL);
  }

  public createMapElement(mapId: string, tilesURL: string) {
    this.mapElement = map(mapId, { zoomControl: false }).setView([59.935879, 30.321954], 13);

    tileLayer(tilesURL)
      .addTo(this.mapElement);
    const zoom = control.zoom({ position: 'topright' });
    zoom.addTo(this.mapElement);

    const scale = control.scale({ position: 'bottomright' });
    scale.addTo(this.mapElement);

  }

  public setCenter(marker: any) {
    if (marker instanceof Marker) {
      this.mapElement.setView(marker.getLatLng(), this.mapElement.getZoom());
    }
    else {
      this.mapElement.setView(marker.getBounds()
        .getCenter(), this.mapElement.getZoom());
    }
  }

  getMap(): Map {
    return this.mapElement;
  }

  public addPoint(coordinates: Array<number>): any {
    const location = latLng([coordinates[0], coordinates[1]]);
    const el = this.getMarker(location);
    this.mapElement.addLayer(el);
    return el;
  }

  private getMarker(location: LatLng): Marker {
    return marker(location, { icon: this.setColor('green')});
  }

  public loadJSONdata() {
    const markFromData = (<any>data).item;
    let marker: MapObject;
    for (const markerData of  markFromData) {
      marker = {
        marker: this.addPoint(markerData.coordinates),
        name: markerData.desc
      };
      this.mapObjects.push(marker);
    }
  }
  public setColor(color: string){
    const icon = new Icon({
        iconUrl: `assets/marker-${color}.png`,
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    return icon
  }

  public deleteMarker(index: any){
    this.mapElement.removeLayer(this.mapObjects[index].marker);
    this.mapObjects.splice(index, 1);
  }

  public addMarker(name: string, x: number, y: number) {
    let marker: MapObject;
    marker = {
        name: name,
        marker: this.addPoint([x, y]),
    }
      this.mapObjects.push(marker)
    return marker;
  }


}

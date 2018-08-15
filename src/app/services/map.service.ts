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

@Injectable()
export class MapService {
  private mapElement: Map;
  public markers: {name: string, marker: Marker}[] = [];

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
    let marker: {marker: Marker, name: string};
    for (const markerData of  markFromData) {
      marker = {
        marker: this.addPoint(markerData.coordinates),
        name: markerData.desc
      };
      this.markers.push(marker);
    }
  }
  public setColor(color: string){
    const icon = divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 25],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="background-color: ${color}; width: 1.3rem; height: 1.3rem; display: block; left: -1.5rem; top: -1.5rem; position: relative; border-radius: 3rem 3rem 0; transform: rotate(45deg); border: 1px solid #FFFFFF" />`
    })
    return icon
  }

  public deleteMarker(index: any){
    this.mapElement.removeLayer(this.markers[index].marker);
    this.markers.splice(index, 1);
  }

  public addMarker(name: string, x: number, y: number) {
    let marker: {marker: Marker, name: string};
    marker = {
        name: name,
        marker: this.addPoint([x, y]),
    }
      this.markers.push(marker)
    return marker;
  }


}

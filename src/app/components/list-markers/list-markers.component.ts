import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapService} from '../../services/map.service';
import {MapObject} from '../../services/mapobject.module';

@Component({
  selector: 'app-list-markers',
  templateUrl: './list-markers.component.html',
  styleUrls: ['./list-markers.component.css']
})
export class ListMarkersComponent implements OnInit {
  searchStr: string = '';
  list: MapObject[] = [];
  @Input() selectedMarker: any = null;
  @Output() onMarker = new EventEmitter<any>();

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.list = this.mapService.mapObjects;
  }

  onDeleteMarker(index:number){
    this.mapService.deleteMarker(index);
  }

  selectMarker(marker: MapObject){
    this.onMarker.emit(marker);
  }
}

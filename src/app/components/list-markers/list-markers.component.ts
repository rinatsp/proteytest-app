import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-list-markers',
  templateUrl: './list-markers.component.html',
  styleUrls: ['./list-markers.component.css']
})
export class ListMarkersComponent implements OnInit {
  searchStr: string = '';
  list: any = [];
  @Input() selectedMarker: any = null;
  @Output() onMarker = new EventEmitter<any>();

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.list = this.mapService.markers;
  }

  onDeleteMarker(index:any){
    this.mapService.deleteMarker(index);
  }

  selectMarker(marker:any){
    this.onMarker.emit(marker);
  }
}

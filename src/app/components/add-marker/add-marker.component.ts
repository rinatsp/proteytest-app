import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MapService} from '../../services/map.service';
import {NgForm} from '@angular/forms';
import {MapObject} from '../../services/mapobject.module';

@Component({
  selector: 'app-add-marker',
  templateUrl: './add-marker.component.html',
  styleUrls: ['./add-marker.component.css']
})
export class AddMarkerComponent {

  @Output() onMarker = new EventEmitter<any>();
  @ViewChild('form') form: NgForm;
  constructor(private mapService: MapService) { }


  onAddMarker(){
    const mapObject: MapObject = this.mapService.addMarker(this.form.value.name, this.form.value.x, this.form.value.y);
    mapObject.marker.on('click', ()=> this.onMarker.emit(mapObject));
  }

}

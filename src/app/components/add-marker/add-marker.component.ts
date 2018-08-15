import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MapService} from '../../services/map.service';
import {NgForm} from '@angular/forms';

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
    const marker = this.mapService.addMarker(this.form.value.name, this.form.value.x, this.form.value.y);
    marker.marker.on('click', ()=> this.onMarker.emit(marker));
  }

}

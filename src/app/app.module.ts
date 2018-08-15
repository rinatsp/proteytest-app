import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MapService} from './services/map.service';
import { SearchPipe } from './pipes/search.pipe';
import {FormsModule} from '@angular/forms';
import { ListMarkersComponent } from './components/list-markers/list-markers.component';
import { AddMarkerComponent } from './components/add-marker/add-marker.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ListMarkersComponent,
    AddMarkerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }

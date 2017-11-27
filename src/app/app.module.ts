import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import {GoogleMapService} from './services/google-map.service';
import {TwitterService} from './services/twitter.service';
import {CacheService} from './services/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GoogleMapService, TwitterService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }

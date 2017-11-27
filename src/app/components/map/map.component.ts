import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { environment } from '../../../environments/environment';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  map: any;
  @Input('pins') pins: any[];
  markers = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.pins.firstChange) { return; }
      this.pins = changes.pins.currentValue;
      console.log(this.pins);
      this.map.setCenter({lat: this.pins[0].lat, lng: this.pins[0].lng});
      this.makeMarkers();
  }

  ngOnInit() {
      this. loadScript();
  }

    generateRandomPoints(center, radius, count) {
        const points = [];
        for (let i = 0; i < count; i++) {
            points.push(this.generateRandomPoint(center, radius));
        }
        return points;
    }

    generateRandomPoint(center, radius) {
        const x0 = center.lng;
        const y0 = center.lat;
        // Convert Radius from meters to degrees.
        const rd = radius / 111300;

        const u = Math.random();
        const v = Math.random();

        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);

        const xp = x / Math.cos(y0);

        // Resulting point.
        return {'lat': y + y0, 'lng': xp + x0};
    }

    makeMarkers() {
        this.clearMarkers();
        this.pins.forEach( (location) => {
            const rCoords = this.generateRandomPoints({lat: location.lat, lng: location.lng}, 2000, 1);
            const marker = new google.maps.Marker({
                position: {lat: rCoords[0].lat, lng: rCoords[0].lng},
                icon: location.ico
            });
            const infowindow = new google.maps.InfoWindow({
                content: '<div>' + location.info + '</div>'
            });
            marker.setMap(this.map);
            marker.addListener('click', function() {
                infowindow.open(this.map, marker);
            });
            this.markers.push(marker);
        });
    }

    clearMarkers() {
        this.setMarkers(null);
        this.markers = [];
    }

    setMarkers(map) {
        this.markers.forEach((marker) => {
            marker.setMap(map);
        });
    }

  initMap() {
      const startPositions = environment.googleMapConfig.InitCoords;
      this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: startPositions
      });
      this.makeMarkers();
  }

  loadScript() {
      const node = document.createElement('script');
      node.src = environment.googleMapConfig.GOOGLE_MAPS_API_URL + environment.googleMapConfig.GOOGLE_MAPS_API_KEY;
      node.id = 'googleMapsAPI';
      document.getElementsByTagName('head')[0].appendChild(node);
      node.addEventListener('load', () => {
          this.initMap();
       //   this.makeMarkers();
      });
  }

}

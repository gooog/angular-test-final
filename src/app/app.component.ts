import {Component, OnInit} from '@angular/core';
import {GoogleMapService} from './services/google-map.service';
import {TwitterService} from './services/twitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    pinsS = [
        {name: 'Tbilisi, Georgia',
            lat: 41.7151377,
            lng: 44.827096,
            ico: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            info: 'test string sfsf sf dsf sdf!'},
        {name: 'Rustavi, Georgia', lat: 41.5225612, lng: 45.0430369, ico: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            info: 'test string sfsf sf dsf sdf!'}
    ];

  constructor(private googleMapService: GoogleMapService, private twitterService: TwitterService) {

  }

  search(event) {
    const tmp = [];
    this.googleMapService.findLocation(event).subscribe( (data: any) => {
        if (data.status === 'OK') {
            this.twitterService.get().subscribe(r => {
                r.statuses.forEach(e => {
                    tmp.push({
                        name: e.user.name,
                        lat: data.results[0].geometry.location.lat,
                        lng: data.results[0].geometry.location.lng,
                        ico: e.user.profile_image_url,
                        info: e.text
                    });
                });
                this.pinsS = tmp;
            });
        }
    });
  }

  ngOnInit() {

  }

}

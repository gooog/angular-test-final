import {Component, OnInit} from '@angular/core';
import {GoogleMapService} from './services/google-map.service';
import {TwitterService} from './services/twitter.service';
import {CacheService} from './services/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    history: any;

    pinsS = [];

  constructor(private googleMapService: GoogleMapService, private twitterService: TwitterService, private cacheService: CacheService) {

  }

  search(event) {
    const tmp = [];
    const cache = this.cacheService.ifDataExists(event);
    console.log('cache', cache);
    if (!cache) {
        this.googleMapService.findLocation(event).subscribe((data: any) => {
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
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    this.cacheService.setData({name: event, created_at: currentTimestamp, results: this.pinsS});
                    this.history = this.cacheService.getData();
                });
            }

        });
    } else {
        this.pinsS = cache.results;
    }

  }

  ngOnInit() {
      this.history = this.cacheService.getData();
      console.log(this.history);
  }

}

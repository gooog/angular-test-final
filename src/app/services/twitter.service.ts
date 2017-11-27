import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TwitterService {

  constructor(private http: HttpClient) { }

  get(): any {
    return this.http.get('http://localhost:3000/search/41.7151377/44.827096');
  }

}

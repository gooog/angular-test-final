import {Injectable, OnDestroy} from '@angular/core';

@Injectable()
export class CacheService {

  data: any[];

  constructor() {
    this.data = this.getData();
  }

  getData() {
    const data = localStorage.getItem('data');
    if (data) {
      return JSON.parse(data);
    } else {
        return [];
    }
  }

  setData(newData) {
          this.data.push(newData);
          this.save();
  }

  save() {
    localStorage.setItem('data', JSON.stringify(this.data));
  }


  ifDataExists(name) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const check = this.data.find((e) => {
      return e.name === name && (currentTimestamp - e.created_at) < 300;
    });

    if (!check) {
        this.data = this.data.filter(e => e.name !== name);
    }

   return check;
  }

}

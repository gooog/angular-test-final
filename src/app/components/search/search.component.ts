import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input: any;
  @Output() searchedFor: EventEmitter<any> = new EventEmitter();

  constructor() {
      this.input = '';
  }

  ngOnInit() {

  }

  search() {
      if (this.input.length >= 3) {
          this.searchedFor.emit(this.input);
          this.input = '';
      }
  }

}

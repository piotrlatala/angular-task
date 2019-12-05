import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('inputElement', {static: false}) inputElement;
  @Output() searchValueChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  clear() {
    this.inputElement.nativeElement.value = '';
    this.updateSearch('');
  }

  updateSearch(value: string) {
    this.searchValueChange.emit(value);
  }
}

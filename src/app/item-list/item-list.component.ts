import {Component, OnInit, ViewChild} from '@angular/core';
import { ResultsService } from './../services/results.service';
import { ISearchObj, ItemInterface } from './../models/';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @ViewChild('search', {static: false}) search;

  listItem: ItemInterface[];
  searchObj: ISearchObj;
  order: 'asc' | 'desc';
  typeFilter: string;

  private itemSubject$ = new Subject<ISearchObj>();
  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.order = 'asc';
    this.typeFilter = 'all';

    this.itemSubject$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchObj => this.resultsService.getItemList(searchObj))
    ).subscribe((results) => {
      this.listItem = results;
    })
  }

  updateSearch($event) {
    if ($event === null) {
      this.search.clear();
    } {
      this.order = $event.orderControl;
      this.typeFilter = $event.typeControl;
    }
  }

  renderItemResults(value: string) {
    this.searchObj = {
      phrase: value,
      type: this.typeFilter,
      order: this.order
    };

    this.itemSubject$.next(this.searchObj);
  }

  showAlertName(item) {
    alert('This item name is: ' + item.name);
  }
}

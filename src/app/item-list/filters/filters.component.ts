import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { IFilterItem } from './../../models/';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TypeItemData, OrderItemData} from "./filters.const";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() updateSearch: EventEmitter<null | object> = new EventEmitter();
  @ViewChild('typeControl', {static: false}) typeControl;
  @ViewChild('orderControl', {static: false}) orderControl;
  filterFormGroup: FormGroup;

  typeItem: IFilterItem[] = TypeItemData;
  orders: IFilterItem[] = OrderItemData;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.filterFormGroup = this.formBuilder.group({
      typeControl: ['all'],
      orderControl: ['asc'],
    });
  }

  updateControl() {
    setTimeout(() => {
      this.updateSearch.emit(this.filterFormGroup.getRawValue());
    }, 0);
  }

  setDefaultValues() {
    this.filterFormGroup.controls['typeControl'].setValue('all');
    this.filterFormGroup.controls['orderControl'].setValue('asc');
    this.updateSearch.emit(null);
  }
}

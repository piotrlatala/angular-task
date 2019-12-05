import { Injectable } from '@angular/core';
import {Observable, of,} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ItemInterface} from "./../models/item.interface";


@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = 'http://pagepage.com';
  constructor(private http: HttpClient) { }

  getItemList(searchObj): Observable<ItemInterface[]> {
    return this.http.get<ItemInterface[]>(
      `${this.apiUrl}/itemlist/${searchObj.type}/${searchObj.order}/${searchObj.phrase}`).pipe(
      catchError(err => of([]))
    );
  }
}

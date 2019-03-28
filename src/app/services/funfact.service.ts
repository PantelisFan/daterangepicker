import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunfactService {

  constructor(private http: HttpClient) { }

  get(date: Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return this.http.get(`http://numbersapi.com/${month}/${day}/date?json`).toPromise();
  }

}

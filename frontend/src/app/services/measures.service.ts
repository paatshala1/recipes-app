import { Injectable } from '@angular/core';
import { Measure } from '../models/measure.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/measure';

  getMeasures() {
    return this.http.get<Measure[]>(`${this.URL_API}/list`);
  }
}

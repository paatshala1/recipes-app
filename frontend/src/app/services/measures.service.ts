import { Injectable } from '@angular/core';
import { Measure } from '../models/measure.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/measure';


  canDeleteMeasure(id:string) {
    return this.http.get<boolean>(`http://localhost:4000/api/recipe/measure/${id}`);
  }


  getMeasures() {
    return this.http.get<Measure[]>(`${this.URL_API}/list`);
  }


  removeMeasure(id:string) {
    return this.http.delete<Measure[]>(`${this.URL_API}/delete/${id}`);
  }
}

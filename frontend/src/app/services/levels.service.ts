import { Injectable } from '@angular/core';
import { Level } from '../models/level.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/level';


  addLevel(form:FormGroup) {
    return this.http.post(`${this.URL_API}/create`, form.value);
  }


  canDeleteLevel(id:string) {
    return this.http.get<boolean>(`http://localhost:4000/api/recipe/level/${id}`);
  }


  getLevels() {
    return this.http.get<Level[]>(`${this.URL_API}/list`);
  }


  removeLevel(id:string) {
    return this.http.delete<Level[]>(`${this.URL_API}/delete/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Level } from '../models/level.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http:HttpClient) { }

  URL_API = 'https://angelacocina.herokuapp.com/api/level';


  addLevel(form:FormGroup) {
    return this.http.post(`${this.URL_API}/create`, form.value);
  }


  canDeleteLevel(id:string) {
    return this.http.get<boolean>(`https://angelacocina.herokuapp.com/api/recipe/level/${id}`);
  }


  editLevel(form:FormGroup, id?:string) {
    return this.http.put(`${this.URL_API}/update/${id}`, form.value)
  }


  getLevels() {
    return this.http.get<Level[]>(`${this.URL_API}/list`);
  }


  removeLevel(id:string) {
    return this.http.delete<Level[]>(`${this.URL_API}/delete/${id}`);
  }
}

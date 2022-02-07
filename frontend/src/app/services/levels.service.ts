import { Injectable } from '@angular/core';
import { Level } from '../models/level.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/level';

  getLevels() {
    return this.http.get<Level[]>(`${this.URL_API}/list`);
  }
}

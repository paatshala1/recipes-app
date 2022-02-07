import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/category';


  getCategoryList() {
    return this.http.get<Category[]>(`${this.URL_API}/list`);
  }

  findCategory(id:string) {
    return this.http.get<Category[]>(`${this.URL_API}/find`);
  }
}

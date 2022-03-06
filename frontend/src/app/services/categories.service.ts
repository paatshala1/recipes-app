import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/category';
  canDelete!:boolean;


  addCategory(form:FormGroup) {

    let category = form.value;
    category.route = category.name.toLowerCase();
    return this.http.post<Category[]>(`${this.URL_API}/create`, form.value);

  }


  canDeleteCategory(id:string):any {
    return this.http.get<boolean>(`http://localhost:4000/api/recipe/category/${id}`);
  }


  getCategoryList() {
    return this.http.get<Category[]>(`${this.URL_API}/list`);
  }


  findCategory(id:string) {
    return this.http.get<Category[]>(`${this.URL_API}/find`);
  }


  removeCategory(id:string) {
    return this.http.delete<Category[]>(`${this.URL_API}/delete/${id}`);
  }
}

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

  URL_API = '/api/category';
  canDelete!:boolean;


  addCategory(form:FormData) {

    return this.http.post<Category[]>(`${this.URL_API}/create`, form);

  }


  canDeleteCategory(id:string):any {
    return this.http.get<boolean>(`http://localhost:4000/api/recipe/category/${id}`);
  }


  editCategory(form:FormGroup, id?:string) {
    return this.http.put(`${this.URL_API}/update/${id}`, form.value)
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

import { Injectable, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Ingredient } from '../models/ingredient.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})


export class IngredientsDBService {

  URL_API = 'https://angelacocina.herokuapp.com/api/ingredient';

  ING_DATA!:MatTableDataSource<any>;
  dbIngredients:Ingredient[] = [];

  constructor(private http: HttpClient) { }

  addIngredient(form:FormGroup) {
    return this.http.post<Ingredient[]>(`${this.URL_API}/create`, form.value);
  }


  canDeleteIngredient(id:string) {
    return this.http.get<boolean>(`https://angelacocina.herokuapp.com/api/recipe/ingredient/${id}`);
  }


  editIngredient(form:FormGroup, id?:string) {
    console.log(form);
    return this.http.put(`${this.URL_API}/update/${id}`, form.value)
  }

  getIngredientsDB() {
    return this.http.get<Ingredient[]>(this.URL_API)
  }

  removeIngredient(id:string) {
    return this.http.delete<Ingredient[]>(`${this.URL_API}/delete/${id}`)
  }

  updateIngredient(ing:Ingredient, id?:string) {
    // console.log('INFO EN SERVICIO');
    let url = `${this.URL_API}/update/${id}`;
    // console.log(ing);
    // console.log(id);
    // console.log(url);
    return this.http.put<Ingredient>(url, ing)
  }



}



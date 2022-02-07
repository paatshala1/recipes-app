import { Injectable, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Ingredient } from '../models/ingredient.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})


export class IngredientsDBService {

  URL_API = 'http://localhost:4000/api/ingredient';

  ING_DATA!:MatTableDataSource<any>;
  dbIngredients:Ingredient[] = [];

  constructor(private http: HttpClient) { }

  addIngredient(ing:Ingredient[]) {
    return this.http.post<Ingredient[]>(`${this.URL_API}/create`, ing)
  }

  editIngredient(ing:Ingredient[]) {
    console.log(ing);
    
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



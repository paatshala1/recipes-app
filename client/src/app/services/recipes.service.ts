import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/recipe';


  createRecipe(newRecipeData:any) {
    return this.http.post(`${this.URL_API}/create`, newRecipeData);
  }


  deleteRecipe(id:string) {
    return this.http.delete(`${this.URL_API}/delete/${id}`);
  }


  getRecipeDetail(id:string) {
    return this.http.get<Recipe>(`${this.URL_API}/detail/${id}`);
  }


  getRecipeList(category:string) {
    return this.http.get<any[]>(`${this.URL_API}/list/${category}`);
  }

  uploadImage(form:FormData) {
    return this.http.post(`${this.URL_API}/detail/:id/upload`, form);
  }
}

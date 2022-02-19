import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() recipe!:Recipe;

  constructor(private recipesService:RecipesService, private _router:Router) { }

  ngOnInit(): void {
  }
  
  

  deleteRecipe(id:any, currCat:any) {
    this.recipesService.deleteRecipe(id).subscribe(
      res => {
        console.log(res);
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this._router.navigated = false;
        this._router.navigate([`/recetas/${currCat}`]);
        this._router.routeReuseStrategy.shouldReuseRoute = function (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
          return future.routeConfig === curr.routeConfig;
      }},
      err => console.log(err)
    )
  }

}

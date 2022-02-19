import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() recipe!:Recipe;

  constructor(private recipesService:RecipesService, private myRouter:Router) { }

  ngOnInit(): void {

  }

  deleteRecipe(id:any) {
    this.recipesService.deleteRecipe(id).subscribe(
      res => {
        console.log(res);
        this.myRouter.navigateByUrl('/recetas');
      },
      err => console.log(err)
    )
  }

}

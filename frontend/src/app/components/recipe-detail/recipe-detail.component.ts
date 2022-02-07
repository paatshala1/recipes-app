import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(public recipesService:RecipesService, private route:ActivatedRoute) {

  }
  
  ngOnInit(): void {
    
    this.loadRecipeDetail();

  }

  title!:string;

  recipeDetail!:Recipe;

  loadRecipeDetail() {

    this.recipesService.getRecipeDetail(this.route.snapshot.queryParams['id']).subscribe(
      res => {
        this.recipeDetail = res;
        this.title = this.recipeDetail.name;
      },
      err => console.log(err)
    )

  }

}

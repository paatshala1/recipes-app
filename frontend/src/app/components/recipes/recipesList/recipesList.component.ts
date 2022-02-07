import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';
import { Element } from 'src/app/models/element.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipesList.component.html',
  styleUrls: ['./recipesList.component.css']
})
export class RecipesListComponent implements OnInit {

  // Para inyectar el Router, arriba está su import y en la función abajo se utiliza.
  constructor(private myRouter:Router, private recipesService:RecipesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadRecipeList(this.currentCategory);
  }

  currentCategory:string = this.route.snapshot.queryParams['category'];

  title:string = '';

  recipes!:[];

  
  loadRecipeList(category:string) {
    
    this.recipesService.getRecipeList(category).subscribe(
      res => {
          this.recipes = res[0];
        this.title = `CATEGORÍA: ${res[1]}`;
      },
      err => console.log(err)
    )
  }

}

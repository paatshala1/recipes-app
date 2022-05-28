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
        let currentUrl = this._router.url;
          this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this._router.navigate([currentUrl]);
          });
      },
      err => console.log(err)
    )
  }


}

import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categoriesList.component.html',
  styleUrls: ['./categoriesList.component.css']
})
export class CategoriesListComponent implements OnInit {

  constructor(private categoriesService:CategoriesService, private myRouter:Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  actionTitle = 'Crear una nueva receta';

  categories: any[] = [];

  loadCategories() {
    this.categoriesService.getCategoryList().subscribe(
      res => {
        this.categories = res;
        //console.log(res);
      },
      err => console.log(err)
    )
  }

  newRecipe() {
    this.myRouter.navigate(['recetas/nueva']);
  }


}

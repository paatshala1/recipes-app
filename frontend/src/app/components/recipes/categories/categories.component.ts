import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

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

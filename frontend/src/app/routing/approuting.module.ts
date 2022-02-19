import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../components/cart/cart.component';
import { ContactComponent } from '../components/contact/contact.component';
import { HomeComponent } from '../components/home/home.component';
import { IngredientsDBComponent } from '../components/ingredientsDB/ingredientsDB.component';
import { LoginComponent } from '../components/login/login.component';
import { NewrecipeComponent } from '../components/newrecipe/newrecipe.component';
import { RecipesListComponent } from '../components/recipes/recipesList/recipesList.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { CreateIngredientComponent } from '../components/create-ingredient/create-ingredient.component';
import { CategoriesListComponent } from '../components/recipes/categoriesList/categoriesList.component';
import { RecipeDetailComponent } from '../components/recipe-detail/recipe-detail.component';
import { MeasuresComponent } from '../components/measures/measures.component';
import { EquipmentsComponent } from '../components/equipments/equipments.component';
import { LevelsComponent } from '../components/levels/levels.component';
import { CategoriesComponent } from '../components/categories/categories.component';

const appRoutes:Routes = [
  {path: '', component:HomeComponent},
  {path: 'recetas', component:CategoriesListComponent},
  {path: 'recetas/nueva', component:NewrecipeComponent},
  {path: 'recetas/:cat', component:RecipesListComponent},
  {path: 'recetas/:cat/:id', component:RecipeDetailComponent},
  {path: 'carrito', component:CartComponent},
  {path: 'contacto',  component:ContactComponent},
  {path: 'ingredientes', component:IngredientsDBComponent},
  {path: 'categorias', component:CategoriesComponent},
  {path: 'medidas', component:MeasuresComponent},
  {path: 'equipos', component:EquipmentsComponent},
  {path: 'niveles', component:LevelsComponent},
  {path: 'login',  component:LoginComponent},
  {path: 'ingredientes/crear', component:CreateIngredientComponent},
  {path: '**', component:NotfoundComponent}
  //Lazy loading, minuto 52:37. Se podría usar para cargar el carrito si fuera un módul
  // {path:'carrito', loadChildren: () => import('../cart/cart.component').then(x => x.CartComponent)}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes) //La parte del smaeURL no está funcionando
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }

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
import { AddEditDeleteComponent } from '../components/add-edit-delete/add-edit-delete.component';


const appRoutes:Routes = [
  {path: '', component:HomeComponent},
  {path: 'recetas', component:CategoriesListComponent},
  {path: 'recetas/nueva', component:NewrecipeComponent},
  {path: 'recetas/:cat', component:RecipesListComponent},
  {path: 'recetas/:cat/:id', component:RecipeDetailComponent},
  {path: 'carrito', component:CartComponent},
  {path: 'contacto',  component:ContactComponent},
  {path: 'ingredientes', component:AddEditDeleteComponent},
  {path: 'categorias', component:AddEditDeleteComponent},
  {path: 'medidas', component:AddEditDeleteComponent},
  {path: 'equipos', component:AddEditDeleteComponent},
  {path: 'niveles', component:AddEditDeleteComponent},
  {path: 'login',  component:LoginComponent},
  {path: 'ingredientes/crear', component:CreateIngredientComponent},
  {path: '**', component:NotfoundComponent}
  //Lazy loading, minuto 52:37. Se podr??a usar para cargar el carrito si fuera un m??dul
  // {path:'carrito', loadChildren: () => import('../cart/cart.component').then(x => x.CartComponent)}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes) //La parte del smaeURL no est?? funcionando
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }

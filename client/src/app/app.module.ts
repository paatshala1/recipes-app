import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { SharedModule } from './shared/shared.module';
import { RoutingModule } from './routing/approuting.module';

import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { HomeComponent } from './components/home/home.component';
import { RecipesListComponent } from './components/recipes/recipesList/recipesList.component';
import { IngredientsDBComponent } from './components/ingredientsDB/ingredientsDB.component';
import { ContactComponent } from './components/contact/contact.component';
import { NewrecipeComponent } from './components/newrecipe/newrecipe.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { CategoriesListComponent } from './components/recipes/categoriesList/categoriesList.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { CategoriesComponent } from './components/categories/categories.component';


import { LoggedService } from './services/logged.service';
import { IngredientsDBService } from './services/ingredientsDB.service';
import { CategoriesService } from './services/categories.service';
import { MeasuresService } from './services/measures.service';
import { LevelsService } from './services/levels.service';
import { EquipmentsService } from './services/equipments.service';
import { RecipesService } from './services/recipes.service';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

import { SetFocusDirective } from './directives/set-focus.directive';
import { LevelsComponent } from './components/levels/levels.component';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { MeasuresComponent } from './components/measures/measures.component';
import { AddEditDeleteComponent } from './components/add-edit-delete/add-edit-delete.component';
import { AddEditDeleteDetailComponent } from './components/add-edit-delete-detail/add-edit-delete-detail.component';





@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    MainMenuComponent,
    NavbarComponent,
    HomeComponent,
    RecipesListComponent,
    IngredientsDBComponent,
    ContactComponent,
    NewrecipeComponent,
    CartComponent,
    LoginComponent,
    RecipeComponent,
    NotfoundComponent,
    CreateIngredientComponent,
    CategoriesListComponent,
    RecipeDetailComponent,
    ImageUploadComponent,
    SetFocusDirective,
    LevelsComponent,
    EquipmentsComponent,
    MeasuresComponent,
    CategoriesComponent,
    AddEditDeleteComponent,
    AddEditDeleteDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    SharedModule,
    RoutingModule
  ],
  providers: [
    LoggedService,
    IngredientsDBService,
    CategoriesService,
    MeasuresService,
    LevelsService,
    EquipmentsService,
    RecipesService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

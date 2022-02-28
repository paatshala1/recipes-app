import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { IngredientsDBService } from '../../services/ingredientsDB.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsDBComponent } from '../ingredientsDB/ingredientsDB.component';



@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit, AfterViewInit {

  constructor(private formBuilder:FormBuilder, private ingsDBService:IngredientsDBService, private _snackbar: MatSnackBar, private ingsDbComp:IngredientsDBComponent) {
    
    this.IngredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: ['']
    });
    
  }

  
  IngredientForm:FormGroup;
  
  @Input() editMode!:[Ingredient, boolean];
  @ViewChild('ingInput') ingInputElement!:ElementRef<HTMLInputElement>
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    // this.ingInputElement.nativeElement.focus();
  } 
  

  addOrEditIngredient(form:FormGroup) {
    // console.log(form.value);
    // console.log(this.editMode[0]);
    if (!this.editMode[1]) {
      // console.log('ADDING');
      this.ingsDBService.addIngredient(form.value).subscribe(
        res => {
          this.ingsDbComp.loadIngredientsDB();
          form.reset('');
          form.setValue(
            {name:'',
            notes:''}
          );
          this._snackbar.open('Ingrediente creado exitosamente', '', {
            verticalPosition: 'top',
            duration: 1500,
            horizontalPosition: 'right'
          })
        },
        err => console.log(err)
      );
      // formDirective.resetForm(); 
    }
    else {
      // console.log('EDITING');
      this.setEditValues()
        .then(ingsSet => {
          this.ingsDBService.updateIngredient(form.value, this.editMode[0]._id).subscribe(
            res => {
              form.reset();
              this.editMode[0] = {
                name:'',
                _id:'',
                notes:''
              };
              this.editMode[1] = false;
              this.ingsDbComp.loadIngredientsDB();
            },
            err => console.log(err)
          );

        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  setEditValues() {
    return new Promise<void>((resolve, reject) => {
      if (this.IngredientForm.get('name')?.pristine) {
        this.IngredientForm.get('name')?.setValue(this.editMode[0].name);
      }
      if (this.IngredientForm.get('notes')?.pristine) {
        this.IngredientForm.get('notes')?.setValue(this.editMode[0].notes);
      }
      resolve();
    })
  }

}


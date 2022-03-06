import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AddEditDeleteComponent } from '../add-edit-delete/add-edit-delete.component';

import { IngredientsDBService } from 'src/app/services/ingredientsDB.service';
import { MeasuresService } from 'src/app/services/measures.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { LevelsService } from 'src/app/services/levels.service';
import { EquipmentsService } from 'src/app/services/equipments.service';

import { Router } from '@angular/router';
import { Measure } from 'src/app/models/measure.model';

@Component({
  selector: 'app-add-edit-delete-detail',
  templateUrl: './add-edit-delete-detail.component.html',
  styleUrls: ['./add-edit-delete-detail.component.css']
})
export class AddEditDeleteDetailComponent implements OnInit {

  constructor(
    private _fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private ingsDBService:IngredientsDBService,
    private measuresService:MeasuresService,
    private categoriesService:CategoriesService,
    private levelsService:LevelsService,
    private equipmentsService:EquipmentsService,
    private addEditDeleteComponent:AddEditDeleteComponent,
    private _router:Router
    ) {

    this.EntryForm = this._fb.group({
      name: ['', Validators.required]
    })

  }


  ngOnInit(): void {
  }


  @Input() editMode!:[any, boolean];
  @Input() confElement!:string;


  EntryForm!:FormGroup;
  addResponse:any;


  addByType(form:FormGroup) {
    const currentURL = this._router.url;

    switch (currentURL) {

      case '/categorias':
        return this.categoriesService.addCategory(form);
        break;

      case '/ingredientes':
        return this.ingsDBService.addIngredient(form);
        break;

      case '/medidas':
        return this.measuresService.addMeasure(form);
        break;

      case '/niveles':
        return this.levelsService.addLevel(form);
        break;

      case '/equipos':
        return this.equipmentsService.addEquipment(form);
        break;

      default:
        throw new Error('ENTRADA NO VALIDA');
    }
  }


  refreshEntries(form:FormGroup) {
    this.addEditDeleteComponent.loadEntries();
      form.reset('');
      form.setValue(
        {
          name:''
        }
      );
      this._snackbar.open('Ingrediente creado exitosamente', '', {
        verticalPosition: 'top',
        duration: 1500,
        horizontalPosition: 'right'
      })
  }


  addOrEditEntry(form:FormGroup) {
    // console.log(form.value);
    // console.log(this.editMode[0]);
    if (this.editMode[1]) {
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
              this.addEditDeleteComponent.loadEntries();
            },
            err => console.log(err)
          );

        })
        .catch(err => {
          console.log(err);
        })

    }
    else {
      // console.log('ADDING');
      this.addByType(form).subscribe(
        res => {
          this.refreshEntries(form);
        },
        err => console.log(err)
      );
      // formDirective.resetForm();
    }
  }


  setEditValues() {
    return new Promise<void>((resolve, reject) => {
      if (this.EntryForm.get('name')?.pristine) {
        this.EntryForm.get('name')?.setValue(this.editMode[0].name);
      }
      resolve();
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

      let currentURL = this._router.url
      if (currentURL == '/categorias') {
        this.EntryForm = this._fb.group({
          name: new FormControl('', Validators.required),
          catImage: new FormControl('', Validators.required)
        })
      }
      else {
        this.EntryForm = this._fb.group({
          name: new FormControl('', Validators.required)
        })
      }


  }


  ngOnInit(): void {
  }


  @Input() editMode!:[any, boolean];
  @Input() confElement!:string;


  EntryForm!:FormGroup;
  addResponse:any;
  file!:File;


  // Type changed to any to accept FormGroup or FormData...
  addByType(form:any) {
    const currentURL = this._router.url;

    switch (currentURL) {

      case '/categorias':
        const fd = new FormData();
        fd.append('catImage', this.file);
        fd.append('name', form.value.name);
        fd.append('route', form.value.name.toLowerCase())

        return this.categoriesService.addCategory(fd);
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


  addOrEditEntry(form:FormGroup) {
    // console.log(form.value);
    // console.log(this.editMode[0]);
    if (this.editMode[1]) {
      // console.log('EDITING');
      this.setEditValues()
        .then(entrySet => {
          this.editByType(form, this.editMode[0]._id).subscribe(
            res => {
              this.refreshEntries(form);
            },
            err => console.log(err)
          )
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


  editByType(form:FormGroup, id:string) {
    const currentURL = this._router.url;

    switch (currentURL) {

      case '/categorias':
        return this.categoriesService.editCategory(form, id);
        break;

      case '/ingredientes':
        return this.ingsDBService.editIngredient(form, id);
        break;

      case '/medidas':
        return this.measuresService.editMeasure(form, id);
        break;

      case '/niveles':
        return this.levelsService.editLevel(form, id);
        break;

      case '/equipos':
        return this.equipmentsService.editEquipment(form, id);
        break;

      default:
        throw new Error('ENTRADA NO VALIDA');
    }
  }


  onFileSelected(event:any):void {
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
    }
  }


  refreshEntries(form:FormGroup) {
    this.addEditDeleteComponent.loadEntries();
      form.reset('');
      (this._router.url == '/categorias')
        ? form.setValue(
          {
            name: '',
            catImage: ''
          }
        )
        : form.setValue(
          {
            name:''
          }
        );

      this.editMode[0] = {
        name:'',
        _id:'',
        notes:''
      };
      this.editMode[1] = false;
      this._snackbar.open('Acción procesada exitosamente', '', {
        verticalPosition: 'top',
        duration: 1500,
        horizontalPosition: 'right'
      })
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

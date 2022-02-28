import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoriesService } from 'src/app/services/categories.service';
import { MeasuresService } from 'src/app/services/measures.service';
import { LevelsService } from 'src/app/services/levels.service';
import { EquipmentsService } from 'src/app/services/equipments.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Ingredient } from 'src/app/models/ingredient.model';
import { Category } from 'src/app/models/category.model';
import { Measure } from 'src/app/models/measure.model';
import { Level } from 'src/app/models/level.model';
import { Equipment } from 'src/app/models/equipment.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-add-edit-delete',
  templateUrl: './add-edit-delete.component.html',
  styleUrls: ['./add-edit-delete.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddEditDeleteComponent implements OnInit {

  constructor(private _equipmentsService:EquipmentsService , private _categoriesService:CategoriesService, private _measuresService:MeasuresService, private _levelsService:LevelsService, private _fb:FormBuilder, private _router:Router, private _snackBar:MatSnackBar) {

  }

  ngOnInit(): void {
    this.loadEntries();
  }

  // VARIABLES
  editMode:[any, boolean] = [
    {
    name:'',
    notes:''
    },
    false
  ];

  dbEntries:any[] = [];
  ENTRIES_DATA!:MatTableDataSource<any>;

  pageSizeOptions:number[] = [5, 10, 25, 50, 100]
  displayedColumns: string[] = ['name', 'actions'];

  result!:Observable<boolean>;
  recipes!:boolean;

  // DECORATORS

  @ViewChild('matPaginator') paginator!: MatPaginator;


  applyFilter(event:Event) {

  }


  editEntry(id:string, name:string, notes:string) {

  }


  removeEntry(id:string, name:string) {
    let currentUrl = this._router.url;

    switch (currentUrl) {
      case '/categorias':
        this.result = this._categoriesService.canDeleteCategory(id);

        this.result.pipe(take(1)).subscribe(
          res => {
            // console.log(res);
            if(res == false) {
              this._snackBar.open('Primero debe eliminar/modificar las rectas de la categoría', '', {
                horizontalPosition:'center',
                verticalPosition:'bottom',
                duration:2500
              });
              return
            }
            else {
              console.log(this.result);
              this._categoriesService.removeCategory(id).pipe(take(1)).subscribe(
                res => {
                  this.updateDBSource(res)
                },
                err => console.log(err)
              );
            }
          },
          err => console.log(err)
        )
        break

      case '/medidas':
        this._measuresService.removeMeasure(id).subscribe(
          res => this.updateDBSource(res),
          err => console.log(err)
        );
        break

      case '/niveles':
        this.result = this._levelsService.canDeleteLevel(id);

        this.result.pipe(take(1)).subscribe(
          res => {
            // console.log(res);
            if(res == false) {
              this._snackBar.open('Primero debe eliminar/modificar las rectas del nivel', '', {
                horizontalPosition:'center',
                verticalPosition:'bottom',
                duration:2500
              });
              return
            }
            else {
              console.log(res);
              this._levelsService.removeLevel(id).pipe(take(1)).subscribe(
                res => {
                  this.updateDBSource(res)
                },
                err => console.log(err)
              );
            }
          },
          err => console.log(err)
        )
        break

      case '/equipos':
        this._equipmentsService.removeEquipment(id).subscribe(
          res => this.updateDBSource(res),
          err => console.log(err)
        );
        break

      case '/ingredientes':
        console.log('INGREDIENTES');
        break

      default:
        throw new Error('ENTRADA NO VALIDA') ;
    }
  }


  loadEntries() {
    let currentUrl = this._router.url;

    switch (currentUrl) {
      case '/categorias':
        this._categoriesService.getCategoryList().subscribe(
          res => this.updateDBSource(res),
          err => console.log(err)
        );
        break
      case '/medidas':
        this._measuresService.getMeasures().subscribe(
          res => this.updateDBSource(res),
          err => console.log(err)
        );
        break
      case '/niveles':
        this._levelsService.getLevels().subscribe(
          res => this.updateDBSource(res),
          err => console.log(err)
        );
        break
      case '/equipos':
        this._equipmentsService.getEquipments().subscribe(
          res => this.updateDBSource(res),
          err => console.log(err)
        );
        break
      case '/ingredientes':
        console.log('INGREDIENTES');
        break
      default:
        throw new Error('ENTRADA NO VALIDA') ;
    }


  }

  updateDBSource(res:any[]) {
    // console.log(res);
    this.dbEntries = res;
    this.ENTRIES_DATA = new MatTableDataSource(this.dbEntries);
  }
}

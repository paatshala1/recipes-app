import { AfterContentInit, AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IngredientsDBService } from '../../services/ingredientsDB.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ingredient } from '../../models/ingredient.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreateIngredientComponent } from '../create-ingredient/create-ingredient.component';

@Component({
  selector: 'app-ingDB',
  templateUrl: './ingredientsDB.component.html',
  styleUrls: ['./ingredientsDB.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class IngredientsDBComponent implements OnInit, AfterViewInit {
  
  constructor(public ingsDBService:IngredientsDBService, private _snackbar:MatSnackBar, private router: Router) { 
    
  }
  
  
  // VARIABLES
  pageSizeOptions:number[] = [5, 10, 25, 50, 100]
  displayedColumns: string[] = ['name', 'notes', 'actions'];
  
  editMode:[Ingredient, boolean] = [
    {
    name:'',
    notes:''
    },
    false
  ];
  
  dbIngredients:Ingredient[] = [];
  ING_DATA!:MatTableDataSource<any>;

  // DECORATORS
  @ViewChild('matPaginator') paginator!: MatPaginator;


  // LIFECYCLE
  ngOnInit(): void {  
    this.loadIngredientsDB();
  }
  

  ngAfterViewInit(): void {
  }
  

  // FUNCTIONS
  applyFilter(event:Event) {
    const currentFilter = (event.target as HTMLInputElement).value;
    // console.log(currentFilter);
    this.ING_DATA.filter = currentFilter.trim().toLowerCase();
  }
  

  editIngredient(id:string, name:string, notes:string) {
    this._snackbar.open('Iniciando edición', '', {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 1500
    });
    this.editMode[0] = {
      name:name,
      _id:id,
      notes:notes
    }
    this.editMode[1] = true;
    console.log('🚀 ~ IngredientsDBComponent ~ editIngredient ~ editMode', this.editMode);
  }

  
  loadIngredientsDB() {
    this.ingsDBService.getIngredientsDB().subscribe(
      res => {
        this.dbIngredients = res;
        this.ING_DATA = new MatTableDataSource(this.dbIngredients);
        this.ING_DATA.paginator = this.paginator;
      },
      err => console.log(err)
    );
  }


  removeIngredient(id:string, name:string) {
    this.ingsDBService.removeIngredient(id).subscribe(
      res => {
        console.log(res);
        this.loadIngredientsDB();
        this._snackbar.open(`Se borró ingrediente: ${name}`, '', {
        verticalPosition: 'bottom',
        duration: 1500,
        horizontalPosition: 'center'
      });},
      err => console.log(err)
    );    
  }


}


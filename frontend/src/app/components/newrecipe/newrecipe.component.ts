import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Equipment } from 'src/app/models/equipment.model';
import { Ingredient } from '../../models/ingredient.model';
import { Level } from 'src/app/models/level.model';
import { Measure } from '../../models/measure.model';
import { ElementSelected } from '../../models/element-selected.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientsDBService } from 'src/app/services/ingredientsDB.service';
import { MeasuresService } from 'src/app/services/measures.service';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { LevelsService } from '../../services/levels.service';
import { RecipesService } from 'src/app/services/recipes.service';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';



@Component({
  selector: 'app-recetanueva',
  templateUrl: './newrecipe.component.html',
  styleUrls: ['./newrecipe.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true},
    },
  ],
})


export class NewrecipeComponent implements OnInit, AfterViewInit {
  
  constructor(
    private _snackbar:MatSnackBar,
    private myRouter:Router,
    public ingsDBService:IngredientsDBService,
    private levelService:LevelsService,
    private measureService:MeasuresService,
    private equipmentService:EquipmentsService,
    private categoryService:CategoriesService,
    private recipeService:RecipesService,
    private fb:FormBuilder
  ) { }


  ngAfterViewInit(): void { }
  
  ngOnInit(): void {  

    this.loadIngredientsDB();
    this.loadMeasures();
    this.loadEquipments();
    this.loadCategories();
    this.loadLevels();

  }

  // VARIABLES

  disable:boolean = true;

  CategoriesForm:FormGroup = this.fb.group(
    {
      category: new FormControl('', Validators.required)
    }
  )


  ElementsForm:FormGroup = this.fb.group(
    {
      elements: this.fb.array([this.createElement()], Validators.required)
    }
  );


  EquipmentsForm:FormGroup = this.fb.group(
    {
      equipment: this.fb.array([new FormControl('')], Validators.required)
    }
  );


  InstructionsForm:FormGroup = this.fb.group(
    {
    instructions: this.fb.array([new FormControl('')], Validators.required)
    }
  );


  LevelsForm:FormGroup = this.fb.group(
    {
      level: new FormControl('', Validators.required)
    }
  )


  PhotoForm:FormGroup = this.fb.group(
    {
      photo: new FormControl('', Validators.required)
    }
  )

  TipsForm:FormGroup = this.fb.group({
    tips: this.fb.array([new FormControl('')])
  })


  DescriptionForm:FormGroup = this.fb.group(
    {
      description: new FormControl('')
    }
  )


  NameForm:FormGroup = this.fb.group(
    {
      name: new FormControl('', Validators.required)
    }
  )

  // ESTA FUNCION "CREA" LA PROPIEDAD ELEMENTS DE LA CLASE
  elements = this.ElementsForm.get('elements') as FormArray;

  equipment = this.EquipmentsForm.get('equipment') as FormArray;

  instructions = this.InstructionsForm.get('instructions') as FormArray;

  tips = this.TipsForm.get('tips') as FormArray;
  

  pageSizeOptions:number[] = [5, 10, 25, 50, 100]
  displayedColumns: string[] = ['name'];  

  title = 'Crear receta';
  loading : Boolean = false;
  catList:Category[] = [];
  cleanMeasure:Measure = new Measure('', '');
  elementsSelected:ElementSelected[] = [];
  equipList:Equipment[] = [];
  recipeImageFile!:File;
  recipeImageFileName:string = '';
  ingList:Ingredient[]=[];
  levelList:Level[] = [];
  measureList!:Measure[];

  currentIng:String='';
  currentQty:Number=1;
  currentMeasure:String=''

  dbIngredients:Ingredient[] = [];
  ING_DATA!:MatTableDataSource<any>;

  // DECORATORS
  @ViewChild('matPaginator') paginator!: MatPaginator;

// ENVÍA LA LISTA DE INGREDIENTES YA MODIFICADA POR EL USUARIO
  addElementList() { }


  onRowClicked(row:any) {
    let currentElement = new ElementSelected(row, 1, this.cleanMeasure);
    this.elementsSelected.push(currentElement);
    console.log(this.elementsSelected);
    this.addElement();
  }


  createElement():FormGroup {
    return this.fb.group({
      ingredient: [null, Validators.required],
      quantity: [null, Validators.required],
      measure: [null, Validators.required]
    })
  }


  createNewRecipe() {
    if(this.LevelsForm.valid && this.CategoriesForm.valid && this.NameForm.valid && this.DescriptionForm.valid && this.ElementsForm.valid && this.InstructionsForm.valid && this.EquipmentsForm.valid && this.TipsForm.valid) {

      const newRecipeData = Object.assign({}, this.LevelsForm.value, this.CategoriesForm.value, this.NameForm.value, this.DescriptionForm.value, this.ElementsForm.value, this.InstructionsForm.value, this.EquipmentsForm.value, this.TipsForm.value,);

      this.recipeService.createRecipe(newRecipeData).subscribe(
        res => {
          console.log(res);
          this._snackbar.open('La receta fue creada con éxito', '', {
            duration: 1400,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          setTimeout(() => {
            this.myRouter.navigate(['/recetas']);
          }, 1500);
        },
        err => console.log(err)
      )
    }
    else {
      console.log('Formulario inválido. Debe Corregir los errores indicados');
    }
  }


  addElement() {
    this.elements.push(this.createElement());
  }


  addEquipment() {
    this.equipment.push(new FormControl(''));
  }


  addInstruction() {
    this.instructions.push(new FormControl(''));
  }


  addTip() {
    this.tips.push(new FormControl(''));
  }


  loadCategories() {
    this.categoryService.getCategoryList().subscribe(
      res => {
        this.catList = res;
      },
      err => console.log(err)
    )
  }


  loadEquipments() {
    this.equipmentService.getEquipments().subscribe(
      res => {
        this.equipList = res;
      },
      err => console.log(err)
    )
  }


  loadLevels() {
    this.levelService.getLevels().subscribe(
      res => {
        this.levelList = res;
      },
      err => console.log(err)
    )
  }

  loadMeasures() {
    this.measureService.getMeasures().subscribe(
      res => {
        this.measureList = res;
      },
      err => console.log(err)
    )
  }


  loadIngredientsDB() {
    this.ingsDBService.getIngredientsDB().subscribe(
      res => {
        this.ingList = res;
      },
      err => console.log(err)
    );
  }


  onPhotoSelected(event:any):void {
    if(event.target.files && event.target.files[0]) {
      this.recipeImageFile = <File>event.target.files[0];
      this.recipeImageFileName = this.recipeImageFile.name;
    }
    console.log(this.recipeImageFile);
  }


  updateInstructionsStatus(event:any) {
    
    if(event.target.value.length > 0) {
      this.disable = false;
      // console.log(this.disable);
    }
    else {
      this.disable = true;
    }
  
  }


  error() {
    this._snackbar.open('Falta ingrediente o cantidad', '', {
      duration:  5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


}

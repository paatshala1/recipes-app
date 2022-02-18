import { rendererTypeName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from 'src/app/services/recipes.service';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(private fb:FormBuilder, private _snackbar:MatSnackBar, private recipesService:RecipesService) { }

  ngOnInit(): void {
  }

  @Input() recipeID!:string;

  @Input() recipeUrlPhoto!:string | undefined;


  file!:File;
  imageSelected!:ArrayBuffer | string | null;


  UploadImageForm:FormGroup = this.fb.group(
    {
      recipeImage: new FormControl('', Validators.required)
    }
  )


  onImageSelected(event:any):void {
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        return this.imageSelected = reader.result;
      }
    }
  }


  uploadImage (file:File) {
    
    this._snackbar.open('Iniciando carga de imagen...', '', {
      duration: 800,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    const fd = new FormData();
    fd.append('recipeImage', file);
    fd.append('id', this.recipeID);

    this.recipesService.uploadImage(fd).subscribe(
      res => {
        console.log(res);
        setTimeout(() => {
          this._snackbar.open('Imagen cargada...', '', {
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }, 2000);
      },
      err => console.log(err)
    )
    

  }

}

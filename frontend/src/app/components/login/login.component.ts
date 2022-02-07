import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoggedService } from '../../services/logged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  
  constructor(private fb:FormBuilder, private _snackbar:MatSnackBar, private myRouter:Router, private logService:LoggedService) {
    
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })

  }
  
  ngOnInit(): void {
    this.logService.loginStatus$.subscribe( value => {
      this.loginStatus = value;
    })
  }

  ngOnDestroy(): void {
  }

  public loginStatus: any;

  loginForm:FormGroup;
  
  ingresar() {
    if (this.loginForm.value.user == 'hibou' && this.loginForm.value.password == '12345') {
      this.logService.loginStatus$.next(true);
      this.myRouter.navigate(['/recetas']);
    }
    else {
      this._snackbar.open('Datos incorrectos', '', {
        duration: 4000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      });
      this.loginForm.reset();
    }
  }

}

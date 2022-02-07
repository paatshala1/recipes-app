import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedService } from '../../services/logged.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private myRouter:Router, private logService:LoggedService) { 
    
    this.logService.loginStatus$.subscribe( value => {
      this.loginStatus = value;
    })
  }
  
  ngOnInit(): void {
  }
  
  thenBlock:TemplateRef<any>|null = null;
  elseBlock:TemplateRef<any>|null = null;
  
  public loginStatus:any;

  

  goLogin() {
    this.myRouter.navigate(['login']);
  }

  salir() {
    this.myRouter.navigate(['']);
    this.logService.loginStatus$.next(false);
  }
  
  async getCategoryList() {
    return await this.myRouter.navigate(['recetas']);
  }
  

}


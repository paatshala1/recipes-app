import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  constructor() { }

  public loginStatus$ = new BehaviorSubject<boolean>(true);

}

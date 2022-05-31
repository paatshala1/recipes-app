import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../models/equipment.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(private http:HttpClient) { }

  URL_API = 'https://angelacocina.herokuapp.com/api/equipment';


  addEquipment(form:FormGroup) {
    return this.http.post(`${this.URL_API}/create`, form.value);
  }


  canDeleteEquipment(id:string) {
    return this.http.get<boolean>(`https://angelacocina.herokuapp.com/api/recipe/equipment/${id}`);
  }


  editEquipment(form:FormGroup, id?:string) {
    return this.http.put(`${this.URL_API}/update/${id}`, form.value)
  }


  getEquipments() {
    return this.http.get<Equipment[]>(`${this.URL_API}/list`)
  }


  removeEquipment(id:string) {
    return this.http.delete<Equipment[]>(`${this.URL_API}/delete/${id}`);
  }
}

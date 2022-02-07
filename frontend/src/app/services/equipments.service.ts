import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(private http:HttpClient) { }

  URL_API = 'http://localhost:4000/api/equipment';

  getEquipments() {
    return this.http.get<Equipment[]>(`${this.URL_API}/list`)
  }
}

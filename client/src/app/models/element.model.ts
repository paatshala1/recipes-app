import { Measure } from './measure.model';
import { Ingredient } from './ingredient.model';


export class Element {
  id?:any;
  ingredient:Ingredient;
  quantity:number;
  measure:Measure;

  constructor(id:any, ingredient:Ingredient, quantity:number, measure:Measure){
    this.id = id;
    this.quantity = quantity;
    this.ingredient = ingredient;
    this.measure = measure;
  }
}

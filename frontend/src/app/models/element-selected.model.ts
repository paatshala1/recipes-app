import { Ingredient } from './ingredient.model';
import { Measure } from './measure.model';

export class ElementSelected {
  ingredient:Ingredient;
  quantity:number;
  measure:Measure;

  constructor(ingredient:Ingredient, quantity:number, measure:Measure) {
    this.ingredient = ingredient;
    this.quantity = 1;
    this.measure = measure;
  }
}

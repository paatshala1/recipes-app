export class Element {
  private id:any;
  private ingredient:string;
  private quantity:number;
  private measure:string;

  constructor(id:any, ingredient:string, quantity:number, measure:string){
    this.id = id;
    this.quantity = quantity;
    this.ingredient = ingredient;
    this.measure = measure;
  }
}

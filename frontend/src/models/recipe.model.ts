import { Element } from './element.model';

export class Recipe {
  id?:string;
  category:string;
  name:string;
  description:string[];
  elements:Element[];
  instructions:string[];
  tips?:string[];
  equipment?:string[];
  urlPhoto?:string;
  public_id?:string;
  level:string

  constructor(id:any, category:string, name:string, description:string[],  elements:Element[], instructions:string[], tips:string[], equipment:string[], urlPhoto:string, public_id:string, level:string){
    this.id = id;
    this.category = category;
    this.name = name;
    this.description = description;
    this.elements = elements;
    this.instructions = instructions;
    this.tips = tips;
    this.equipment = equipment;
    this.urlPhoto = urlPhoto;
    this.public_id = public_id;
    this.level = level;
  }
}

import { Element } from './element.model';
import { Category } from './category.model';
import { Level } from './level.model';
import { Equipment } from './equipment.model';

export class Recipe {
  _id?:string;
  category:Category;
  name:string;
  description:string[];
  elements:Element[];
  instructions:string[];
  tips?:string[];
  equipment?:Equipment[];
  urlPhoto?:string;
  level:Level;

  constructor(_id:any, category:Category, name:string, description:string[],  elements:Element[], instructions:string[], tips:string[], equipment:Equipment[], urlPhoto:string, level:Level){
    this._id = _id;
    this.category = category;
    this.name = name;
    this.description = description;
    this.elements = elements;
    this.instructions = instructions;
    this.tips = tips;
    this.equipment = equipment;
    this.urlPhoto = urlPhoto;
    this.level = level;
  }
}

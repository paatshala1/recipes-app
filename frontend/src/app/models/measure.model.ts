export class Measure {
  _id?:string;
  name:string;

  constructor(id:string, name:string) {
    this._id = id;
    this.name = name;
  }
}

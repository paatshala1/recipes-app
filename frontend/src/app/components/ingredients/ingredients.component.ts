import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})



export class IngredientsComponent implements OnInit {

  @Input() myIngList:any[] = [];

  @Output() buyIngredients = new EventEmitter<number>();



  qtyIngsToBuy : number = 0;

  myCart(value: boolean){
    if (value == true) {
      this.qtyIngsToBuy += 1;
      this.buyIngredients.emit(this.qtyIngsToBuy);
    }
    else {
      this.qtyIngsToBuy -= 1;
      this.buyIngredients.emit(this.qtyIngsToBuy);
    }
  }


  $myList = document.getElementById('myList');
  

  constructor() { }

  ngOnInit(): void {
  }

  

}

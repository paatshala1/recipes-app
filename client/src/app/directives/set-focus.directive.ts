import { Directive, ElementRef, OnInit, AfterContentChecked} from '@angular/core';

@Directive({
  selector: '[SetFocus]'
})
export class SetFocusDirective implements OnInit, AfterContentChecked{

  constructor(private elemRef:ElementRef) {

  }

  
  ngAfterContentChecked(): void {
    this.elemRef.nativeElement.focus();
  }
  
  
  ngOnInit(): void { 
    
  }


  

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-delete-detail',
  templateUrl: './add-edit-delete-detail.component.html',
  styleUrls: ['./add-edit-delete-detail.component.css']
})
export class AddEditDeleteDetailComponent implements OnInit {

  constructor(private _fb:FormBuilder) {
    this.EntryForm = this._fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  
  @Input() editMode!:[any, boolean];


  EntryForm!:FormGroup;


  addOrEditEntry(form:FormGroup) {

  }
}

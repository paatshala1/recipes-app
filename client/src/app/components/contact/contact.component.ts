import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  ngOnInit(): void {
  }

  contactForm:FormGroup;

  constructor(private fb:FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      asunto: [''],
      comentario: ['', Validators.required]
    });
  }

  enviar() {
    const user = this.contactForm.value.nombre;
    const subject = this.contactForm.value.asunto;
    const comment = this.contactForm.value.comentario;
    console.log(user + subject + comment);
  }

}

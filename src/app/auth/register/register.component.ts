import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup({
    sufijo: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    apPaterno: new FormControl('', [Validators.required]),
    apMaterno: new FormControl('', []),
    especialidad: new FormControl('', [Validators.required]),
    // To Be Defined
    // ubicacion: new FormGroup({
    //   tipo: new FormControl(''),
    //   localizacion: new FormGroup({
    //     calle: new FormControl(''),
    //     numero: new FormControl(''),
    //     colonia: new FormControl(''),
    //     municipio: new FormControl(''),
    //     estado: new FormControl(''),
    //     cp: new FormControl('')
    //   })
    // }),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', Validators.required),
    numTel: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(){
    console.warn(this.registerForm.value);
  }
}

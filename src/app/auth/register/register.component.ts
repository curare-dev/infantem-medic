import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public passwordMatch = false;
  public error = undefined;
  public registerForm = new FormGroup({
    sufijo: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    apPaterno: new FormControl('', [Validators.required]),
    apMaterno: new FormControl('', []),
    especialidad: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', Validators.required),
    numTel: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    const { repeatPassword, ...form } = this.registerForm.value;
    this.authService.register( form ).subscribe( data => {
      if(data.errors?.length){
        this.error = data.errors
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  public matchPasswords(e: any) {
    if(this.registerForm.value.password === e){
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }
}

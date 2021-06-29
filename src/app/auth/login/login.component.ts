import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error = undefined;
  public loading = false;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  public onSubmit(){
    this.authService.login( this.loginForm.value ).subscribe( ( {errors, data} ) => {
      this.loading = true;
      setTimeout( ()=>{
        if(errors?.length){
        this.loading = false;
        this.error = errors;
      } else {
        localStorage.setItem('token', data.authMedic.token);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }
      }, 1000);
      
    });
  }

}

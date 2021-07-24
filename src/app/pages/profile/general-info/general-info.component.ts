import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicService } from 'src/app/services/medic/medic.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  public token = localStorage.getItem('token');
  public medicInfo = {};
  public isChecked = false;
  public generalInfoForm = new FormGroup({
    sufijo: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    apPaterno: new FormControl('', [Validators.required]),
    apMaterno: new FormControl('', []),
    especialidad: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}),
    numTel: new FormControl(''),
  });

  constructor(private medicService: MedicService) {}

  ngOnInit(): void {
    this.buildForm();
    this.disableForm();
  }

  onSubmit(){
    console.log(this.generalInfoForm.value);
  }

  buildForm(){
    this.medicService.getMedic(this.token || '').subscribe(({data}) => {
      sessionStorage.setItem('mid', data.getMedic.id);
      this.generalInfoForm.patchValue({
        sufijo: data.getMedic.sufijo,
        nombre: data.getMedic.nombre,
        apPaterno: data.getMedic.apPaterno,
        apMaterno: data.getMedic.apMaterno,
        especialidad: data.getMedic.especialidad,
        email: data.getMedic.email,
        numTel: data.getMedic.numTel,
      })
    });
  }

  disableForm(){
    if(!this.isChecked){
      Object.entries(this.generalInfoForm.controls).forEach( ([, value], index) =>{
        value.disable();
      });
    } else {
      Object.entries(this.generalInfoForm.controls).forEach( ([name, value], index) =>{
        if(name !== 'email') value.enable();
      });
    }
  }

}

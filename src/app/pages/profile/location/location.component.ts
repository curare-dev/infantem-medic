import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicService } from 'src/app/services/medic/medic.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public mid = sessionStorage.getItem('mid');
  public isChecked = false;
  public locationForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    country: new FormControl({ value: 'México', disabled: true}),
  });
  constructor(private medicService: MedicService) { }

  ngOnInit(): void {
    this.buildForm();
    this.disableForm();
    // this.getLocation();
    // Si el médico esta en google maps, traer su ubicación de ahí
  }

  public onSubmit() {
    console.log(this.locationForm.value);
  }

  buildForm(){
    this.medicService.getMedicLocation(this.mid).subscribe(({data}) => {
      if(data.getLocation){
        this.locationForm.patchValue({
          street: data.getLocation.street,
          number: data.getLocation.number,
          city: data.getLocation.city,
          state: data.getLocation.state,
          postalCode: data.getLocation.postalCode,
          country: data.getLocation.country,
        })
      }
    });
  }

  disableForm(){
    if(!this.isChecked){
      Object.entries(this.locationForm.controls).forEach( ([, value], index) =>{
        value.disable();
      });
    } else {
      Object.entries(this.locationForm.controls).forEach( ([name, value], index) => name !== 'country' && value.enable());
    }
  }

  //Deprecate method --- Medic maybe not be in the office
  getLocation(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
      }, (error)=>{
        console.log(error);
      });
    } else {
      console.log('Geo localizacion no disponible');
    }
  }

}

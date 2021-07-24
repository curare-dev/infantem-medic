import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { MedicService } from 'src/app/services/medic/medic.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;
  imageSrc: string = '';
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor( private router: Router, private medicService: MedicService) {
    this.navLinks = [
      {
          label: 'Información General',
          link: './general-info',
          index: 0
      }, {
          label: 'Ubicación',
          link: './location',
          index: 1
      }, {
          label: 'Configuración',
          link: './configuration',
          index: 2
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  getFile(){
    document.querySelector('input')?.click();
  }

  handleInputFileSelector(event: any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log(this.imageSrc);
        this.myForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

}

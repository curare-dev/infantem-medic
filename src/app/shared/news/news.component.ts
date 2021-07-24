import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  title: '',
  body: '',
  okButton: '',
  uri: '';
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router ) { }

  ngOnInit(): void {
  }

  okButton(){
    if(this.data.uri){
      this.router.navigate([this.data.uri])
    }
  }

}

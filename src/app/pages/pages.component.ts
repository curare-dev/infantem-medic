import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicService } from '../services/medic/medic.service';
import { NewsComponent } from '../shared/news/news.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public mid = sessionStorage.getItem('mid');
  constructor(public dialog: MatDialog, private medicService: MedicService) { }

  ngOnInit(): void {
    this.medicService.getMedicLocation(this.mid).subscribe( ({data}) => !data.getLocation && this.openDialog());
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewsComponent, {
      width: '35%',
      data: {
        title: '<span style="color: red;">Importante!</span> Subir La ubicación de consultorio',
        body: 'Hola!, Para que mas pacientes te encuentren, registra la ubicación de tu consultorio y/o lugar de trabajo a donde quieres que lleguen tus pacientes!',
        okButton: 'Registrar Ubicación',
        uri: '/profile/location'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

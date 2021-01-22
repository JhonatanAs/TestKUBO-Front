import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PeliculaDialogComponent } from '../pelicula-dialog/pelicula-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public user:any;
  constructor(
    private router:Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user =JSON.parse(localStorage.getItem("user"));
  }
  openNPelicula(): void {
    const dialogRef = this.dialog.open(PeliculaDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {


      console.log(result);
    });
  }



}

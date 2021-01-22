import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/models/Pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { Constantes } from 'src/app/utils/Constantes';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  urlImg= Constantes.img;
  peliculas=[];
  filtroCate:number;

  categorias:[];
  constructor(
    private snackBar:MatSnackBar,
    private router: Router,
    private peliculaService:PeliculaService
  ) { }

  ngOnInit(): void {
    this.peliculaService.listar_peliculas().subscribe(res=>{
      if(res.status=="ok"){
        this.peliculas = res.data;
        console.log(this.peliculas)
      }
    });

    this.peliculaService.listar_categorias().subscribe(res=>{
      if(res.status=="ok"){
        this.categorias=res.data;
      }
      });

  }
  filtra(categoria:number){
    console.log(categoria);
    this.peliculaService.filtro(categoria).subscribe(res=>{
      if(res.status=="ok"){
        this.peliculas=res.data;
        console.log(this.peliculas);
      }
      else{
        this.openSnackBar("No ahy peliculas en esta categoria","Cerrar");
      }
    })
  }
  vista(pelicula:number){
    this.peliculaService.marca_vista(pelicula).subscribe(res=>{
      if(res.status=="ok"){
        this.router.navigateByUrl('/Publications', {skipLocationChange: true}).then(()=>
              this.router.navigate(["inicio"]));

      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}

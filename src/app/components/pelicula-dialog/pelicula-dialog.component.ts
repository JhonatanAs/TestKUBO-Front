import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/models/Pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { Constantes } from 'src/app/utils/Constantes';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pelicula-dialog',
  templateUrl: './pelicula-dialog.component.html',
  styleUrls: ['./pelicula-dialog.component.css']
})


export class PeliculaDialogComponent implements OnInit {
  value:string;
  hide:boolean;
  removable = true;
  user:string;
  birthdate:Date;
  fecha_actual = new Date();
  fecha_nac: String;
  categorias=[];
  categoria_p:number;
  categorias_selec =[];

  fileToUpload :File = null;
  fileToUploadName :String = "";
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nickFormControl = new FormControl('', [
    Validators.required,

  ]);
  public pelicula:Pelicula;
  matcher = new MyErrorStateMatcher();
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<PeliculaDialogComponent>,
    private peliculaService:PeliculaService,
    @Inject(MAT_DIALOG_DATA) public data: string) {}


  ngOnInit(): void {
    this.pelicula = new Pelicula();
    this.peliculaService.listar_categorias().subscribe(res=>{
      if(res.status=="ok"){
        this.categorias=res.data;
      }
    })
  }



  guarda_pelicula(){

      this.pelicula.fecha_estreno = this.fecha_nac;
      this.pelicula.categoria =  this.categoria_p;

      this.peliculaService.register(this.pelicula).subscribe(res =>{
        if(res.status =="ok"){


          this.openSnackBar("La pelicula se guardo correctamente","Cerrar");

          this.router.navigateByUrl('/Publications', {skipLocationChange: true}).then(()=>
              this.router.navigate(["inicio"]));
          this.dialogRef.close();
        }
        else{
          this.openSnackBar("Algo salio mal,intente nuevamente","Cerrar");
          this.dialogRef.close();
        }
      });




  }

  handleFileInput(file: File) {
    this.fileToUpload = file[0].base64;
    this.fileToUploadName = file[0].name;
    this.pelicula.image = this.fileToUpload.toString().split(',')[1];

  }

  dateInputR(date: Date){
    this.fecha_nac = this.dateToString(date);
  }

  dateToString(date:Date):String{
    var annio = date.getFullYear();
    var mes = date.getMonth() + 1;
    var dia = date.getDate();

    var M: string;
    var D: string;

    M = "" + mes;
    D = "" + dia;
    if (mes < 10) {
      M = "0" + mes;
    }

    if (dia < 10) {
      D = "0" + dia;
    }
    return annio + "/" + M + "/" + D;

  }
  addCategoria(){
    this.categorias_selec.push(this.categoria_p);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}

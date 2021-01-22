import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/Pelicula';
import { Constantes } from '../utils/Constantes';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {


  HEAD = Constantes.httpOptions;
  API_URL_PHP = Constantes.API_URL_PHP;
  constructor(private http:HttpClient) { }

  register(pelicula:Pelicula):Observable<any>{

    return this.http.post(this.API_URL_PHP + '/api/pelicula/guardar', pelicula, this.HEAD);
  }

  listar_peliculas():Observable<any>{

    return this.http.get(this.API_URL_PHP + '/api/pelicula/listar', this.HEAD);
  }

  listar_categorias():Observable<any>{

    return this.http.get(this.API_URL_PHP + '/api/pelicula/listarCategorias', this.HEAD);
  }

  filtro(categoria:number):Observable<any>{

    return this.http.get(this.API_URL_PHP + '/api/pelicula/filtro/'+categoria, this.HEAD);
  }
  marca_vista(pelicula:number):Observable<any>{
    return this.http.get(this.API_URL_PHP + '/api/pelicula/marcar/'+pelicula, this.HEAD);
  }


}

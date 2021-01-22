import { HttpHeaders } from '@angular/common/http';

export class Constantes{

  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  };
  static img = "http://72.44.54.160/KUBO/Prueba/assets/img/peliculas";
  static API_URL_PHP = "http://72.44.54.160/KUBO/Prueba/index.php";

}

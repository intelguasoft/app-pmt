import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaPeajes, Peaje, RespuestaPeaje } from '../interfaces/interfaces';
import { AuthService } from './auth.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PeajesService {

  paginaPeaje = 0;

  nuevoPeaje = new EventEmitter<Peaje>();

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  async getPeajes( pull: boolean = false ) {

    if (pull) {
      this.paginaPeaje = 0;
    }

    this.paginaPeaje++;

    const token = await this.auth.getToken();
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + token
      })
    };

    return this.http.get<RespuestaPeajes>(`${URL}/api/v1/peaje/tolls?page=${this.paginaPeaje}`, httpOptions);

  }

  savePeaje(peaje: Peaje) {

    return new Promise(async (resolve) => {
      const token = await this.auth.getToken();
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + token
        })
      };
      this.http.post<RespuestaPeaje>(`${URL}/api/v1/peaje/tolls`, peaje, httpOptions)
        .subscribe((rpt) => {
          console.log(rpt);
          this.nuevoPeaje.emit(rpt.data);
          resolve(true);
        });

    });
  }
}

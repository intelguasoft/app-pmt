import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaTipoVeniculoPeaje, RespuestaTipoVeniculoPeajeId } from '../interfaces/interfaces';
import { AuthService } from './auth.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoPeajesService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  async getTipoVehiculosPeaje() {
    const token = await this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + token
      })
    };
    return await this.http.get<RespuestaTipoVeniculoPeaje>(`${URL}/api/v1/peaje/type-toll-vehicles`, httpOptions);
  }

  async getTipoVehiculosPeajeById(id: number) {

    const token = await this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + token
      })
    };
    return await this.http.get<RespuestaTipoVeniculoPeajeId>(`${URL}/api/v1/peaje/type-toll-vehicles/${id}`, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaLogin, User } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);
  token: string = null;
  user: User = {};

  constructor(private http: HttpClient,
              private storage: Storage) { }

  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {

      this.http.post<RespuestaLogin>(`${URL}/api/v1/auth/login`, data)
        .subscribe(async (resp) => {
          console.log(resp);
          if (resp.data.ok) {
            await this.saveToken(resp.data.access_token);
            await this.saveUser(resp.data.user);
            this.authState.next(true);
            resolve(true);
          } else {
            this.token = null;
            this.user = null;
            await this.storage.clear();
            this.authState.next(false);
            resolve(false);
          }
        });

    });

  }

  async saveUser(user: User) {
    this.user = user;
    await this.storage.set('user', user);
  }

  async getUser() {
    return await this.storage.get('user');
  }

  async getToken() {
    return await this.storage.get('token');
  }

  async logout() {
    this.token = null;
    this.user = null;
    this.authState.next(false);
    await this.storage.remove('token');
    await this.storage.remove('user');
  }

  async saveToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);

  }

  isAuthenticated() {
    return this.authState.value;
  }


}

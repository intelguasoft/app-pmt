import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class GuardService implements CanActivate {
  constructor(
    public auth: AuthService
  ) { }

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage implements OnInit {

  user: User = {};

  constructor(private storage: Storage,
    private auth: AuthService,
    private router: Router) { }

  async ngOnInit() {
    await this.storage.get('user').then(res => {
      this.user = res;
    });
  }

  async cerrarSesion() {
    await this.auth.logout();
    this.router.navigateByUrl('login');
  }
}

import { Component, OnInit } from '@angular/core';
import { PeajesService } from '../../services/peajes.service';
import { Peaje } from 'src/app/interfaces/interfaces';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarPeajePage } from '../modals/agregar-peaje/agregar-peaje.page';

@Component({
  selector: 'app-peajes',
  templateUrl: 'peajes.page.html',
  styleUrls: ['peajes.page.scss']
})
export class PeajesPage implements OnInit {

  peajes: Peaje[] = [];
  hay: boolean;

  constructor(private peajesService: PeajesService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    // console.log(this.peajes);
    this.cargarData();
  }

  refrescar(event) {
    this.cargarData(event);
    this.peajes = [];
  }

  async cargarData(event?) {
    const peajes = await this.peajesService.getPeajes();
    peajes.subscribe(es => {
      if (this.peajes === []) {
        this.hay = true;
      } else {
        this.peajes.push(...es.data);
        this.hay = true;
      }
      if (event) {
        event.target.complete();
      }
    });
  }

  async modalAgregarPeaje() {
    const peajeModal = await this.modalCtrl.create({
      component: AgregarPeajePage,
      componentProps: {}
    });

    await peajeModal.present();
  }


}

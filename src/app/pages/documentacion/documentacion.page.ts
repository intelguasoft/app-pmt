import { Component, OnInit } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-documentacion',
  templateUrl: 'documentacion.page.html',
  styleUrls: ['documentacion.page.scss']
})
export class DocumentacionPage implements OnInit {

  constructor(private document: DocumentViewer) {}

  ngOnInit() {

    const options: DocumentViewerOptions = {
      title: 'Mi reglamento de transito'
    };

    this.document.viewDocument('assets/ley_reglamento_transito.pdf', 'application/pdf', options);

  }


}

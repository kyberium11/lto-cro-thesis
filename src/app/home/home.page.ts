import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as Tesseract from 'tesseract.js'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo: SafeResourceUrl;
  textImage: String;

  constructor(private sanitizer: DomSanitizer) {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    
    Tesseract.recognize(image.dataUrl)
    .then(result => {
      console.log(result);
      this.textImage = result.data.text;
    })
    .catch(err => console.error(err));

  }

}

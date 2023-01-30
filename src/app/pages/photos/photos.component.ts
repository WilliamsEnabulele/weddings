import { Component } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {

  photos = [{
    id: 1,
    url: "../../../assets/img/godwin_ebele_1.jpg"
  },
  {
    id: 2,
    url: "../../../assets/img/godwin_ebele_1.jpg"
  },
  {
    id: 3,
    url: "../../../assets/img/godwin_ebele_1.jpg"
  },
  {
    id: 4,
    url: "../../../assets/img/godwin_ebele_1.jpg"
  },
  {
    id: 5,
    url: "../../../assets/img/godwin_ebele_1.jpg"
  }]

}

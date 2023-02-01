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
    url: "../../../assets/img/godwin_ebele_2.jpg"
  },
  {
    id: 3,
    url: "../../../assets/img/godwin_ebele_3.jpg"
  },
  {
    id: 4,
    url: "../../../assets/img/godwin_ebele_4.jpg"
  },
  {
    id: 5,
    url: "../../../assets/img/godwin_ebele_wide.jpg"
  },
  {
    id: 6,
    url: "../../../assets/img/ebele_white.jpg"
  },
  {
    id: 7,
    url: "../../../assets/img/couple_white.jpg"
  },
  {
    id: 8,
    url: "../../../assets/img/ebele_single.jpg"
  },
]
  
}

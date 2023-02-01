import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { VenueComponent } from './pages/venue/venue.component';
import { StreamComponent } from './pages/stream/stream.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
        pathMatch: 'full'
      },
      {
        path: 'venue',
        component: VenueComponent
      },
      {
        path: 'gifts',
        component: GiftsComponent
      },
      {
        path: 'photos',
        component: PhotosComponent
      },
      {
        path: 'stream',
        component: StreamComponent
      },
      {
        path: '*',
        component: NotfoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

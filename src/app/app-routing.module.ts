import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { ScreamComponent } from './pages/scream/scream.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path:'',
        redirectTo: 'home',
        pathMatch:'full'
      },
      {
        path: 'home',
        component: LandingComponent
      },
      {
        path: 'rsvp',
        component: RsvpComponent
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
        path: 'scream',
        component: ScreamComponent
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { ScreamComponent } from './pages/scream/scream.component';
import { MainComponent } from './layout/main/main.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PhotosComponent,
    RsvpComponent,
    ScreamComponent,
    MainComponent,
    GiftsComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

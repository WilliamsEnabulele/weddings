import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Angular4PaystackModule } from 'angular4-paystack';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { VenueComponent } from './pages/venue/venue.component';
import { StreamComponent } from './pages/stream/stream.component';
import { MainComponent } from './layout/main/main.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AvatarComponent } from './shared/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PhotosComponent,
    VenueComponent,
    StreamComponent,
    MainComponent,
    GiftsComponent,
    NotfoundComponent,
    HeaderComponent,
    MenuComponent,
    ModalComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Angular4PaystackModule.forRoot('pk_test_3692417b8ab0a3a9edd73e03dfffd16b359c9470'),

    AngularFireModule.initializeApp(
      environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

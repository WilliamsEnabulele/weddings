import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

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
import { HeaderComponent } from './shared/components/header/header.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { AvatarComponent } from './shared/components/avatar/avatar.component';
import { CountDownTimerComponent } from './shared/components/count-down-timer/count-down-timer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { PaystackDirective } from './shared/directives/paystack.directive';

export function playerFactory() {
  return player;
}

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
    ModalComponent,
    AvatarComponent,
    CountDownTimerComponent,
    LoaderComponent,
    PaystackDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    AngularFireModule.initializeApp(
      environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule,
      LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

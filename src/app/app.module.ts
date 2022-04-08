import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// mannually import
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

// import provider
import {fakeBackendProvider} from 'src/app/_helpers/fake-backend';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component'
import { EncrypDataService } from 'src/app/_service/encryp-data.service';
import { NotFoundComponent } from './components/not-found/not-found.component'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NotAuthorizedComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    fakeBackendProvider,
    EncrypDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

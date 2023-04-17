import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { NotesBucketComponent } from './notes-bucket/notes-bucket.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginFormsComponent } from './login-forms/login-forms.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotesBucketComponent,
    AddNotesComponent,
    ProfileComponent,
    HomeComponent,
    NotFoundComponent,
    LoginFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

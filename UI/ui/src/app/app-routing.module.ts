import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesBucketComponent } from './notes-bucket/notes-bucket.component';
import { ProfileComponent } from './profile/profile.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { UserGuard } from './_guards/user.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginFormsComponent } from './login-forms/login-forms.component';
import { LoginGuard } from './_guards/login.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'notes', component: NotesBucketComponent, canActivate: [UserGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},
  {path: 'add-notes', component: AddNotesComponent, canActivate: [UserGuard]},
  {path: 'signup', component: LoginFormsComponent, canActivate: [LoginGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

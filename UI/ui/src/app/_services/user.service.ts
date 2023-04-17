import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup, UserAuth } from '../_Interface/account';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'https://localhost:7093/api/Users';
  isUserLoggedIn = new EventEmitter<boolean>(false);
  errors = new EventEmitter<string>();
  private currentUserSource = new BehaviorSubject<UserAuth | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(user: Signup) {
    return this.http.post(this.baseUrl + '/register', user).subscribe((result: any) => {
      if(result) {
        localStorage.setItem('user', JSON.stringify(result));
        this.isUserLoggedIn.emit(true);
        this.currentUserSource.next(result);
        this.router.navigateByUrl('/notes');
      }
    });
  }

  login(user: Login) {   
    this.http.post(this.baseUrl + '/login', user).subscribe({
      next: (result: any) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.isUserLoggedIn.emit(true);
        this.currentUserSource.next(result);        
        this.router.navigateByUrl('/notes');
      },
      error: (error) => {
        this.errors.emit(error.error)
      }
    });
  }

  setCurrentUser(user: UserAuth) {
    this.currentUserSource.next(user);
  }

  logout() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.isUserLoggedIn.emit(false);
      this.currentUserSource.next(null);
    }
  }
}

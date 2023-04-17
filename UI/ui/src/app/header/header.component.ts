import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  isUserLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(){
    let item = localStorage.getItem('user');
    if(item) {
      this.isUserLoggedIn = true;
    } 
    this.userService.isUserLoggedIn.subscribe(result => {
      this.isUserLoggedIn = result;        
    });
  }

  logout() {
    this.userService.logout();
    this.isUserLoggedIn = false;
    this.router.navigateByUrl('/');
  }


}

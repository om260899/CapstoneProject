import { Component } from '@angular/core';
import { UserService } from './_services/user.service';
import { UserAuth } from './_Interface/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ENotes';

  constructor(private userService: UserService){}

  ngOnInit(){
    let currUser = localStorage.getItem('user');
    if(currUser === null) return;
    let user: UserAuth = currUser && JSON.parse(currUser);
    this.userService.setCurrentUser(user);
  }
}

import { Component, EventEmitter } from '@angular/core';
import { Login, Signup } from '../_Interface/account';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor() {}

  ngOnInit(): void {
  }

  
}

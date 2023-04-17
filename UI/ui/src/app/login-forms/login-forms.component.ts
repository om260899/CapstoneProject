import { Component } from '@angular/core';
import { Login, Signup } from '../_Interface/account';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styleUrls: ['./login-forms.component.css']
})
export class LoginFormsComponent {
  
  show: boolean = true;
  isEmailValid: boolean = true;
  isPassValid: boolean = true;
  passError: string = '';
  showToast: boolean = false;
  toastHeader: string = '';
  toastBody: string = '';

  constructor(private userService: UserService){}

  ngOnInit(){}

  registerUser(user: Signup) {
    if ( user.email.search('[@]') < 0 || user.email.search('[.]') < 0 ) {
      this.isEmailValid = false;
    } else {
      this.isEmailValid = true;
    }
    if ( user.password.length < 4) {
      this.isPassValid = false;
      this.passError = 'Password cannot be less than 4 characters !';
    } else if ( user.password.length > 8 ) {
      this.isPassValid = false;
      this.passError = 'Password cannot be more than 8 characters !';
    } else if ( user.password.search('[0-9]') < 0 || 
      user.password.search('[a-z]') < 0 || 
      user.password.search('[A-Z]') < 0 || 
      user.password.search('[!@#$%^&*()]') < 0 ) {
        this.isPassValid = false;
        this.passError = 'Password must contain a digit, special character, small and capital letters !'
    } else {
      this.isPassValid = true;
    }
    if (user && this.isEmailValid && this.isPassValid) {        
      this.userService.register(user);
    }
  }

  loginUser(user: Login) {
    if (user) {     
      this.userService.login(user);
      this.userService.errors.subscribe(result => {
        if(result){
          this.showToast = true;
          this.toastHeader = 'Login failed !';
          this.toastBody = result;
        } 
      });
    } 
  }

  toggleForm() {
    this.show = !this.show;
  }
}

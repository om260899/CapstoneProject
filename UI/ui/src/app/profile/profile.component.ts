import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetailService } from '../_services/user-detail.service';
import { UpdateUser, UserDetail } from '../_Interface/user-detail';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { UserAuth } from '../_Interface/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  username: string = 'username';
  email: string = 'email';
  isInvalid: boolean = false;
  @ViewChild('profileFrm') profileFrm: NgForm | undefined;
  
  constructor(private userDetailService: UserDetailService, private userService: UserService){}

  ngOnInit(): void{
    let uname: string = '';
    this.userService.currentUser$.subscribe(val => {
      
      if(val) {
          uname = val?.username;
          this.userDetailService.getUser(uname).subscribe((result: UserDetail) => {
            this.username = result.username;
            this.email = result.email;
            let value = {
              username: this.username,
              email: this.email
            };
            this.profileFrm?.setValue(value);
        });
      }
    });
  }

  updateProfile(value: any){
    
    if(value.email === '') {
      this.isInvalid = true;
    }

    this.userService.currentUser$.subscribe(val=>{
      if(val)
        this.username = val?.username;        
    });
    let userToUpdate: UpdateUser = {
      username: this.username,
      email: value.email
    }

    this.userDetailService.updateUser(userToUpdate).subscribe((result: any) => {
      if(result) {
        this.username = result.username;
        this.email = result.email;
      }
    })
    
  }
}

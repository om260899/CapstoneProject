import { Injectable } from '@angular/core';
import { UpdateUser, UserDetail } from '../_Interface/user-detail';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  baseUrl: string = 'https://localhost:7093/api/UserDetail';

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(){
    
  }

  getUser(username: string) {
    return this.http.get<UserDetail>(this.baseUrl + '/' + username);
  }

  updateUser(user: UpdateUser) {    
    return this.http.put(this.baseUrl + '/update/' + user.username, user);
  }
}

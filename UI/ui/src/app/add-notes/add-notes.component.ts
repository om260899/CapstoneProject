import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserDetailService } from '../_services/user-detail.service';
import { UserNotesService } from '../_services/user-notes.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent {  

  id:number | undefined;
  showSuccAlert: boolean = false;
  showFailAlert: boolean = false;

  ngOnInit(){
    let username='';

    this.userService.currentUser$.subscribe(val=>{
      if(val) {
        username = val?.username;
      }
    });

    this.userDetailService.getUser(username).subscribe((result:any)=>{
      this.id = result.id;      
    });

  }

  constructor(private userService: UserService, 
      private userDetailService: UserDetailService,
      private noteService: UserNotesService){}

  addNote(val:any){
    
    let noteToAdd = {
      userId: this.id,
      note: val.note,
      date: Date,
      time: Date
    };

    // call service
    this.noteService.addNote(noteToAdd).subscribe(val=>{
        if(!val){
          this.showSuccAlert = true;
          setTimeout(() => {
            this.showSuccAlert = false;
          }, 2500);
        } else {
          this.showFailAlert = true;
          setTimeout(() => {
            this.showFailAlert = false;
          }, 2500);
        }
    });
    
  }
}

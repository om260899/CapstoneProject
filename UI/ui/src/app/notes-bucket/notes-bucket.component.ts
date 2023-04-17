import { Component, ViewChild } from '@angular/core';
import { Notes, UserDetail } from '../_Interface/user-detail';
import { UserDetailService } from '../_services/user-detail.service';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { UserNotesService } from '../_services/user-notes.service';

@Component({
  selector: 'app-notes-bucket',
  templateUrl: './notes-bucket.component.html',
  styleUrls: ['./notes-bucket.component.css']
})
export class NotesBucketComponent {

  popupActive: boolean = false;
  userNotes: Notes[] = [];
  noteId: number = 0;
  @ViewChild('noteFrm') noteFrm: NgForm | undefined;

  constructor(private userDetailService: UserDetailService, 
    private userService: UserService,
    private userNoteService: UserNotesService){
  }

  ngOnInit(){
    let username='';
    this.userService.currentUser$.subscribe(val => {
      if(val){
        username = val.username;
      }
    });
    this.userDetailService.getUser(username).subscribe((result: UserDetail) => {     
      this.userNotes = result.notes;
    });
  }

  togglePopup(){
    this.popupActive = !this.popupActive;
  }

  hidePopup(){
    this.popupActive = false;
  }

  updateModal(noteId: number, note: string){
    this.noteId = noteId;
    let toNote = {
      note: note
    };
    this.noteFrm?.setValue(toNote);
  }

  updateNote(value: any){
    let noteModal = {
      id: this.noteId,
      note: value.note,
      date: new Date,
      time: new Date
    }
    this.userNoteService.updateNote(noteModal).subscribe((val:any)=>{
      console.log(this.noteId);
      this.userNotes.map(n => {
        if(n.id === this.noteId){
          n.note = val.note;
        }
      });      
    });
  }

  deleteModal(){    
    this.userNoteService.deleteNote(this.noteId).subscribe(result=>{
      this.userNotes = this.userNotes.filter(n => n.id !== this.noteId);      
    });

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserNotesService {

  baseUrl: string = 'https://localhost:7093/api/Notes';

  constructor(private http: HttpClient) { }

  addNote(noteModal:any){
    return this.http.post(this.baseUrl, noteModal);
  }

  updateNote(noteModal:any){
    return this.http.put(this.baseUrl + '/update/' + noteModal.id, noteModal);
  }

  deleteNote(noteId:number){
    return this.http.delete(this.baseUrl + '/' + noteId);
  }
}

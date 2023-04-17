import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesBucketComponent } from './notes-bucket.component';

describe('NotesBucketComponent', () => {
  let component: NotesBucketComponent;
  let fixture: ComponentFixture<NotesBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesBucketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

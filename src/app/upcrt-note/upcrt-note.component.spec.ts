import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcrtNoteComponent } from './upcrt-note.component';

describe('UpcrtNoteComponent', () => {
  let component: UpcrtNoteComponent;
  let fixture: ComponentFixture<UpcrtNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcrtNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcrtNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

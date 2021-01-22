import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaDialogComponent } from './pelicula-dialog.component';

describe('PeliculaDialogComponent', () => {
  let component: PeliculaDialogComponent;
  let fixture: ComponentFixture<PeliculaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeliculaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

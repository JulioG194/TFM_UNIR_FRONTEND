import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecluiterFormComponent } from './recluiter-form.component';

describe('RecluiterFormComponent', () => {
  let component: RecluiterFormComponent;
  let fixture: ComponentFixture<RecluiterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecluiterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecluiterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

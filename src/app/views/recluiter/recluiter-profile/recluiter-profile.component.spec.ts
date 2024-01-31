import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecluiterProfileComponent } from './recluiter-profile.component';

describe('RecluiterProfileComponent', () => {
  let component: RecluiterProfileComponent;
  let fixture: ComponentFixture<RecluiterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecluiterProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecluiterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

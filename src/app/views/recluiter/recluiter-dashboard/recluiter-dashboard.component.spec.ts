import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecluiterDashboardComponent } from './recluiter-dashboard.component';

describe('RecluiterDashboardComponent', () => {
  let component: RecluiterDashboardComponent;
  let fixture: ComponentFixture<RecluiterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecluiterDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecluiterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconSetService } from '@coreui/icons-angular';
import { GridModule, WidgetModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule } from '@coreui/icons-angular';
import { WidgetsWorkerComponent } from './widgets-worker.component';
import { iconSubset } from '../../../icons/icon-subset';

describe('WidgetsWorkerComponent', () => {
  let component: WidgetsWorkerComponent;
  let fixture: ComponentFixture<WidgetsWorkerComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsWorkerComponent ],
      imports: [WidgetModule, GridModule, ChartjsModule, IconModule],
      providers: [IconSetService]
    })
    .compileComponents();
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };
    fixture = TestBed.createComponent(WidgetsWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

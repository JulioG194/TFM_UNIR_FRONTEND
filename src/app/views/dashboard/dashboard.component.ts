import { Component, OnInit, ViewChild  } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from '../recluiter/dashboard-charts-data';
import { WidgetsWorkerComponent } from '../widgets/widgets-worker/widgets-worker.component'
import { RecluiterProfileComponent } from '../recluiter/recluiter-profile/recluiter-profile.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../_services/storage.service';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(WidgetsWorkerComponent) workerComponent!: WidgetsWorkerComponent;
  searchTerm: string = '';
  currentUser: any;
  
  constructor(
    private chartsData: DashboardChartsData,
    private modalService: NgbModal,
    private storageService: StorageService
  ) {
  }

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();
    }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  searchWorkers(): void {
    // this.workerComponent.search(this.searchTerm);
  }
  openWorkerDetails(worker: any) {
    const modalRef = this.modalService.open(RecluiterProfileComponent);
    modalRef.componentInstance.worker = worker;
  }

}

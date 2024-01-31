import { Component, ViewChild  } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from '../dashboard-charts-data';
import { WidgetsWorkerComponent } from '../../widgets/widgets-worker/widgets-worker.component'
import { RecluiterProfileComponent } from '../../recluiter/recluiter-profile/recluiter-profile.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../../_services/storage.service'; 
import { EncryptedService } from '../../../_services/encrypted.service';
import { RecruiterService } from '../../../_services/recruiter.service';

@Component({
  selector: 'app-recluiter-dashboard',
  templateUrl: './recluiter-dashboard.component.html',
  styleUrl: './recluiter-dashboard.component.scss'
})
export class RecluiterDashboardComponent {
  @ViewChild(WidgetsWorkerComponent) workerComponent!: WidgetsWorkerComponent;
  searchTerm: string = '';
  currentUser: any;
  token: string = '';
  email: string = '';
  emailCrypt: string = '';
  loading: boolean = false;

  constructor(
    private chartsData: DashboardChartsData,
    private modalService: NgbModal,
    private storageService: StorageService,
    private recruiterService: RecruiterService,
    private encryptedService: EncryptedService,) {}

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.loading = true;
    this.token = this.storageService.getUser('access_token');
    this.emailCrypt = this.storageService.getUser('user');
    this.email = this.encryptedService.decryptData(this.email);
    this.initCharts();
    this.loading = false;
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


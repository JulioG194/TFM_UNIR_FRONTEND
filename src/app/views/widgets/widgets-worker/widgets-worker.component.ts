import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecruiterService } from '../../../_services/recruiter.service';
import { WorkerService } from 'src/app/_services/worker.service';

@Component({
  selector: 'app-widgets-worker',
  templateUrl: './widgets-worker.component.html',
  styleUrl: './widgets-worker.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetsWorkerComponent implements OnInit {
  searchTerm: string = '';
  filteredWorkers: any[] = [];
  selectedWorker: any;
  isDetailsVisible = false;
  loading: boolean = false;
  show: boolean = false;
  alertColor: string = '';
  iconName: string = '';
  message: string = '';
  workerData: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private recruiterService: RecruiterService,
  ) {}

  

  @Output() openWorkerDetails: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {

    this.getAllWokers();
    this.filteredWorkers = [...this.workerData];
  }
  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }

  getAllWokers(){
    this.recruiterService.getAllWorkers().subscribe({
      next: (response) => {
        if (response?.data) {
          this.workerData = response?.data;
          this.alertColor= 'success';
          this.iconName = '#check-circle-fill';
          this.message=  response.message;
          this.show = true;
        } else{
            this.alertColor= 'error';
            this.iconName = '#check-circle-fill';
            this.message=  response.message;
            this.show = true;
        }},
        error: (error) => {
            this.alertColor= 'error';
            this.iconName = '#check-circle-fill';
            this.message=  error;
            this.show = true;
          }
    });
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
  // search(searchTerm1: string) {
  //   this.searchTerm = searchTerm1;
  //   if (this.searchTerm.trim() === '') {
  //     this.filteredWorkers = [...this.workerData];
  //   } else {
  //     this.filteredWorkers = this.workerData.filter(workers =>
  //       WorkerService.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  // }

  toggleDetails(worker: any): void {
    if (this.selectedWorker === worker) {
      // Si ya está seleccionado, oculta los detalles
      this.selectedWorker = null;
      this.isDetailsVisible = false;
    } else {
      // Si no está seleccionado, muestra los detalles
      this.selectedWorker = worker;
      this.isDetailsVisible = true;
    }
  }


  openDetailsPopup(worker: any): void {
    this.openWorkerDetails.emit(worker);
  }
}

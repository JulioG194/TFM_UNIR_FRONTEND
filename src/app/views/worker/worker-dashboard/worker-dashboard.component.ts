import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { StorageService } from '../../../_services/storage.service';
import { EncryptedService } from '../../../_services/encrypted.service';
import { SpinnerComponent } from '../../../others/spinner/spinner.component'

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.scss']
})
export class WorkerDashboardComponent implements OnInit {
  @ViewChild(SpinnerComponent) workerComponent!: SpinnerComponent;
  worker: any = {};
  data: any = {};
  token: string = '';
  email: string = '';
  emailCrypt: string = '';
  loading: boolean = false;
  show: boolean = false;
  alertColor: string = '';
  iconName: string = '';
  message: string = '';

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private encryptedService: EncryptedService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.token = this.storageService.getUser('access_token');
    this.emailCrypt = this.storageService.getUser('user');
    this.email = this.encryptedService.decryptData(this.emailCrypt);
    await this.getWorker();
    this.loading = false;
  }

  getWorker(): void {
    this.authService.getUserEmail(this.token, this.email).subscribe({
      next: (response) => {
        if (response?.data) {
          this.worker = response?.data;
          this.alertColor= 'success';
          this.iconName = '#check-circle-fill';
          this.message=  response.message;
          this.show = true;
        } else {
          this.alertColor= 'error';
          this.iconName = '#check-circle-fill';
          this.message=  response.message;
          this.show = true;
        }
      },
      error: (error) => {
        this.alertColor= 'error';
        this.iconName = '#check-circle-fill';
        this.message=  error;
        this.show = true;
      }
  });
  }
}
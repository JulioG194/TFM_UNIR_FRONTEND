import { Component } from '@angular/core';
import { RecruiterService } from '../../../_services/recruiter.service';
import { StorageService } from '../../../_services/storage.service';
import { EncryptedService } from '../../../_services/encrypted.service';

@Component({
  templateUrl: 'recluiter-profile.component.html',
  selector: 'app-recluiter-profile',
  styleUrl: './recluiter-profile.component.scss'
})
export class RecluiterProfileComponent {
  recruiter: any = {};
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
    private recruiterService: RecruiterService, 
    private storageService: StorageService, 
    private encryptedService: EncryptedService,
    ) {}

    async ngOnInit(): Promise<void> {
      this.loading = true;
      this.token = this.storageService.getUser('access_token');
      this.emailCrypt = this.storageService.getUser('user');
      this.email = this.encryptedService.decryptData(this.emailCrypt);
      await this.getRecluiter();
      this.loading = false;
    }

    getRecluiter(): void {
      this.recruiterService.getUserEmail(this.email).subscribe({
        next: (response) => {
          if (response?.data) {
            this.recruiter = response?.data;
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
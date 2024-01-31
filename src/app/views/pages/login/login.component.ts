import { Component, TemplateRef  } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef   } from '@ng-bootstrap/ng-bootstrap';
import { EncryptedService } from '../../../_services/encrypted.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show: boolean = false;
  alertColor: string = '';
  iconName: string = '';
  message: string = '';
  username: string = '';
  password: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';
  customStylesValidated = false;
  accessToken: string = '';
  accessTokenExpiresAt: string = '';
  refreshToken: string = '';
  refreshTokenExpiresAt: string = '';
  role: string = '';
  user: string = '';
  errorModalRef?: NgbModalRef;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private modalService: NgbModal,
    private encryptedService: EncryptedService,) {}
    
    openRegistrationModal(content: any) {
      this.modalService.open(content, { centered: true }); 
    }

    login(): void {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); 
      this.customStylesValidated = true;
      this.authService.login(this.username, this.password).subscribe(
      (authResponse) => {
        if (authResponse.data) {
          this.accessToken = authResponse.data.accessToken;
          this.refreshToken  = authResponse.data.refreshToken ;
          this.authService.saveUser('access_token', this.accessToken);
          this.authService.saveUser('refresh_token', this.refreshToken);
          this.role = this.encryptedService.encryptData(authResponse.data.user.role);
          this.user = this.encryptedService.encryptData(authResponse.data.user.username);
          this.accessTokenExpiresAt = this.encryptedService.encryptData(authResponse.data.accessTokenExpiresAt);
          this.refreshTokenExpiresAt = this.encryptedService.encryptData(authResponse.data.refreshTokenExpiresAt);
          this.authService.saveUser('role', this.role);
          this.authService.saveUser('user', this.user);
          this.authService.saveUser('accessTokenExpiresAt', this.accessTokenExpiresAt);
          this.authService.saveUser('refreshTokenExpiresAt', this.refreshTokenExpiresAt);
          this.alertColor= 'success',
          this.iconName = '#check-circle-fill',
          this.message=  authResponse.message,
          this.show = true

          authResponse.data.user.role === 'worker' ? this.router.navigate(['/worker/form']) : this.router.navigate(['/recluiter/form']);
        } else {
          this.alertColor= 'error';
          this.iconName = '#check-circle-fill';
          this.message =  authResponse.message;
          this.show = true;
          this.openModalMessage();
        }
      },
      (error) => {
        this.alertColor= 'error';
        this.iconName = '#check-circle-fill';
        this.message =  error;
        this.show = true;
        this.openModalMessage();
      });
   }
   openModalMessage() {
    this.errorModalRef  = this.modalService.open({ centered: true });
  }

  closeModal(modal: any){
    modal.close();
  }

  closeModalMessage() {
    if (this.errorModalRef) {
      this.errorModalRef.close();
    }
  }
}

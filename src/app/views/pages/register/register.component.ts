import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  customStylesValidated = false;
  email: string = '';
  password1: string = '';
  password2: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';
  passwordMismatchError: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
  ) {
   }

   register(): void {
    this.customStylesValidated = true;
    if(this.password1 === this.password2){
      this.authService.register(this.email, this.password1, "recruiter").subscribe(
        (authResponse) => {
          if (authResponse.message) {
            // this.messagesService.showMessage({
            //   alertColor: 'success',
            //   iconName: '#check-circle-fill',
            //   message: authResponse.message,
            // });
            this.router.navigate(['/login'])
  
          } else {
            // this.messagesService.showMessage({
            //   alertColor: 'danger',
            //   iconName: '#exclamation-triangle-fill',
            //   message: 'Error al intentar registrar el usuario',
            // });
            console.error('Error al intentar registrar el usuario');
          }
        },
        (error) => {
          // this.messagesService.showMessage({
          //   alertColor: 'danger',
          //   iconName: '#exclamation-triangle-fill',
          //   message: 'Error en el registro del usuario',
          // });
          console.error('Error en el registro del usuario:', error);
        }
      );
    }
    else{
      this.passwordMismatchError = false;
    }
    
}
}

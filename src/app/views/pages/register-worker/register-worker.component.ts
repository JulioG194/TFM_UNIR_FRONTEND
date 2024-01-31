import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';  

@Component({
  selector: 'app-register-worker',
  templateUrl: './register-worker.component.html',
  styleUrl: './register-worker.component.scss'
})
export class RegisterWorkerComponent {
  registerForm: FormGroup;
  customStylesValidated = false;
  name: string = '';
  username: string = '';
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
      this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    });
   }

   register(): void {
    this.customStylesValidated = true;
    if(this.password1 === this.password2){
      this.authService.register(this.username, this.password1, "worker").subscribe(
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
          //   message: 'Error al intentar registrar el usuario',
          // });
          console.error('Error en el registro del usuario:', error);
        }
      );
    }
    else{
      this.passwordMismatchError = true;
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { RecruiterService } from '../../../_services/recruiter.service';
import { AuthService } from '../../../_services/auth.service';
import { StorageService } from '../../../_services/storage.service'; 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptedService } from '../../../_services/encrypted.service';

@Component({
  selector: 'app-recluiter-form',
  templateUrl: './recluiter-form.component.html',
  styleUrl: './recluiter-form.component.scss'
})
export class RecluiterFormComponent {
  @ViewChild('form', { static: false }) form: NgForm;
    loading: boolean = false;
    show: boolean = false;
    emailCrypt: string = '';
    alertColor: string = '';
    iconName: string = '';
    message: string = '';
    recruiter: any = {};
    data: any = {};
    token: string = '';
    customStylesValidated = false;
    name: string = '';
    surname: string = '';
    employment: string = '';
    phoneNumber: string = '';
    sexo: string = '';
    email: string = '';
    description: string = '';
    city: string = '';
    postalCode: string = '';
    address: string = '';
    province: string = '';
    imageFiles: File[] = [];
    imageUrls: string[] = [];
    photo: File;
    avatar: string | null = null;
    photoName: string | null = null;
    state: string[] = [
    'Azuay',
    'Bolívar',
    'Cañar',
    'Carchi',
    'Chimborazo',
    'Cotopaxi',
    'El Oro',
    'Esmeraldas',
    'Galápagos',
    'Guayas',
    'Imbabura',
    'Loja',
    'Los Ríos',
    'Manabí',
    'Morona Santiago',
    'Napo',
    'Orellana',
    'Pastaza',
    'Pichincha',
    'Santa Elena',
    'Santo Domingo de los Tsáchilas',
    'Sucumbíos',
    'Tungurahua',
    'Zamora-Chinchipe'
  ];
  sex: string[] = [
    'Masculino',
    'Femenino',
    'Otro',
  ];

  constructor(
    private storageService: StorageService, 
    private recruiterService: RecruiterService, 
    private authService: AuthService, 
    private router: Router,
    private encryptedService: EncryptedService
    ) {}

    async ngOnInit(): Promise<void> {
      this.loading = true;
      this.token = this.storageService.getUser('access_token');
      this.emailCrypt = this.storageService.getUser('user');
      this.email = this.encryptedService.decryptData(this.emailCrypt);
      await this.getRecruiter();
      this.loading = false;

    }

    onFileSelected(event: any): void {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        this.readImage(file);
      }
    }
  
    readImage(file: File): void {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photo = file; 
        this.avatar = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  

    getRecruiter(): void {
      this.recruiterService.getUserEmail(this.email).subscribe({
        next: (response) => {
          if (response?.data) {
            this.recruiter = response?.data;
            this.name = this.recruiter?.name;
            this.surname = this.recruiter?.surname;
            this.address = this.recruiter?.address;
            this.city = this.recruiter?.city;
            this.description = this.recruiter?.description;
            this.employment = this.recruiter?.employment;
            this.phoneNumber = this.recruiter?.phoneNumber;
            this.postalCode = this.recruiter?.postalCode;
            this.sexo = this.recruiter?.sex;
            this.province = this.recruiter?.province;
            this.avatar = this.recruiter?.avatar;
            this.photoName = this.avatar ? "Image": "";

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

  updateRecruiter(): void {
    this.customStylesValidated = true;
    if (this.form.valid) {
      // cargar fotos de perfil
      if (this.photo) {
        this.storageService.files(this.photo).subscribe({
          next: (response) => {
            if (response.message) {
              this.avatar = response.data.fileURL;
            }
          },
          error: (error) => {
            console.error('Error al subir el archivo:', error);
          }
        });
      }

      const recruiterData = {
        name : this.name,
        surname : this.surname,
        email : this.email,
        phoneNumber : this.phoneNumber,
        sex: this.sexo,
        employment : this.employment,
        description: this.description,
        province: this.province,
        city: this.city,
        postalCode: this.postalCode,
        address: this.address,
        avatar: this.avatar,
        
      };

      this.recruiterService.createRecruiter(recruiterData).subscribe({
        next: (response) => {
          if (response.data) {
            // this.messagesService.showMessage({
            //   alertColor: 'success',
            //   iconName: '#check-circle-fill',
            //   message: response.message,
            // });
            this.router.navigate(['/recluiter/profile']);
          } else {
            // this.messagesService.showMessage({
            //   alertColor: 'error',
            //   iconName: '#check-circle-fill',
            //   message: response.message,
            // });
            console.error('Credenciales inválidas');
          }
        },
       error: (error) => {
          // this.messagesService.showMessage({
          //   alertColor: 'error',
          //   iconName: '#check-circle-fill',
          //   message: "Ocurrio un error",
          // });
          console.error('Error en el inicio de sesión:', error);
        }
    });
  }
}
}
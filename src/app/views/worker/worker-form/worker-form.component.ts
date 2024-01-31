import { Component, ViewChild  } from '@angular/core';
import { StorageService } from '../../../_services/storage.service'; 
import { WorkerService } from '../../../_services/worker.service';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EncryptedService } from '../../../_services/encrypted.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrl: './worker-form.component.scss'
})
export class WorkerFormComponent {
    @ViewChild('form', { static: false }) form: NgForm;
    loading: boolean = false;
    show: boolean = false;
    alertColor: string = '';
    iconName: string = '';
    message: string = '';
    worker: any = {};
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
    emailCrypt: string = '';
    imageFiles: File[] = [];
    imageUrls: SafeUrl[] = [];
    photo: File | null = null;
    photoFile: string | null = null;
    avatar: SafeUrl | null = null;
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
    private workerService: WorkerService, 
    private authService: AuthService, 
    private encryptedService: EncryptedService,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.token = this.storageService.getUser('access_token');
    this.emailCrypt = this.storageService.getUser('user');
    this.email = this.encryptedService.decryptData(this.emailCrypt);
    await this.getWorker();
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
      this.photoFile = e.target.result; 
    };
    reader.readAsDataURL(file);
  }

  onWorkSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      this.readImages(files);
    }
  }
  
  readImages(files: FileList): void {
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageFiles.push(file);
        this.imageUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  getWorker(): void {
    this.authService.getUserEmail(this.token, this.email).subscribe(
      (response) => {
        if (response?.data) {
          this.worker = response?.data;
          this.name = this.worker?.name;
          this.surname = this.worker?.surname;
          this.address = this.worker?.address;
          this.city = this.worker?.city;
          this.description = this.worker?.description;
          this.employment = this.worker?.employment;
          this.phoneNumber = this.worker?.phoneNumber;
          this.postalCode = this.worker?.postalCode;
          this.sexo = this.worker?.sex;
          this.province = this.worker?.province;
          this.avatar = this.worker?.avatar;
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
      (error) => {
        this.alertColor= 'error';
          this.iconName = '#check-circle-fill';
          this.message=  error;
          this.show = true;
      }
    );
  }

  updateWorker(): void {
    this.loading = false;
    this.customStylesValidated = true;
    if (this.form.valid) {
      // cargar fotos de perfil
      if (this.photo) {
        this.storageService.files(this.photo).subscribe({
          next: (response) => {

            if (response.message) {
              this.avatar = this.sanitizer.bypassSecurityTrustUrl(response.data.fileURL);
            }
          },
          error: (error) => {
            console.error('Error al subir el archivo:', error);
          }
        });
      }
      // cargar fotos de trabajador
      if (this.imageFiles.length > 0) {
        for (let i = 0; i < this.imageFiles.length; i++) {
          this.storageService.files(this.imageFiles[i]).subscribe({
            next: (response) => {
              if (response.message) {
                this.imageUrls[i] = this.sanitizer.bypassSecurityTrustUrl(response.data.fileURL);
              }
            },
            error: (error) => {
              console.error('Error al subir el archivo:', error);
            }
          });
        }
      }
      const workerData = {
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
        images: this.imageUrls,
      };

      this.workerService.createWorker(workerData).subscribe({
        next: (response) => {
          if (response.data) {
            // this.messagesService.showMessage({
            //   alertColor: 'success',
            //   iconName: '#check-circle-fill',
            //   message: response.message,
            // });
            this.router.navigate(['/worker/profile']);
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
    this.loading = false;
  }
}

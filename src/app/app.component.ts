import { Component, OnInit, Inject } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EncryptedService } from './_services/encrypted.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'frontend-tfm';
  private roles: string[] = [];
  public navItems: INavData[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showRecluiterBoard = false;
  showWorkerBoard = false;
  username?: string;
  roleDecrypt: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private titleService: Title,
    private iconSetService: IconSetService,
    private http: HttpClient,
    private encryptedService: EncryptedService,
    @Inject('ROLE_CONFIG') private roleConfig: any) { 
      titleService.setTitle(this.title);
      iconSetService.icons = { ...iconSubset };
      this.navItems = this.getNavItemsBasedOnRoles();
    }
    async ngOnInit(): Promise<void> {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    this.isLoggedIn = await this.storageService.isLoggedIn();
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      const role = this.storageService.getUser('role');
      this.roleDecrypt = this.encryptedService.decryptData(role);
      this.roles = this.roleDecrypt;
      this.showRecluiterBoard = this.roles.includes('recluiter');
      this.showWorkerBoard = this.roles.includes('worker');
    }
    if (this.isLoggedIn) {
      const role = this.storageService.getUser('role');
      this.roleDecrypt = this.encryptedService.decryptData(role);
      this.roles = this.roleDecrypt;
      this.showRecluiterBoard = this.roles.includes('recluiter');
      this.showWorkerBoard = this.roles.includes('worker');
    }
  }
  private getNavItemsBasedOnRoles(): INavData[] {
    if (this.roles && this.roles.length > 0) {
      const role = this.roles[0];
      return this.roleConfig[`navItems${role.charAt(0).toUpperCase() + role.slice(1)}`];
    } else {
      return [];
    }
  }

  makeRequestWithXSRF(): void {
    const csrfToken = this.storageService.getCsrfToken() ?? ''; 
    const headers = new HttpHeaders({ 'X-CSRF-Token': csrfToken });
    this.http.get('http://localhost:8080/api/', { headers }).subscribe(
      (response) => {
        console.log('Respuesta:', response);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
  logout(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}



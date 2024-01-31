import { Component, Input } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { StorageService } from '../../../_services/storage.service';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) {
    super();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}

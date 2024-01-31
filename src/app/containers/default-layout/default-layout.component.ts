import { Component, Input  } from '@angular/core';
import { INavData } from '@coreui/angular';
import { StorageService } from '../../_services/storage.service'; 
import { navItemsRecluiter, navItemsWorker } from './_nav';
import { EncryptedService } from '../../_services/encrypted.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  public navItems : INavData[] = [];
  role: any;
  roleDecrypt: any;

  ngOnInit(): void {
    this.role = this.storageService.getUser('role');
    this.roleDecrypt = this.encryptedService.decryptData(this.role);
    this.navItems = this.getNavItemsBasedOnRole(this.roleDecrypt);
  }
  constructor(
    private storageService: StorageService,
    private encryptedService: EncryptedService
    ) {}

  private getNavItemsBasedOnRole(role: any): INavData[] {
    if (role === 'worker') {
      return navItemsWorker;
    } else if (role === 'recruiter') {
      return navItemsRecluiter;
    } else {
      return [];
    }
  }
}

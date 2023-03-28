import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { AllUsers, User } from 'src/app/core/utils/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public allUsers: AllUsers = this._storageService.getItem<AllUsers>('users');

  public currentUser: User = this._storageService.getItem<User>('user');

  constructor(
    private _storageService: StorageService,
    private _router: Router,
  ) { }

  public logout() {
    this._storageService.removeItem('user');
    this._router.navigateByUrl('auth');

  }
}

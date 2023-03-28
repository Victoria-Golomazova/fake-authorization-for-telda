import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { AllUsers, User } from 'src/app/core/utils/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public allUsers!: AllUsers;

  public currentUser!: User;

  constructor(
    private _storageService: StorageService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.allUsers = this._storageService.getItem<AllUsers>('users');
    this.currentUser = this._storageService.getItem<User>('user');
  }

  public logout(): void {
    this._storageService.removeItem('user');
    this._router.navigateByUrl('auth');

  }
}

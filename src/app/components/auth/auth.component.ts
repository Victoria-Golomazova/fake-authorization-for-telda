import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AllUsers, PageTypes, User } from 'src/app/utils/types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public typePage!: PageTypes;

  public isVisiblePass: boolean = false;

  public user: FormGroup = this._fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  })

  public allUsers: AllUsers = this._storageService.getItem<AllUsers>('users') || [];

  public currentUser: User = this._storageService.getItem<User>('user');

  constructor(
    private _fb: FormBuilder,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.typePage = 'register';
  }

  public toggleType(type: PageTypes): PageTypes {
    return this.typePage = type;
  }

  public togglePass(): boolean {
    return this.isVisiblePass = !this.isVisiblePass;
  }

  public register(user: User): void {
    if (!this._authService.verificationLogin(this.allUsers, user)) {
      this.allUsers.push(user)
      this._storageService.setItem('users', this.allUsers)
    } else {
      throw new Error('Пользователь с таким именем уже существует')
    }
  }

  public login(user: User): void {
    this._storageService.setItem('user', user)

    if (this._authService.isLoggedIn(this.allUsers, user)) {
      this._router.navigateByUrl('home');
    } else {
      throw new Error('Такого пользователя не существует или неправильно введен логин/пароль')
    }
  }

}

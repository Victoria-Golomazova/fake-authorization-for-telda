import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public allUsers: AllUsers = this._storage.getItem<AllUsers>('users') || [];

  constructor(
    private _fb: FormBuilder,
    private _storage: StorageService,
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

  private verifiedName(dataArray: AllUsers, newElem: User): boolean {
    return Boolean(dataArray.find((el) => el.login === newElem.login))
  }

  public register(user: User): void {
    if (!this.verifiedName(this.allUsers, user)) {
      this.allUsers.push(user)
      this._storage.setItem('users', this.allUsers)
    } else {
      throw new Error('Пользователь с таким именем уже существует')
    }
  }

  public login() {

  }

}

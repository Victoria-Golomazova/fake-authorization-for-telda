import { Injectable } from '@angular/core';
import { AllUsers, User } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public verificationLogin(dataArray: AllUsers, elem: User): boolean {
    return Boolean(dataArray.find((el) => el.login === elem.login))
  }

  public verificationPass(dataArray: AllUsers, elem: User): boolean {
    return Boolean(dataArray.find((el) => el.password === elem.password))
  }

  public isLoggedIn(dataArray: AllUsers, elem: User): boolean {
    return this.verificationLogin(dataArray, elem) && this.verificationPass(dataArray, elem);
  }
}

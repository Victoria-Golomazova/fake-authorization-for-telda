import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import { AllUsers, User } from "../utils/types";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  public allUsers: AllUsers = this._storageService.getItem<AllUsers>('users') || [];

  public currentUser: User = this._storageService.getItem<User>('user');

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService,
    private _router: Router,
  ) {}

  public canActivate(): boolean {
    if (!this._authService.isLoggedIn(this.allUsers, this.currentUser)) {
      this._router.navigateByUrl('auth');
    }
    
    return this._authService.isLoggedIn(this.allUsers, this.currentUser)
    
  }
}
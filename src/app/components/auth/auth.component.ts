import { Component, OnInit } from '@angular/core';
import { PageTypes } from 'src/app/services/types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public typePage!: PageTypes;

  ngOnInit(): void {
    this.typePage = 'register';
  }

  public toggleType(type: PageTypes): PageTypes {
    return this.typePage = type;
  }

}

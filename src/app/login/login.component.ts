import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared';

@Component({
  selector: 'ft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = null;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let self = this;
    let user = {
      username: this.username,
      password: this.password
    };
    this.authSvc.login(user).subscribe(
      (result) => {
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        this.errorMessage = 'Error logging in!!';
      }
    );
  }

}
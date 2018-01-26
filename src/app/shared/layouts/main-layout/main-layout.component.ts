import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;

import { AuthService } from '../../auth';
import { CoreApiService } from '../../core-api';
import { User } from '../../models';

@Component({
  selector: 'ft-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  selectedRoute: string;
  subHeaders: any[] = [];
  activeSubHeader: string;

  user: any = {firstName: 'Chris', lastName: 'Johnson'};

  constructor(private authSvc: AuthService, private router: Router, private coreApiSvc: CoreApiService) { }

  ngOnInit() {
    this.selectedRoute = this.getSelectedRoute();
    this.getUserData();
    jQuery('.nav a').click(() => {
      jQuery('.navbar-collapse').collapse('hide');
    });
  }

  getUserData() {
    let userId = this.authSvc.userId;
    this.coreApiSvc.get(`/users/${userId}`).subscribe( (result) => {
      this.user = result;
    });
  }

  onNavSelect(path: string) {
    this.selectedRoute = path;
    this.setSubHeaders(path);
    this.router.navigate([path]);
  }

  onSelectTab(tabName: string) {
    this.activeSubHeader = tabName;
    this.router.navigateByUrl(this.selectedRoute + '/' + tabName);
  }

  setSubHeaders(mainPath: string) {
    if (mainPath === '/something') {
      this.subHeaders = [];
    } else {
      this.subHeaders = [];
      this.activeSubHeader = null;
    }
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/auth/login');
  }

  getSelectedRoute() {
    let url = this.router.url;
    let newUrl = url.split('')[0];
    // Loop through the url and keep returning the letter until you see a '/'
    for (let i = 1; i < url.split('').length; i++) {
      if (url.split('')[i] !== '/') {
        newUrl += url.split('')[i];
      } else {
        break;
      }
    }
    this.setSubHeaders(newUrl);
    return newUrl;
  }

}
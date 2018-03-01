import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Headers, Http, Response } from '@angular/http';
import 'jssha';

import { environment } from '../../../environments/environment';

import { CoreApiService } from '../core-api';

@Injectable()
export class AuthService {

  authToken: string = null;
  userId: number = null;
  secretKey: string = 'fd4f4b5d-4ef4-4866-8';
  apiKey: string = 'b44493b5-4';

  isProduction: boolean = environment.production;

  constructor(private http: Http) {
    this.authToken = window.sessionStorage.getItem('FTUserToken');
    this.userId = parseInt(window.sessionStorage.getItem('FTUserId'), 10);
  }

  formatPayload(payload: Object) {
      var formattedPayload = {};
      let self = this;

      if (typeof payload === undefined || payload === null) {
          formattedPayload = null;
      } else if (Array.isArray(payload)) {
          formattedPayload = [];

          for (let i = 0; i < payload.length; i++) {
              formattedPayload[i] = self.formatPayload(payload[i]);
          }
      } else {
          Object.keys(payload).sort().forEach(function(k, v) {
              if (typeof (payload[k]) == 'object') {
                  formattedPayload[k] = self.formatPayload(payload[k]);
              } else if (typeof (payload[k]) == 'string') {
                  formattedPayload[k] = payload[k].replace(/ /g, '');
              } else {
                  formattedPayload[k] = payload[k]
              }
          });
      }
      return formattedPayload;
  }

  getNonce(timestamp: number, url: string, payloadStr?: string) {
      var nonceStr = timestamp + url;

      if (typeof payloadStr !== 'undefined') {
          nonceStr += payloadStr;
      }
      var shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.setHMACKey(this.secretKey, 'TEXT');
      shaObj.update(nonceStr);

      return shaObj.getHMAC('HEX');
  }

  getAuthHeaders(url: string, payload?: Object) {
      var headers = new Headers();
      if (typeof payload !== 'undefined') {
          payload = this.formatPayload(payload);
      }
      var timestamp = Date.now();
      var nonce = this.getNonce(timestamp, url, JSON.stringify(payload));
      headers.append('Authorization', 'TOKEN ' + this.authToken);
      headers.append('x-ft-api-key', this.apiKey);
      headers.append('x-ft-api-nonce', nonce);
      headers.append('x-ft-timestamp', timestamp.toString());
      //headers.append('x-ft-super-key', 'ft-test-cp');
      return headers;
  }
  
  login(user: any): any {
    // jssha password
    let shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(user.password);
    let shaPassword = shaObj.getHash('HEX');
    
    let endpoint = '/auth/login';
    let url = this.getHost() + endpoint;

    let body = {username: user.username, password: shaPassword};

    return this.http.post(url, body)
        .map((response: Response) => {
            if (response.status == 200) {
                let result = response.json();
                this.authToken = result.token;
                this.userId = result.userId.toString();
                window.sessionStorage.setItem('FTUserToken', result.token);
                window.sessionStorage.setItem('FTUserId', result.userId.toString());
            }
            return response.json();
        });
  }

  logout() {
    this.authToken = null;
    this.userId = null;
    window.sessionStorage.removeItem('FTUserToken');
    window.sessionStorage.removeItem('FTUserId');
  }

  isAuthenticated() {
    return this.authToken ? true : false;
  }

  getHost() {
    if (this.isProduction) {
      // You can point this to your live server
      return '//127.0.0.1:8000';
    }
    return '//127.0.0.1:8000';
  }

}

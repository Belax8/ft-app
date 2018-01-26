import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http, RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth';


@Injectable()
export class CoreApiService {

  isProduction: boolean = environment.production;

  constructor(private http: Http, private authSvc: AuthService) { }
  
  get(endpoint: string): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authSvc.getAuthHeaders(endpoint);

    return this.http.get(url, {headers: headers})
      .map((response: Response) => {
          return response.json();
      });
  }

  put(endpoint: string, body: any): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authSvc.getAuthHeaders(endpoint, body);

    return this.http.put(url, body, {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }

  post(endpoint: string, body: any): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authSvc.getAuthHeaders(endpoint, body);

    return this.http.post(url, body, {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }

  delete(endpoint: string): Observable<any> {
    let url = this.getHost() + endpoint;
    let headers = this.authSvc.getAuthHeaders(endpoint);

    return this.http.delete(url, {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }

  getHost() {
    if (this.isProduction) {
      // You can point this to your live server
      return '//127.0.0.1:8000';
    }
    return '//127.0.0.1:8000';
  }

}

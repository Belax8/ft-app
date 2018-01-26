/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Http, XHRBackend, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AuthService } from '../auth';
import { CoreApiService } from './core-api.service';
import { AuthServiceStub } from '../test-stubs';


describe('Service: CoreApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        CoreApiService,
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should ...', inject([CoreApiService], (service: CoreApiService) => {
    expect(service).toBeTruthy();
  }));

  it(`should return error`, inject([CoreApiService], (service: CoreApiService) => {
    // Arrange
    let endpoint = '/someRandomEndpointThatDoesntExist';
    // Act
    service.get(endpoint).subscribe(
      (result) => {
        expect(false).toBeTruthy(); // It should never hit this line
      },
      (error) => {
        // Assert
      expect(error).toBeTruthy();
      }
    );
  }));

  it('can instantiate service with "new"', inject([Http, AuthService], (http: Http, authSvc: AuthService) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new CoreApiService(http, authSvc);
    expect(service instanceof CoreApiService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getHeroes', () => {
    let backend: MockBackend;
    let service: CoreApiService;
    let fakeResult: any[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthService], (http: Http, be: MockBackend, authSvc: AuthService) => {
      backend = be;
      service = new CoreApiService(http, authSvc);
      fakeResult = [{ id: 1 }, { id: 2 }];
      let options = new ResponseOptions({ status: 200, body: { data: fakeResult } });
      response = new Response(options);
    }));

    it('should have expected fake results (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.get('/units').toPromise()
        // .then(() => Promise.reject('deliberate'))
        .then(results => {
          expect(results.data.length).toBe(fakeResult.length,
            'should have expected no. of results');
        });
    })));

    it('should have expected fake results (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.get('/units')
        .do(results => {
          expect(results.data.length).toBe(fakeResult.length,
            'should have expected number of results');
        })
        .toPromise();
    })));


    it('should be OK returning no results', async(inject([], () => {
      let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.get('/units')
        .do(results => {
          expect(results.data.length).toBe(0, 'should have no results');
        })
        .toPromise();
    })));

  });

  it('should make basic calls', inject([CoreApiService], (service: CoreApiService) => {
    // Arrange
    let body = {
      id: 1,
      name: 'CAP'
    };
    // Act
    service.put('/randomInfo', body);
    service.post('/randomInfo', body);
    service.delete('/randomInfo');
    // Assert
    expect(service).toBeDefined();
  }));

  it('should get correct host on getHost - scenario 1', inject([CoreApiService], (service: CoreApiService) => {
    // Arrange
    service.isProduction = false;
    // Act
    let result = service.getHost();
    // Assert
    expect(result).toEqual('//127.0.0.1:8000');
  }));

  it('should get correct host on getHost - scenario 2', inject([CoreApiService], (service: CoreApiService) => {
    // Arrange
    service.isProduction = true;
    // Act
    let result = service.getHost();
    // Assert
    expect(result).toEqual('//127.0.0.1:8000');
  }));

});

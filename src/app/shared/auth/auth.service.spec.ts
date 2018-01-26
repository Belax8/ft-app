/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http, XHRBackend, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CoreApiService } from '../../shared/core-api';
import { CoreApiServiceStub } from '../../shared/test-stubs';

import { AuthService } from './auth.service';

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AuthService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

it('formatPayload should alphabetize items in dictionary',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: 2
      };
      // Act
      let formattedPayload = service.formatPayload(payload);
      // Assert
      expect(Object.keys(formattedPayload)[0]).toEqual('blue');
    }));

  it('formatPayload should alphabetize nested items',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: {
          red: 21,
          pink: 22
        }
      };
      // Act
      let formattedPayload = service.formatPayload(payload);
      // Assert
      expect(Object.keys(formattedPayload['blue'])[0]).toEqual('pink');
    }));

  it('formatPayload should alphabetize keys even when their values are null',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: null,
        blue: null
      };
      // Act
      let formattedPayload = service.formatPayload(payload);
      // Assert
      expect(Object.keys(formattedPayload)[0]).toEqual('blue');
    }));

  it('formatPayload should remove spaces from formatted items',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: {
          red: "a  f  g",
          pink: "b  t  g"
        }
      };
      // Act
      let formattedPayload = service.formatPayload(payload);
      // Assert
      expect(formattedPayload['blue']['pink']).toEqual('btg');

    }));

  it('formatPayload should pass with Array inside of object',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 5,
        blue: [
          {
            red: 6,
            pink: 7
          },
          {
            green: 3,
            blue: 4
          }
        ]
      };
      // Act
      let formattedPayload = service.formatPayload(payload);
      // Assert
      expect(Object.keys(formattedPayload['blue'][0])[0]).toEqual('pink');

    }));

  it('getNonce should return hash of timestamp, url, payload and secret key',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let payload = {
        orange: 1,
        blue: {
          red: "a  f  g",
          pink: "b  t  g"
        }
      };
      let formattedPayload = JSON.stringify(service.formatPayload(payload));
      let timestamp = Date.now();
      let url = '/someUrlolz';
      let nonce = timestamp + url + formattedPayload;
      let shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.setHMACKey(service.secretKey, 'TEXT');
      shaObj.update(nonce);
      let hashedNonce = shaObj.getHMAC('HEX');
      // Act
      let authNonce = service.getNonce(timestamp, url, formattedPayload);
      // Assert
      expect(hashedNonce).toEqual(authNonce);
    }));

  it('getNonce should return hash of timestamp, url and secret key if no payload exists',
    inject([AuthService], (service: AuthService) => {
      // Arrange
      let timestamp = Date.now();
      let url = '/someUrlolz';
      let nonce = timestamp + url;
      let shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.setHMACKey(service.secretKey, 'TEXT');
      shaObj.update(nonce);
      let hashedNonce = shaObj.getHMAC('HEX');
      // Act
      let authNonce = service.getNonce(timestamp, url);
      // Assert
      expect(hashedNonce).toEqual(authNonce);
    }));

  it('getAuthHeaders returns authorization header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';
      //Act
      let auth = service.getAuthHeaders(url);
      //Assert
      expect(auth.get('Authorization')).toBeDefined();
    }));

  it('getAuthHeaders returns x-ft-api-key header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';
      //Act
      let auth = service.getAuthHeaders(url);
      //Assert
      expect(auth.get('x-ft-api-key')).toBeDefined();
    }));

  it('getAuthHeaders returns x-ft-api-nonce header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';
      //Act
      let auth = service.getAuthHeaders(url);
      //Assert
      expect(auth.get('x-ft-api-nonce')).toBeDefined();
    }));

  it('getAuthHeaders returns x-ft-timestamp header',
    inject([AuthService], (service: AuthService) => {
      //Arange
      let url = '/someUrlolz';
      //Act
      let auth = service.getAuthHeaders(url);
      //Assert
      expect(auth.get('x-ft-timestamp')).toBeDefined();
    }));

  it(`should reset values on logout`, inject([AuthService], (service: AuthService) => {
    // Arrange
    // Act
    service.logout();
    // Assert
    expect(service.isAuthenticated()).toBeFalsy();
  }));

  it('should get correct host on getHost - scenario 1', inject([AuthService], (service: AuthService) => {
    // Arrange
    service.isProduction = false;
    // Act
    let result = service.getHost();
    // Assert
    expect(result).toEqual('//127.0.0.1:8000');
  }));

  it('should get correct host on getHost - scenario 2', inject([AuthService], (service: AuthService) => {
    // Arrange
    service.isProduction = true;
    // Act
    let result = service.getHost();
    // Assert
    expect(result).toEqual('//127.0.0.1:8000');
  }));

});

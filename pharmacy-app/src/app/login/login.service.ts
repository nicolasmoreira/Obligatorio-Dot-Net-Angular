import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/user.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment as ENV} from '../../environments/environment';
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
const JWT_ACCESS_TOKEN_NAME = 'access_token';
const USER_ID_NAME = 'user_id';


export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get(JWT_ACCESS_TOKEN_NAME);
    },
    whitelistedDomains: []
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isAuthenticated = false;
  public userId: number = null;

  constructor(public http: HttpClient, private jwtHelper: JwtHelperService) {

  }

  public checkAuthenticated(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(JWT_ACCESS_TOKEN_NAME);
      const userId = localStorage.getItem(USER_ID_NAME);
      if (token && userId) {
        if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem(JWT_ACCESS_TOKEN_NAME);
          this.isAuthenticated = false;
          console.log('isTokenExpired');
          resolve(false);
        } else {
          this.userId = parseInt(userId, 10);
          this.isAuthenticated = true;
          console.log('token ok');
          resolve(true);
        }
      } else {
        this.isAuthenticated = false;
        resolve(false);
      }
    });
  }

  public register(username: string, password: string, nombre: string, apellido: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(ENV.api_dev_url + 'usuarios', {
        Email: username,
        Password: password,
        Nombre: nombre,
        Apellido: apellido,
        Roles: 'Usuario'
      }).toPromise().then((response: any) => {
        console.dir(response);
        resolve(true);
      })
      .catch((reason: any) => {
        resolve(false);
      });
    });
  }

  public login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(ENV.api_dev_url + 'login/auth', {
        Email: username,
        Password: password
      }).toPromise().then((response: any) => {
        console.dir(response);

        const parsed = JSON.parse(response);

        localStorage.setItem(JWT_ACCESS_TOKEN_NAME, parsed.JWT);
        localStorage.setItem(USER_ID_NAME, parsed.Id);
        this.userId = parseInt(parsed.Id, 10);
        this.isAuthenticated = true;
        resolve(true);
      })
      .catch((reason: any) => {
        console.dir(reason);
        this.isAuthenticated = false;
        reject(false);
      });
    });
  }

  public logout() {
    this.isAuthenticated = false;
    localStorage.removeItem(JWT_ACCESS_TOKEN_NAME);
    localStorage.removeItem(USER_ID_NAME);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Role } from 'src/app/_models/role'
import { User } from 'src/app/_models/user'
import * as CryptoJS from 'crypto-js';
import { EncrypDataService } from './encryp-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>

  public currentUserSubject: BehaviorSubject<User>

  constructor(
    private _http: HttpClient,
    private _encryptData: EncrypDataService

  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }


  get Role() {
    const eText = JSON.parse(localStorage.getItem('currentUser')).toString()
    const decryptedWord = CryptoJS.AES.decrypt(eText, 'secret_key')
    const data = JSON.parse(decryptedWord.toString(CryptoJS.enc.Utf8));
    return data.role
  }


  /**
 *  Confirms if user is adminssf
 */
  get isAdmin() {
    return this.isLoggedIn && this.Role === Role.Admin
    // return this.currentUser && this.currentUserSubject.value.role === Role.Admin
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.isLoggedIn && this.Role === Role.Client
    // return this.currentUser && this.currentUserSubject.value.role === Role.Client
  }

  get isLoggedIn() {
    return localStorage.getItem('currentUser')
  }


  /**
 * User login
 *
 * @param email
 * @param password
 * @returns user
 */
  login(email: string, password: string) {
    return this._http
      .post<any>('login', { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const data = user
            const SECRET_KEY = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret_key').toString()
            localStorage.setItem('currentUser', JSON.stringify(SECRET_KEY))
            // const user_data = delete user.token
            // const userInfo = CryptoJS.AES.encrypt(JSON.stringify(user_data), 'userInfo_key').toString()
            // localStorage.setItem('userInfo', JSON.stringify(userInfo))




            // localStorage.setItem('currentUser', JSON.stringify(user))

            // Display welcome toast!

            // notify
            this.currentUserSubject.next(user)
          }

          return user
        })
      )
  }

  /**
 * User logout
 *
 */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser')
    // notify
    this.currentUserSubject.next(null)
  }




}

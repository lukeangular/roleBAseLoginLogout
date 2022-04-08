import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from 'src/app/_service/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this._authenticationService.currentUserValue


    // return true;

    if (currentUser) {
      // check if route is restricted by role
      if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to not-authorized page
        

        if(localStorage.getItem('currentUser')){
          const eText = JSON.parse(localStorage.getItem('currentUser')).toString()
          const decryptedWord = CryptoJS.AES.decrypt(eText,'secret_key')
          const decryptedData = JSON.parse(decryptedWord.toString(CryptoJS.enc.Utf8));

          if (route.data['roles'] && route.data['roles'].indexOf(decryptedData.role) === -1) {
            this._router.navigate(['not-authorized'])
            return false
          }

        }else{
          this._router.navigate(['not-authorized'])
          return false
        }


        
      }

      // authorised so return true
      return true
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['not-authorized'], { queryParams: { returnUrl: state.url } })
    return false
  }

}

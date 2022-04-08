import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _authService : AuthenticationService,
    private _route : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout()
    this._route.navigate(['login'])
    this.toastr.warning('Successfully logout ');
  }

}

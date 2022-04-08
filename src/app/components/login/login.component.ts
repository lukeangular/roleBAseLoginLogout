import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading : boolean = false
  errorMessage : boolean = false

  constructor(
    private route : Router,
    private _authService : AuthenticationService,
    private toastr: ToastrService
  ) { }

  loginForm = new FormGroup({
    email :  new FormControl(null, [Validators.email, Validators.required]),
    password :  new FormControl(null, [Validators.required]),
  })

  ngOnInit(): void {
    if(this._authService.isAdmin){
      this.route.navigate(['admin'])
    }
    else if (this._authService.isClient){
      this.route.navigate(['client'])
    }
    
  }

  onSubmit(){
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value

    this._authService.login(email, password).subscribe((res)=>{
      if(res.role === 'Admin'){
        this.route.navigate(['admin'])
        this.toastr.success('you are logged in as '+res.role, 'Welcome');
      }
      else if (res.role === 'Client'){
        this.route.navigate(['client'])
        this.toastr.success('you are logged in as '+res.role, 'Welcome');
      }
    },error =>{
      if(error.status === 400){
        this.errorMessage = true
        setTimeout(()=>{
          this.errorMessage = false
        },3500)
      }
    }
    )

    this.loginForm.reset()
  }

}

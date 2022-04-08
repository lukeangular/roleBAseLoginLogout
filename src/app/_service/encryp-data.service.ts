import { Injectable,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrypDataService implements OnInit{


  data: any = []
  constructor(
    private route : Router
  ) {
    
  }

  ngOnInit(): void { 

}
}

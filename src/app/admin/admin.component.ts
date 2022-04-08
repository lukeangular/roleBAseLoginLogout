import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data : any = []

  constructor() { 
    const eText = JSON.parse(localStorage.getItem('currentUser')).toString()
    const decryptedWord = CryptoJS.AES.decrypt(eText,'secret_key')
    this.data = JSON.parse(decryptedWord.toString(CryptoJS.enc.Utf8));
  }

  ngOnInit(): void {
  }

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import * as CryptoJS from 'crypto-js';

const KEY = environment.encryptionKey;


@Injectable({
  providedIn: 'root'
})

export class EncryptedService {

  constructor() {}

  encryptData(data: string): string{
    const encryptedText = CryptoJS.AES.encrypt(data, KEY).toString();
    return encryptedText;
  }
  
  decryptData(data: string): string {
    const decryptedText = CryptoJS.AES.decrypt(data, KEY).toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }
  
}

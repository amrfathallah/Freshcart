import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  constructor(private _HttpClient:HttpClient) { }

  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords` , userEmail )
  }

  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode` , resetCode)
  }
resetNewPass(resetPass:object):Observable<any>{
  return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword` , resetPass)
}


}

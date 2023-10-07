import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpassService } from 'src/app/services/forgotpass.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _ForgotpassService:ForgotpassService , private _FormBuilder:FormBuilder , private _Router:Router){}
ngOnInit(): void {
  window.scrollTo(0,0)
}
  step1:boolean = true
  step2:boolean = false
  step3:boolean = false
  email:string = ""
  forgotMsg:string = ''
  forgotForm:FormGroup = this._FormBuilder.group({
    email:['' , [Validators.required , Validators.email] ]
  })
  resetCodeForm:FormGroup = this._FormBuilder.group({
    resetCode:['' , [Validators.required] ]
  })
  resetPassForm:FormGroup = this._FormBuilder.group({
    newPassword:['' , [Validators.required, Validators.pattern(/^\w{6,}$/) ] ]
  })


  forgotpassword():void{
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email
    this._ForgotpassService.forgotPassword(userEmail).subscribe({
      next:(response)=>{
        this.forgotMsg = response.message
        this.step1 = false
        this.step2 = true
        this.step3 = false


      },
      error:(err)=>{
        this.forgotMsg = err.error.message
        console.log(err.error.message);
      }
    })
  }

  resetCode():void{
    let resetCode = this.resetCodeForm.value
    this._ForgotpassService.resetCode(resetCode).subscribe({
      next:(response)=>{
        this.forgotMsg = response.status
        console.log(response);

        this.step1 = false
        this.step2 = false
        this.step3 = true
      },
      error:(err)=>{
        this.forgotMsg = err.error.message
        console.log(err);

      }

    })
  }

  newPassword():void{
    let resetForm = this.resetPassForm.value;
    resetForm.email = this.email
    this._ForgotpassService.resetNewPass(resetForm).subscribe({
      next:(response)=>{
        if(response.token){
          localStorage.setItem('_token' , response.toekn)
          this._Router.navigate(['/home'])
        }

      },
      error:(err)=>{
          this.forgotMsg = err.error.message
      }
    })
  }
}

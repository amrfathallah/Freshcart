import { Component } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor( private _AuthService:AuthService , private _Router:Router){}

  isLoading:boolean = false;
  errorMsg:string = ""

  islogined():void{
    this._Router.navigate(["/login"])
  }
  registerForm:FormGroup = new FormGroup({
    name: new FormControl('' , [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl('' , [Validators.required, Validators.email ]),
    password: new FormControl('' , [Validators.required, Validators.pattern(/^\w{6,}$/) ]),
    rePassword: new FormControl('' , [Validators.required, Validators.pattern(/^\w{6,}$/) ]),
    phone: new FormControl('' , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/) ])

  })
  handleRegister():void{
    this.isLoading = true
   if(this.registerForm.valid){
    this._AuthService.registerForm(this.registerForm.value).subscribe({
      next:(response)=>{
        // console.log(responce);
        if(response.message === "success" || response.message === "Success" ){
          this._Router.navigate(["/login"])
        }

        this.isLoading = false
      },
      error:(err)=>{
        // console.log(err);
        this.errorMsg = err.error.message
        this.isLoading = false

      }
    })
   }

  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
      Validators.email,
      Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit(){
    if(this.loginForm.valid){

      const formData = {...this.loginForm.value}
      console.log(this.loginForm)

    } else {
      alert('Form is not valid!')
    }
  }
}

import { User } from './../../shared/components/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/components/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signupForm: FormGroup | any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
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

  createSubmit(){
    if(this.signupForm.invalid){
      alert('Form you try to submit is invalid!')
      return
    }

    const newUser: User = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }

    this.authService.createUser(newUser)

    this.signupForm.reset()
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Post } from 'src/app/shared/components/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  createForm: FormGroup |any;
  email!: any

  constructor(
  ) { }

  ngOnInit(): void {
    const user = firebase.default.auth().currentUser;
    this.email = user?.email;

    this.createForm = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      text: new FormControl('', [
        Validators.required
      ])
    })
  }

  createSubmit() {
    if(this.createForm.invalid){
      return
    }

    const post: Post = {
      title: this.createForm.value.title,
      text: this.createForm.value.text,
      email: this.email,
      date: new Date()
    }

  }

}

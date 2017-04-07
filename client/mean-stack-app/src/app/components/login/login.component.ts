import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {

    if (this.loginForm.invalid) {
      //username validation
      if (this.loginForm.controls.username.untouched) {
        this.flashMessagesService.show("Username is required!", { cssClass: "alert-warning", timeout: 3000 });
      } else if (this.loginForm.controls.username.invalid) {
        this.flashMessagesService.show("Username minimium length is 2", { cssClass: "alert-warning", timeout: 3000 });
      }
      //password validation
      if (this.loginForm.controls.password.untouched) {
        this.flashMessagesService.show("password is required!", { cssClass: "alert-warning", timeout: 3000 });
      } else if (this.loginForm.controls.password.invalid) {
        this.flashMessagesService.show("password minimium length is 6", { cssClass: "alert-warning", timeout: 3000 });
      }
    } else {
      console.log(this.loginForm.value);
    }
  }
}

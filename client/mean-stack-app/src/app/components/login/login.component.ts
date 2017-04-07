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
      username: ['brian', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login() {
    this.flashMessagesService.show('We are in the login component!', { cssClass: 'alert-success', timeout: 3000 });
  }
}

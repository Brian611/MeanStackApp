import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private flashMessagesService: FlashMessagesService, private authService: AuthenticateService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login($event) {
    $event.preventDefault();
    //check if form is valid
    if (this.loginForm.invalid) {
      //username validation
      if (this.loginForm.controls.username.untouched) {
        this.flashMessagesService.show("Username is required!", { cssClass: "alert-warning", timeout: 5000 });
      } else if (this.loginForm.controls.username.invalid) {
        this.flashMessagesService.show("Username minimium length is 2", { cssClass: "alert-warning", timeout: 5000 });
      }
      //password validation
      if (this.loginForm.controls.password.untouched) {
        this.flashMessagesService.show("password is required!", { cssClass: "alert-warning", timeout: 5000 });
      } else if (this.loginForm.controls.password.invalid) {
        this.flashMessagesService.show("password minimium length is 6", { cssClass: "alert-warning", timeout: 5000 });
      }
    } else {
      let user = JSON.stringify(this.loginForm.value);
      this.authService.authenticateUser(user)
        .subscribe(data => {
          this.authService.storeTokenAnduser(data.token, JSON.stringify(data.user));
        }, error => {
          this.flashMessagesService.show(error, { cssClass: "alert-warning", timeout: 5000 });
        });
    }
  }
}

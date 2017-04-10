import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Iuser;

  constructor(private activateRoute: ActivatedRoute, private authServ: AuthenticateService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.authServ.getUserById(params.id)
        .subscribe(user => {
          this.user = user;
          console.log(user);
        })
    })
  }
}

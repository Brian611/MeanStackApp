import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticateService) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
}

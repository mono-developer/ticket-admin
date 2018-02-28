import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { UserService } from "../../../../provide/user-service";
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {

  user: any = { email: '', password: '' };

  constructor(
    private router: Router,
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/']);
  }


  doLogin() {
    this.userService.login(this.user.email, this.user.password)
      .subscribe(
        (data) => {
        console.log(data);
        sessionStorage.setItem('OAuthInfo', JSON.stringify(data));
        this.router.navigate(['/']);
        return true;
      }),
      (error) =>{
        console.error("Error deleting food!");
        return Observable.throw(error);
      }
    }

}

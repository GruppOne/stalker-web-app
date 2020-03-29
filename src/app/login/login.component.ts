import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../user';
import {LoginService} from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public nestedForm: FormGroup = new FormGroup({
    emailForm: new FormControl(''),
    passwordForm: new FormControl(''),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  public login(email: string, password: string): void {
    /* const email = this.nestedForm.value.emailForm.email;
    const password = this.nestedForm.value.passwordForm.pwd; */

    console.log('mail: ', email);
    console.log('pass: ', password);
    /* console.log('mail-regexp: ', regexMail.test(email));
    console.log('pass-regexp: ', regexPwd.test(password)); */
    /* if (email === '' || typeof email === 'undefined') {
      console.log('email vuota');
    }
    if (password === '' || typeof password === 'undefined') {
      console.log('password vuota');
    } */
    // console.log('################################################');
    if (!this.validateInput(email, password)) {
      return;
    }
    const user = new User(email, password);
    this.loginService.login(user).subscribe((response: Response) => {
      console.log(response);
      if (response.status === 200) {
        this.router.navigate(['/home']);
      }
    });
  }
  public validateInput(email: string, password: string): boolean {
    const regexMail = new RegExp(
      '^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9])+$',
    );
    const regexPwd = new RegExp(
      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    );
    if (!regexMail.test(email) || !regexPwd.test(password)) {
      return false;
    } else {
      return true;
    }
  }
}

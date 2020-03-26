import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {User} from '../user';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public login() {
    const email = this.nestedForm.value.emailForm.email;
    const password = this.nestedForm.value.passwordForm.pwd;
    const regexMail = new RegExp(
      '^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9])+$',
    );
    const regexPwd = new RegExp(
      // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    );
    console.log('mail: ', email);
    console.log('pass: ', password);
    console.log('mail-regexp: ', regexMail.test(email));
    console.log('pass-regexp: ', regexPwd.test(password));
    if (email === '' || typeof email === 'undefined') {
      console.log('email vuota');
    }
    if (password === '' || typeof password === 'undefined') {
      console.log('password vuota');
    }
    console.log('################################################');
    if (!regexMail.test(email) || !regexPwd.test(password)) {
      return;
    }
    const user = new User(
      this.nestedForm.value.emailForm.email,
      this.nestedForm.value.passwordForm.pwd,
    );
    this.loginService.login(user).subscribe((response: any) => {
      console.log(response.status);
      this.router.navigate(['/home']);
      /* if (response.status === 200) {
        this.router.navigate(['/home']);
      } */
    });
  }
}

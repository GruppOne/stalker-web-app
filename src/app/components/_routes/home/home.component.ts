import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.titleService.setTitle('Home - Stalker');
  }
  constructor(private router: Router, private titleService: Title) {}
  changePage(path: string): void {
    this.router.navigateByUrl(path);
  }
}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  chartOptions = {
    responsive: true,
  };
  chartData = [
    {data: [330, 600, 260, 700], label: 'Account A'},
    {data: [120, 455, 100, 340], label: 'Account B'},
    {data: [45, 67, 800, 500], label: 'Account C'},
  ];
  chartLabels = ['January', 'February', 'Mars', 'April'];

  ngOnInit(): void {}
}

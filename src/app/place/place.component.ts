import {Component, OnInit} from '@angular/core';
import {Place} from '../place';
import {PlaceService} from '../place.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {
  place = new Place();

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.getPlace(1);
  }
  getPlace(id: number): void {
    this.placeService.getPlaceById(id).subscribe((response: HttpResponse<Place>) => {
      if (response.status === 200 && response.body != null) {
        this.place = response.body;
      }
    });
  }
}

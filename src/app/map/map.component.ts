import {Component, OnInit} from '@angular/core';
import {tileLayer, polygon, latLngBounds} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
  };

  // TODO generare i poligoni ciclando le coordinate da organization.Places ottenendo una cosa di questo tipo:
  /* polygonLayers = [
    polygon([
      [46.8, -121.85],
      [46.92, -121.92],
      [46.87, -121.8],
    ]),
    polygon([
      [46.87671540932522, -121.60162350162865],
      [46.771473389453135, -121.68951412662865],
      [46.78558025197221, -121.54669186100365],
    ]),
  ]; */
  // questo si riferisce al [leafletLayers]="polygonLayers" nell'html
  polygonLayers = [
    polygon([
      [8.667918002363134, -279.4306629896164],
      [6.708253968671543, -279.5624989271164],
      [6.970049417296232, -278.0683583021164],
    ]),
  ];

  drawOptions = {
    position: 'topright',
    draw: {
      polygon: {
        showArea: true,
      },
      marker: false,
      polyline: false,
      circle: false,
      rectangle: false,
      circlemarker: false,
    },
  };

  // TODO generare i poligoni ciclando le coordinate da organization.Places
  bounds = latLngBounds([
    [8.667918002363134, -279.4306629896164],
    [6.708253968671543, -279.5624989271164],
    [6.970049417296232, -278.0683583021164],
  ]);

  // questo si riferisce al [leafletFitBounds]="fitBounds" nell'html e stabilisce che i poligoni che le passi si devono vedere, quindi dovrebbe centrarsi e zoomarsi da sola (si centra correttamente ma imposta lo zoom a 0)
  fitBounds = this.bounds;

  constructor() {}

  ngOnInit(): void {}

  public onDrawCreated(e: any): void {
    console.log(e.layer.getLatLngs());
  }
}

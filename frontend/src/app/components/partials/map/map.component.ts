import { Component } from '@angular/core';
import * as L from 'leaflet';

import 'leaflet-control-geocoder';
import 'leaflet';
import 'leaflet-routing-machine';
@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  routingLayer: any;
  newMarker: any;
  map: any;
  ngOnInit(): void {
    this.map = L.map('map').setView([10.8792111, 106.8096131], 12);
    const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
      maxZoom: 18,
    }).addTo(this.map);
    var Icon = L.icon({
      iconUrl: '../assets/shop_icon.png',
      iconSize: [25, 25],
    });

    // Thanh search
    (L.Control as any).geocoder().addTo(this.map);

    const marker = L.marker([10.8792111, 106.8096131], {
      icon: Icon,
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      if (this.routingLayer) {
        this.routingLayer.remove();
        this.newMarker.remove();
      }

      // đánh dấu và tìm đường
      this.newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
      this.routingLayer = L.Routing.control({
        waypoints: [
          L.latLng(e.latlng.lat, e.latlng.lng),
          L.latLng(10.8792111, 106.8096131),
        ],
      })
        .on('routesfound', (e) => {
          const routes = e.routes;
          console.log(routes);
        })
        .addTo(this.map);
    });
  }
  // Tìm vị trí hiện tại

  findMyLocation() {
    if (this.routingLayer) {
      this.routingLayer.remove();
      this.newMarker.remove();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.newMarker = L.marker(latlng).addTo(this.map);

        this.map.setView(latlng, 11); // zoom đến vị trí mới
        // tìm đường
        this.routingLayer = L.Routing.control({
          waypoints: [
            L.latLng(latlng.lat, latlng.lng),
            L.latLng(10.8792111, 106.8096131),
          ],
        })
          .on('routesfound', (e) => {
            const routes = e.routes;
            console.log(routes);
          })
          .addTo(this.map);
      });
    } else {
      alert('Geolocation không được hỗ trợ trên trình duyệt này.');
    }
  }
}

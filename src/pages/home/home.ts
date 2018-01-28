import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  // start = 'chicago, il';
  // end = 'chicago, il';
  // directionsService = new google.maps.DirectionsService;
  // directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    //this.geolocation.getCurrentPosition().then((position) => {

      //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: {lat: 33.874427, lng: -98.521045},
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        console.log('mapping');

        this.map.data.loadGeoJson('assets/imgs/google.json');


      
      //this.map.data.loadGeoJson('./assets/geojsons/data.json');
      
      this.map.data.setStyle({
        fillColor: 'green'
      });
      
    // }, (err) => {
    //   console.log(err);
    // });
    //this.directionsDisplay.setMap(this.map);
  }
  //{lat: 33.874427, lng: -98.521045}
  // calculateAndDisplayRoute() {
  //   this.directionsService.route({
  //     origin: this.start,
  //     destination: this.end,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";          
   
    this.addInfoWindow(marker, content);
   
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }
}
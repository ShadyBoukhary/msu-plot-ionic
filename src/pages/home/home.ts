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
  zoomLevel: number = 0;


  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {

      let mapOptions = {
        center: {lat: 33.872861, lng: -98.521279},
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        streetViewControl: false,
        rotateControl: false,
        fullScreenControl: true,
        mapTypeControl: false
      }

      var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       // map.data.loadGeoJson('./assets/geojsons/test.json');
        //map.data.loadGeoJson('./assets/geojsons/google.json');
       // map.data.loadGeoJson('./assets/geojsons/data.json');


        // this one
        //map.data.loadGeoJson('./google.json');

      // Data layers, 1 for parking spaces and 1 for the entire parking lots
      let spacesData = new google.maps.Data();
      let lotsData = new google.maps.Data();
      spacesData.loadGeoJson('./assets/geojsons/data.json');
      lotsData.loadGeoJson('./assets/geojsons/lots.json');
      //spacesData.setMap(map);
      lotsData.setStyle({visible: true, fillColor: 'blue'});
      spacesData.setStyle({visible: true, fillColor: 'green'});

      lotsData.setMap(map);

       // map.data.loadGeoJson('../assets/geojsons/data.json');

      this.zoomLevel = map.getZoom();



      

       map.addListener('zoom_changed', function() {
        this.zoomLevel = map.getZoom();
        console.log(this.zoomLevel);
        if (this.zoomLevel < 18) {
          //map.data.setStyle({visible: false});
          lotsData.setMap(map);
          spacesData.setMap(null);

        }
        else {
          //map.data.setStyle({visible: true, fillColor: 'green'});
          lotsData.setMap(null);
          spacesData.setMap(map);

        }
      });

      // zoom to the parking lot that has been clicked
      lotsData.addListener('click', function(event){
        // get the center coordinates from the geoJSON
        let latlong = event.feature.getProperty('center').split(/, ?/);
        console.log(latlong);
        // convert coordinates from string into a latLong literal
        let ll = new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1]));
        map.setCenter(ll);
        map.setZoom(19);
      })

  }



  // addMarker(){
 
  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: this.map.getCenter()
  //   });
   
  //   let content = "<h4>Information!</h4>";          
   
  //   this.addInfoWindow(marker, content);
   
  // }

  // addInfoWindow(marker, content){
 
  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });
   
  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
   
  // }
}
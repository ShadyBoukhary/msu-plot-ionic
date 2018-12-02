import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { CenterControl } from '../../models/map/center-control';
import { LotServiceProvider } from '../../providers/lot-service/lot-service';
declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  zoomLevel: number = 0;
  lotSpaces = [];
  spacesData: any;
  lotsData: any;
  map: any;
  spacesDisplayed = false;


  constructor(public navCtrl: NavController, private geolocation: Geolocation, private lotService: LotServiceProvider) {

  }

  ionViewDidLoad() {
    this.initMap();
    this.getLotData();
  }

  initMap() {

    let mapOptions = {
      center: { lat: 33.872861, lng: -98.521279 },
      zoom: 16,
      //mapTypeId: google.maps.MapTypeId.HYBRID,
      streetViewControl: false,
      rotateControl: false,
      fullScreenControl: false,
      mapTypeControl: false
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // map.data.loadGeoJson('./assets/geojsons/test.json');
    //map.data.loadGeoJson('./assets/geojsons/google.json');
    // map.data.loadGeoJson('./assets/geojsons/data.json');


    // this one
    //map.data.loadGeoJson('./google.json');

    // Data layers, 1 for parking spaces and 1 for the entire parking lots
    this.spacesData = new google.maps.Data();
    this.lotsData = new google.maps.Data();
    this.spacesData.loadGeoJson('./assets/geojsons/data.json');
    this.spacesData.loadGeoJson('./assets/geojsons/py-resident_spaces.json');
    this.lotsData.loadGeoJson('./assets/geojsons/lots.json');
    //spacesData.setMap(map);
    this.lotsData.setStyle({ visible: true, fillColor: 'blue' });
    this.spacesData.setStyle({ visible: true, fillColor: 'green' });

    this.lotsData.setMap(this.map);


    // map.data.loadGeoJson('../assets/geojsons/data.json');

    this.zoomLevel = this.map.getZoom();





    this.map.addListener('zoom_changed', () => {
      this.zoomLevel = this.map.getZoom();
      console.log(this.zoomLevel);
      if (this.zoomLevel < 18) {
        //map.data.setStyle({visible: false});
        if (this.spacesDisplayed) {
          this.lotsData.setMap(this.map);
          this.spacesData.setMap(null);
          this.spacesDisplayed = false;
        }




      }
      else {
        //map.data.setStyle({visible: true, fillColor: 'green'});
        if (!this.spacesDisplayed) {
          this.lotsData.setMap(null);
          this.spacesData.setMap(this.map);
          this.spacesDisplayed = true;
        }


      }
    });

    // zoom to the parking lot that has been clicked
    this.lotsData.addListener('click', (event) => {
      // get the center coordinates from the geoJSON
      let latlong = event.feature.getProperty('center').split(/, ?/);
      console.log(latlong);
      // convert coordinates from string into a latLong literal
      let ll = new google.maps.LatLng(parseFloat(latlong[0]), parseFloat(latlong[1]));
      this.map.setCenter(ll);
      this.map.setZoom(19);
    })
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    let centerControlDiv = document.createElement('div');
    let centerControl = new CenterControl(centerControlDiv, this.map);

    //centerControlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  }

  async getLotData() {
    this.lotSpaces['bolin'] = await this.lotService.getLotData('1');
    this.updateOverlays();
  }

  updateOverlays() {
    console.log('hi');
    let bolinSpaces = this.lotSpaces['bolin'];
    console.log(this.spacesData);


    this.spacesData.setStyle((feature) => {
      console.log(feature);
     for (let i = 0; i < this.lotSpaces['bolin'].length; i++) {
       let space = this.lotSpaces['bolin'][i];
     //  console.log(`${feature.getProperty('spaceNum')} and ${space.id}`);
     
       if (feature.getProperty('spaceNum') == space.id) {
         if ((<any>space).occupied) {
          return {fillColor: 'red', strokeWeight: 1}
         } else {
          return { fillColor: 'green', strokeWeight: 1};
         }
       } 
     }

    });

  }

}


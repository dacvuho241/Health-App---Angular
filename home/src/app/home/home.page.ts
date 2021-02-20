import { HttpClient } from '@angular/common/http';
import { RunService } from './../service/run.service';
import { ModalpagePage } from './../modalpage/modalpage.page';
import { ModalController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name: string = "";
  age: number;
  gender: string;
  height: number;
  weight: number;
  public home: string;

  place: string = "";
  type: string = "";
  icon: string = "";
  temperature: string = "";
  lat;
  lng;
  constructor(private modalController: ModalController,
    private service: RunService,
    public httpClient: HttpClient,
    public platform: Platform) {
    this.platform.ready().then(() => {
      this.getCurrentLocation();
    })
  }
  ngOnInit() {
    this.service.welcome();
    //this.home = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalpagePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'name': this.name,
        'age': this.age,
        'gender': this.gender,
        'height': this.height,
        'weight': this.weight
      }
    });
    return await modal.present();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
          this.getCurrentTemperature(this.lat,this.lng);
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported.");
    }
  
  }

  getCurrentTemperature(latitude, longitude) {
    var url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude + "&lon="+longitude + "&appid=e316a2ee720c12e7f71234e44ef5e5c6";
    this.httpClient.get(url).subscribe((temperatureData)=>{
      var obj = <any>temperatureData;
      this.place = obj.name;
      this.type = obj.weather[0].main;
     // this.icon = "http://openweathermap.org/img/w/" +obj.weather[0].icon + ".png";
      this.icon = "http://openweathermap.org/img/wn/" +obj.weather[0].icon + ".png";
     // this.temperature = (((obj.main.temp)-273.5)*9/5+32).toFixed(2).toString() + "C";
      this.temperature = ((obj.main.temp-273.15)*9/5+32).toFixed(0).toString();
    })
  }
}



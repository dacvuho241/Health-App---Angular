import { Injectable, Input } from '@angular/core';

declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class RunService {
  dynamicLat: any;
  dynamicLong: any;
  myLat;
  myLong;
  name;
  age;
  gender;
  height;
  weight;
  bmr: number; bmr1: number; bmr2: number; bmr3: number; bmr4: number; bmr5: number;
  fix_bmr1; fix_bmr2; fix_bmr3; fix_bmr4; fix_bmr5;
  bmi: number;
  timer;
  noc;
  constructor() { }
  welcome() {
    var today = new Date();
    var currentHour = today.getHours();
    var mess = document.getElementById("welcome");
    if (currentHour >= 0 && currentHour < 12) {
      mess.innerHTML = "Good Morning!";
    }
    else if (currentHour <= 17) {
      mess.innerHTML = "Good Afternoon!";
    }
    else
      mess.innerHTML = "Good Evening!";
  }
  showMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.myLat = position.coords.latitude;
      this.myLong = position.coords.longitude;

      const myLatlng = { lat: this.myLat, lng: this.myLong };
      const map = new google.maps.Map(document.getElementById("map")!, {
        zoom: 15,
        center: myLatlng,
      });
      new google.maps.Marker({
        position: myLatlng,
        map,
        title: "Your Location",
      });

      // Create the initial InfoWindow.
      let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to calculate the distance",
        //position: myLatlng,
      });
      infoWindow.open(map);

      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
          JSON.stringify("Your Destination")
        );
        infoWindow.open(map);
      });

      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {
        document.getElementById("bar").style.display = "none";
        this.dynamicLat = mapsMouseEvent.latLng.toJSON().lat,
          this.dynamicLong = mapsMouseEvent.latLng.toJSON().lng,
          //infoWindow.open(map);
          //console.log(myLatlng.lat)
        //console.log(myLatlng.lng)
        console.log(this.dynamicLat);
        console.log(this.dynamicLong);

        var R = 6371; // Radius of the earth in km
        var dLat = (this.dynamicLat - myLatlng.lat) * (Math.PI / 180);
        var dLon = (this.dynamicLong - myLatlng.lng) * (Math.PI / 180);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((myLatlng.lat) * (Math.PI / 180)) * Math.cos((this.dynamicLat) * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 0.6214;
        console.log("distance", d);
        var calo = d * 53;
        var fix_calo = calo.toFixed(2);
        var fix_d = d.toFixed(2);
        this.timer = d / (31 / 300);
        var setTimer = ((d / 6.2) * 60).toFixed(0);

        //console.log("Timer", setTimer)
        document.getElementById("distance").innerHTML = fix_d;
        document.getElementById("calo").innerHTML = fix_calo;
        document.getElementById("setTime").innerHTML = setTimer;
        if ((this.age == null) || (this.height == null) || (this.weight == null)) {
          document.getElementById("dis").style.display = "none";
          document.getElementById("ca").style.display = "none";
          document.getElementById("timeRecomendation").style.display = "none";
          document.getElementById("warn").innerHTML = "We cannot calculate the distance because you have still not entered all values."
        }
        
      });
    });
  }
  //Calculate expected calories
  calculateExpectedCalories() {
    this.bmr = (66.473 + (13.7516 * this.weight) + (5.0033 * this.height) - 6.755 * this.age);
    this.bmr1 = (this.bmr * 1.2);
    this.fix_bmr1 = Math.floor(this.bmr1);
    this.bmr2 = this.bmr * 1.375;
    this.fix_bmr2 = Math.floor(this.bmr2);
    this.bmr3 = this.bmr * 1.55;
    this.fix_bmr3 = Math.floor(this.bmr3);
    this.bmr4 = this.bmr * 1.725;
    this.fix_bmr4 = Math.floor(this.bmr4);
    this.bmr5 = this.bmr * 1.9;
    this.fix_bmr5 = Math.floor(this.bmr5);
  }

  //Calculate BMI
  calculateBMI() {
    this.bmi = this.weight / ((this.height / 100) * (this.height / 100));
  }

}

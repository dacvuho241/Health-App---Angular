import { RunService } from './../service/run.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import {BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  name;
  age:number;
  height:number;
  weight:number;
  fix_bmr1;fix_bmr2;fix_bmr3;fix_bmr4;fix_bmr5;
  bmi;
  fix_bmi;
  startDuration;
  //setTimer;
  @ViewChild('slides') mySlider: IonSlides;
  constructor(private service: RunService) { }
  
  ngOnInit() {
    this.service.showMap();
    this.name = this.service.name;
    this.age = this.service.age;
    this.height = this.service.height;
    this.weight = this.service.weight;
    //this.setTimer = this.timer;
    
    if((this.height!=null) && (this.weight!=null)){
      document.getElementById("notic1").innerHTML = "We received your information about your height: " + this.height + "cm, and your weight: " + this.weight +"kg";
     
    } else {
      document.getElementById("notic2").innerHTML = "Make sure you entered all inputs!";
      document.getElementById("notic4").style.display = "none";
    } 
    //Calculate expected calories from service
    this.service.calculateExpectedCalories();
    this.fix_bmr1 = this.service.fix_bmr1;
    this.fix_bmr2 = this.service.fix_bmr2;
    this.fix_bmr3 = this.service.fix_bmr3;
    this.fix_bmr4 = this.service.fix_bmr4;
    this.fix_bmr5 = this.service.fix_bmr5;
    
    if((this.weight==null) || (this.height==null) || (this.weight==null)){
      document.getElementById("hide1").style.display="none";
      document.getElementById("hide2").style.display="none";
      document.getElementById("hide3").style.display="none";
      document.getElementById("hide4").style.display="none";
      document.getElementById("hide5").style.display="none";
      document.getElementById("goBack").innerHTML="Go back and enter your inputs!";
    }
    //Calculate BMI
    this.service.calculateBMI();
    this.bmi = this.service.bmi;
    if(this.bmi<18.5){
      document.getElementById("notic3").innerHTML = "You are underweight!";
    }
    else if(this.bmi>=18.5 && this.bmi<24.9){
      document.getElementById("notic3").innerHTML = "You are healthy! Keep doing exercise";
    }
    else if(this.bmi>=24.9 && this.bmi<30){
      document.getElementById("notic3").innerHTML = "You are overweight and at higher risk of cardiovascular diseases";
    }
    else if(this.bmi>=30){
      document.getElementById("notic3").innerHTML = "You are obese and at higher risk of cardiovascular diseases";
    }
    this.fix_bmi=Math.floor(this.bmi);

    document.getElementById("spin1").style.display = "none";
    document.getElementById("spin2").style.display = "none";
  }

  onBack(){
    this.mySlider.slidePrev();
  }

  onForward(){
    this.mySlider.slideNext();
  }

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  interval;
  state:'start' | 'stop' = 'stop';
  startTimer(duration: number=0){
    this.state = 'start';
    clearInterval(this.interval);
    this.timer = duration *60;
    this.updateTimeValue();
    this.interval = setInterval(()=>{
      this.updateTimeValue();
    },1000);
    document.getElementById("spin1").style.display = "inline-block";
    document.getElementById("spin2").style.display = "inline-block";
  }
  stopTimer(){
    clearInterval(this.interval);
    this.time.next('00:00');
    this.state = 'stop';
    document.getElementById("spin1").style.display = "none";
    document.getElementById("spin2").style.display = "none";
  }
  updateTimeValue(){
    let minutes:any = this.timer / 60;
    let seconds :any= this.timer % 60;
    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);
    const text = minutes + ':' + seconds;
    this.time.next(text);
    --this.timer;
    if(this.timer < -1){
      this.startTimer(this.startDuration);
    }
  }
}
 
import { RunService } from './../service/run.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage implements OnInit {
  @Input() name: string;
  @Input() gender: string;
  @Input() height: number;
  @Input() weight: number;
  @Input() age: number;
  constructor(private modalController: ModalController, 
              private service: RunService,
              public loadingController: LoadingController) {
    
   }

  ngOnInit() {
    this.service.name = this.name;
    this.service.gender = this.gender;
    this.service.age = this.age;
    this.service.height = this.height;
    this.service.weight = this.weight;
    if((this.name == null) || (this.gender == null) || (this.height == null) || (this.weight == null)){
      document.getElementById("modalNotif").innerHTML = "Please enter all value!!!"
    }
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

   //Loading
   isLoading = false;
   async presentLoading() {
     this.isLoading = true;
     return await this.loadingController.create({
       duration: 1000,
     }).then(a => {
       a.present().then(() => {
         //console.log('presented');
         if (!this.isLoading) {
           a.dismiss().then(() => console.log('abort presenting'));
         }
       });
     });
   }
   async dismissLoading() {
     this.isLoading = false;
     return await this.loadingController.dismiss().then(() => console.log('dismissed'));
   }

}

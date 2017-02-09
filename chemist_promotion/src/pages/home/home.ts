import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rows: any;
  categories: any;
  constructor(public navCtrl: NavController, private data: DataService, public storage: Storage) {
  }

  ionViewDidLoad(){
    this.storage.get('promotion_products').then((value) =>{
      if(value){
        this.categories = value;
        this.rows = Array.from(Array(Math.ceil(this.categories.length / 2)).keys());
        console.log(value);
      }else{
        console.log('no data');
        this.data.loadData().then(data => {
          this.categories = data;
          this.rows = Array.from(Array(Math.ceil(this.categories.length / 2)).keys());
          this.storage.set('promotion_products',data);
        });
      }
    })
  }
  clearStorage(){
    this.storage.remove('promotion_products');
  }

}

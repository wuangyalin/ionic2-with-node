import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController} from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rows: any;
  categories: any;
  loader: any;
  constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController, public navCtrl: NavController, private data: DataService, public storage: Storage) {
      this.presentLoading();

  }

  ionViewDidLoad(){
    this.storage.get('promotion_products').then((value) =>{
      if(value){
        this.categories = value;
        this.rows = Array.from(Array(Math.ceil(this.categories.length / 2)).keys());
        console.log(value);
            this.dismissLoading();

      }else{
        console.log('no data');
        this.data.loadData().then(data => {
          this.categories = data;
          this.rows = Array.from(Array(Math.ceil(this.categories.length / 2)).keys());
          this.storage.set('promotion_products',data);
          this.dismissLoading();
        });
      }
    })
  }

  clearStorage(){
    this.storage.remove('promotion_products').then(success =>{
      let title = '';
      let content = 'Local Storage cleared successfully';
      this.showAlert(title,content);
    });

  }
  showAlert(title,content){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons:['OK']
    });
    alert.present();
  }
  dismissLoading(){
    this.loader.dismiss();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Web crawling...",
      dismissOnPageChange: true
    });
    this.loader.present();
  }
}

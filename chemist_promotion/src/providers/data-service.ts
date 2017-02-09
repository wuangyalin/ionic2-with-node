import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  data: any;
  constructor(public http: Http) {
  }

  loadData(){
    if(this.data){
      //already loaded data
      return Promise.resolve(this.data);
    }else{
      return new Promise(resolve =>{
        //this.http.get('assets/data/Promotions.json').map(res =>res.json()).subscribe(data =>{
        this.http.get('/get-api').map(res =>res.json()).subscribe(data =>{
          this.data = data;
          resolve(this.data);
        })
      })
    }
  }

}

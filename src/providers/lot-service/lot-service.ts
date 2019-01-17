import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstants } from '../constants';
import { Space } from '../../models/space';
import { HTTP } from '@ionic-native/http';
@Injectable()
export class LotServiceProvider {

  constructor(public http: HTTP) {
    console.log('Hello LotServiceProvider Provider');
  }


  // async getLotData(lotId: string): Promise<any> {

  //   let headers = new HttpHeaders()
  //     .set("Access-Control-Allow-Origin", "*")
  //     .set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE')
  //     .set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  //   return new Promise((resolve, reject) => {
  //     this.http.get(`${APIConstants.BASE_URL}${APIConstants.LOT_OVERLAY}${lotId}/1558`, {headers: headers})
  //   // this.http.get('http://cs.mwsu.edu/~griffin/p-lot/bolin_lot_classifier/lot_overlay/1/1555')
  //       .subscribe((data: any) => {
  //         if (data.data === null) {
  //           reject('Something went wrong.');
  //         }

  //         resolve(this.parseLotData(data));
  //       },
  //         error => {
  //           console.log(error);
  //           reject(error.message);
  //         });
  //   });
  // }

  async getLotData(lotId: string): Promise<any> {

    let headers = {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    }
      
    try {
      let data = await this.http.get(`${APIConstants.BASE_URL}${APIConstants.LOT_OVERLAY}${lotId}/1558`, headers, {});
      if (data.data === null) {
        throw 'Something went wrong.';
      } else {
        return this.parseLotData(data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    // return new Promise((resolve, reject) => {
    //   this.http.get(`${APIConstants.BASE_URL}${APIConstants.LOT_OVERLAY}${lotId}/1558`, null, {headers: headers})
    // // this.http.get('http://cs.mwsu.edu/~griffin/p-lot/bolin_lot_classifier/lot_overlay/1/1555')
    //     .subscribe((data: any) => {
    //       if (data.data === null) {
    //         reject('Something went wrong.');
    //       }

    //       resolve(this.parseLotData(data));
    //     },
    //       error => {
    //         console.log(error);
    //         reject(error.message);
    //       });
    // });
  }

  private parseLotData(data: any): Space[] {
    let responseData = JSON.parse(data.data);
    console.log(responseData);
    let parsed = JSON.parse(responseData.data.lot_data);

    let lotData: Space[] = [];
    parsed.forEach(element => {
      lotData.push({ id: parseInt(element.id), occupied: element.occupied === '1' ? true : false });
    });
    console.log(lotData);
    return lotData;
  }

}

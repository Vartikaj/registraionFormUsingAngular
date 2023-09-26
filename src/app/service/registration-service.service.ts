import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {
  appData: any;
  data:any;
  private url = 'http://localhost:3000/admin/';
  constructor(public httpClient : HttpClient) { }

  getPosts(){
    console.log(this.httpClient.get(this.url + "getAdminRoute"))
    return this.httpClient.get(this.url + "getAdminRoute");
  }

  savedata(data : any){
    this.httpClient.post(this.url + "postRegistrationData", data).subscribe(checkData => {
      console.log("data Entered Successfully" + checkData);
    });
  }
}

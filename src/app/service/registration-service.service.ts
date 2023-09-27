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

  getDataById(id: String){
    return this.httpClient.get(this.url + "getDataById?id=" + id);
  }

  savedata(data : any){
    return this.httpClient.post(this.url + "postRegistrationData", data);
  }

  updateDataById(id: String, data: any){
    console.log(data);
    return this.httpClient.put(this.url + "updateDataById?id=" + id, data);
  }

  deleteDataById(id: String){
    return this.httpClient.delete(this.url + "deleteDataById?id=" + id);
  }


}

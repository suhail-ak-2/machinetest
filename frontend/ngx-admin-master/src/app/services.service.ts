import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { generate } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ServicesService {
  
  constructor(private http: HttpClient) {}

  base_url = "http://localhost:3000/api";
  
  //users module
  register_user(user) {
    return this.http.post(`${this.base_url}/Reg`, user);
  }
  
  login(user) {
    return this.http.post(`${this.base_url}/Login`, user);
  }

  getData() {
    return this.http.get(`${this.base_url}/Login`);
  }
  deleteuser(userId:any){
    return this.http.delete(`${this.base_url}/${userId}`);
  }
}

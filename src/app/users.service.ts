import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SERVERS } from './models/data.model';
import { Servers } from './models/servers-class.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
ad:string= '1635362908540';
name:string="";
auth_token:string;

  constructor(public http : HttpClient) {
    this.auth_token =   localStorage.getItem('loggedtoken');
   }

  doUserRegistration(data:any)
  {
    return this.http.post<string>("http://35.244.246.183/usuario/", data);
  }

  doUserLogin(data:any)
  {
    console.log('doUserLogin', data);
    return this.http.post<any>("http://35.244.246.183/autenticador/auth", {username: data.uemail, password: data.userpass});
  }


  doUserGetProfileSport(idUsuario:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.auth_token
    })
    return this.http.get<Error>("http://35.244.246.183/perfil-deportivo/" + idUsuario, { headers: headers });
  }


  doUserRegistrationProfileSport(data:any, idUsuario:number)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.auth_token
    })
    return this.http.post<string>("http://35.244.246.183/perfil-deportivo/" + idUsuario, data, { headers: headers });
  }

  
  getServers(): Observable<Servers> {
    return of(SERVERS);
  }
  


  isAdmin(){
    return !!localStorage.getItem("loggedadmin");
  }
  isLoggedIn()
  {
    this.name=localStorage.getItem("loggedusername");
    return !!localStorage.getItem("loggeduser");
  }
  getAllUsers()
  {
    return this.http.get<any[]>("http://localhost:3000/allusers");

  }
  getloggedUserData(userid:string)
  {
    return this.http.get<any[]>("http://localhost:3000/profile/"+userid);
  }

  uemailcheckAvail(uemail:string)
  {
    return this.http.get<any[]>("http://localhost:3000/uemailcheck/"+uemail);
  }
  uuemailcheckAvail(uemail:string)
  {
    return this.http.get<any[]>("http://localhost:3000/uuemailcheck/"+uemail);
  }
  getSingleUserData(userid:string)
  {
    return this.http.get<any[]>("http://localhost:3000/getuser/"+userid);
  }
  editsingleUserdata(data:any)
  {
    return this.http.put<string>("http://localhost:3000/updateuser/",data);
  }

  addpackages(data:any)
  {
    return this.http.put<string>("http://localhost:3000/cart/",data);
  }

  deleteUserData(userid:number)
  {
    return this.http.delete<string>("http://localhost:3000/deleteuser/"+userid);
  }
  searchUsers(searchtxt:string)
  {
    return this.http.get<any[]>("http://localhost:3000/searchuser/"+searchtxt);
  }


}

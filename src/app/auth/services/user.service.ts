import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Decorator
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootUrl = "http://localhost:60494";
  private REST_API_URL = 'http://localhost:60494/api/User/Register';
  private REST_API_SIGNIN_URL = "http://localhost:60494/token";
  private REST_API_UPDATE_USER = "http://localhost:60494/api/Users/";

  userRoles: string = "";


  constructor(private http: HttpClient) { }

  createUser(userData: any): any { // 1. get the form data from comp ts 
    console.log(userData);

    // 2. send the form data to the REST API 
    // 2.1 What's the REST API? https://jsonplaceholder.typicode.com/users/ 
    // 2.2 What's the HTTP Method? POST
    // 2.3 What's the REST API Client? HttpClient
    return this.http.post(this.REST_API_URL, userData)
      .pipe(map((res: any) => { // 3. get the resp from the REST API
        console.log(res);
        // 4. send the resp to the comp ts
        return res;
      }));
  }

  userAuthentication(userData : any) : any {
    var data = "username=" + userData.UName + "&password=" + userData.UPwd + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserWishlist(userId : any): any{
   return  this.http.get(this.rootUrl + "/api/Wishlist/" + userId
   , {headers: new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken') })})
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getUserDetails() : any{
    return  this.http.get(this.rootUrl + "/api/Users?userName=" + localStorage.getItem('userName')
    , {headers: new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken') })})
       .pipe(map((res: any) => {
         return res;
       }));
  }


  roleMatch(allowedRoles: any): boolean {
    var isMatch = false;
    //console.log("inside user.services.ts" , allowedRoles[0], localStorage.getItem('userRole') )
    if(allowedRoles[0] == localStorage.getItem('userRole')){
      console.log("Inside if statement roleMatch");
      return true;
    }else{
      console.log("Inside else statement roleMatch");
      return false;
    }
  }



  getUsers(): any {
    console.log('inside getUsers');

    return this.http.get(this.REST_API_URL)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }));

  }

  getUserById( id: string|null): any{
    console.log(id);
    let APIUrl = this.REST_API_URL + id;
    console.log(APIUrl);

    return this.http.get(APIUrl)
    .pipe(map((res: any) => {
      console.log(res);
      return res;
    }));
       
  }

  updateUser( updateableUserData: any ){
    console.log(updateableUserData);//before submittkng to rest API
    return this.http.put(this.REST_API_URL + updateableUserData.id, updateableUserData)

    .toPromise()
    .then((res:any)=>{
      console.log(res);
      return res;
    })
    .catch((err:any)=>{
      console.log(err);
      return err;
    })
    .finally( ()=>{
      console.log('Its Over');
    });
  }





  getUserProfileInfo(id: any):any{
    return this.http.get('http://localhost:60494/api/Users/' + id)
    .pipe(map((res: any) => {
      console.log(res);
      return res;
    }));
  }

  
  updateUserPassword(userDetails: any) : any{
    return this.http.post('http://localhost:60494/api/User/PasswordChange', userDetails)
  }

  updateUserProfileDetails(userDetails : any):any{
    return this.http.put(this.REST_API_UPDATE_USER + userDetails.UId, userDetails)
  }



  

}

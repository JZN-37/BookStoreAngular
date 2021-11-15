import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userId=0;

  constructor( private userService: UserService , private router : Router) { // 1. connect with service using dependency injection

  }

  async ngOnInit(): Promise<void> {
    console.log("Intialization in users component");
    this.userDetails();
    await this.delay(20); // wihtout this delay the this.userId will not be the one it found in line 22 due to the delay in subscribe method !!
    console.log('Printing userId value , ' , this.userId);
    console.log(this.userWishlist(this.userId));
    //after sigin, we are redirected to the users component
    //code to show the cart details of the user and the wishlist
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  userDetails(){
    this.userService.getUserDetails()
    .subscribe((res:any) =>{
      this.userId = res;
      //console.log('Printing userId value inside userDetails, ' , this.userId , typeof(res));
    })
  }

  userWishlist(userId: any){
    this.userService.getUserWishlist(this.userId)    
    .subscribe((res: any)=>{
      //console.log(res);
      //this.userData = res;
    })
  }

}

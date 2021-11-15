import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-updateuserprofile',
  templateUrl: './updateuserprofile.component.html',
  styleUrls: ['./updateuserprofile.component.scss']
})
export class UpdateuserprofileComponent implements OnInit {

  UId = "";
  UName = "";
  UEmail="";
  UMobile = "";
  UStatus = "Inactive";
  UOrderNo = "";
  dataReceived = false;
  r = "";
  isSaved = false;
  reqSent = false;
  errorMessage = "Error while updating profile";


  constructor(private bookService: BookService, private userService: UserService, private router : Router) { }

  async ngOnInit(): Promise<void> {
  this.userService.getUserDetails()
    .subscribe((res:any)=>{
      this.UId = res
    });
    
    await this.delay(50);

    this.dataReceived= true;
    this.fetchUserDetails(this.UId);
    this.isSaved = false;
    

  }

  fetchUserDetails(userId: any){
    this.userService.getUserProfileInfo(this.UId)
    .subscribe((res:any) =>{
      this.UName = res.UName
      this.UEmail = res.UEmail
      this.UMobile = res.UMobile
      if(res.UStatus == true){
        this.UStatus = "Active";

      }
      this.UOrderNo = res.UOrderNo
    });
}

delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

  async onClickSaveChanges(){
    var stat = 0;
    if(this.UStatus == "Active"){
      var stat = 1;
    }
  let userDetails = {
    UId : this.UId,
    UName: this.UName,
    UPwd : "Encrypted",
    UMobile : this.UMobile,
    UEmail : this.UEmail,
    UStatus : stat,
    UOrderNo : this.UOrderNo
  }

  console.log("viewing userDetails object" , userDetails);

  this.userService.updateUserProfileDetails(userDetails)
  .subscribe((res:any)=>{
    this.r = res
    this.reqSent = true;
    if(this.r == "Success"){
      this.isSaved = true;
    }
  });
  await this.delay(50);
  console.log("inside onClickSaveChanges function" , this.r);

}

onClickGoBack(){
  this.router.navigate(['/profile']);
}
updateUName(){

}

}

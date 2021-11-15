import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  UId = "";
  UName = "";
  UEmail="";
  UMobile = "";
  UStatus = "Inactive";
  UOrderNo = "";
  dataReceived = false;

  constructor(private bookService: BookService, private userService: UserService, private router : Router) { }

  async ngOnInit(): Promise<void> {
  this.userService.getUserDetails()
    .subscribe((res:any)=>{
      this.UId = res
    });
    
    await this.delay(50);

    this.dataReceived= true;
    console.log(this.UId, this.UEmail , this.dataReceived, "inside userprofile section")
    this.fetchUserDetails(this.UId);

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

onClickUpdateProfile(){
  this.router.navigate(['/profile/update']);
}


}

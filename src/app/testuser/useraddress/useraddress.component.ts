import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/services/user.service';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.scss']
})
export class UseraddressComponent implements OnInit {
  username: any;
  userid: any;
  orderid: any;
  userList : any[] = [];

  isSaved: boolean = false;
  reqSent: boolean = false;
  errorMessage: string = "Error";

  addAddrForm: FormGroup = new FormGroup({
    UAddrLine1: new FormControl('', Validators.required),
    UAddrLine2: new FormControl('', Validators.required),
    UAddrCity: new FormControl('', Validators.required),
    UAddrCountry: new FormControl('', Validators.required),
    UAddrPincode: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService) { 
  }

  async ngOnInit(): Promise<void> {
    this.username = localStorage.getItem('userName');
    this.userService.getUsers()
      .subscribe( (res: any) => {
        console.log(res);
        this.userList = res
      })
      await this.delay(200); 
      for(var i = 0; i < this.userList.length; i++){
        console.log(this.userList[i].UName)
        if (this.username == this.userList[i].UName){
          this.userid = this.userList[i].Id; 
        }
      }
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  handleAddAddr() {
    let edittedUserDetails = {
      UserId : this.userid,
      UAddrLine1 : this.addAddrForm.controls['UAddrLine1'].value,
      UAddrLine2 : this.addAddrForm.controls['UAddrLine2'].value,
      UAddrCity : this.addAddrForm.controls['UAddrCity'].value,
      UAddrCountry : this.addAddrForm.controls['UAddrCountry'].value,
      UAddrPincode : this.addAddrForm.controls['UAddrPincode'].value
    }
    console.log('submitted');
    console.log(this.addAddrForm); // the form state 

    console.log(this.addAddrForm); // submittable form data

    // 2. send the above data to the service
    this.userService.AddAddr(edittedUserDetails)
      .subscribe((res: any) => { // 3. get the resp from the service
        console.log(res);
        this.reqSent = true;
        console.log(this.isSaved);
        if (res == "Success") {
          this.isSaved = true;
        }
        console.log(this.isSaved);

      });

  }
}


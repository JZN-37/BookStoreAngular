import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-userpassword',
  templateUrl: './userpassword.component.html',
  styleUrls: ['./userpassword.component.scss']
})
export class UserpasswordComponent implements OnInit {

  oldPassword: string = "";
  newPassword: string = "";

  passwordChange = "false";
  reqSent = false;
  isSaved = false;
  errorMessage = "";


  constructor(private userService : UserService,  private router : Router) { }

  ngOnInit(): void {
    this.isSaved = false;
    this.errorMessage = "";
    this.reqSent = false;
    console.log("Reloaded the page , ngOnInit" );
  }

  onSubmit(){
    let edittedUserDetails = {

      UName : localStorage.getItem('userName'),
      OldPass : this.oldPassword,
      NewPass : this.newPassword
    }

    console.log("before updating password , " , edittedUserDetails);

    this.userService.updateUserPassword(edittedUserDetails)
    .subscribe( (res: any) => { // 3. get the resp from the service
      console.log(res);
      //console.log(res.BId);
      this.reqSent = true;
      console.log(this.isSaved);
      if(res.Succeeded == true){
        this.isSaved = true;
        console.log(this.isSaved , "password updated");
        this.router.navigate(['/users']);
        this.router.navigate(['/change-password']);
      }else{
        this.isSaved = false;
        this.errorMessage = res.Errors[0];
      }
      
      console.log(this.errorMessage , "errorMessage")

    });

  }

}

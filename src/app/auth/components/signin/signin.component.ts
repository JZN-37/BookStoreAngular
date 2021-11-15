import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isSaved = false;
  reqSent = false;
  isLoginError = false;
  errorMessage = "Wrong username or password";
  accessToken = "";
  // Step 1: Have the form tag equivalent in TS 
  addUserForm: FormGroup = new FormGroup({
    // Step 2: Have the input equivalents in TS 
    // Refer HTML for step 3
    UName: new FormControl( '', Validators.required), // Step 5: Let's work on Validations
    UPwd: new FormControl('', Validators.required), // For step 6 --- go to the HTML
  });

  constructor( private userService: UserService , private router : Router) { // 1. connect with service using dependency injection

  }

  ngOnInit(): void {
  }


  handleSignInUser(){
    this.userService.userAuthentication(this.addUserForm.value).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     localStorage.setItem('userName' , this.addUserForm.value.UName)  
     localStorage.setItem('userRole' , data.role.split('"')[1])   
     if(localStorage.getItem('userRole') == 'Admin'){
       this.router.navigate(['/admin-dashboard'])
     }else{
      this.router.navigate(['/users']);
     }
     
   },
   (err : HttpErrorResponse)=>{
    this.reqSent = true;
     this.isLoginError = true;
   });
  }



  /*handleSignInUser(){
    console.log('submitted');
    //console.log(this.addUserForm); // the form state 

    //console.log(this.addUserForm.value); // submittable form data
    
    // 2. send the above data to the service
    this.userService.login(this.addUserForm.value)
      .subscribe( (res: any) => { // 3. get the resp from the service
        
        this.reqSent = true;
        if(res.access_token){
          this.isSaved=true;
          sessionStorage.setItem('authToken',res.access_token);
          this.accessToken = res.access_token;
          //console.log(res);
        }else{
          console.log('before if statemetn');
        }

      });

      
  }*/
}

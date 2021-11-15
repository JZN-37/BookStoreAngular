import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [ './add-user.component.scss'
  ]
})
export class AddUserComponent implements OnInit {

  isSaved = false;
  reqSent = false;
  errorMessage = "";
  // Step 1: Have the form tag equivalent in TS 
  addUserForm: FormGroup = new FormGroup({
    // Step 2: Have the input equivalents in TS 
    // Refer HTML for step 3
    UName: new FormControl( '', Validators.required), // Step 5: Let's work on Validations
    UPwd: new FormControl('', Validators.required), // For step 6 --- go to the HTML
    UEmail: new FormControl('', [Validators.required, Validators.email]), // multiple validators can be used in an element
    UMobile: new FormControl('', [Validators.required,Validators.pattern("[0-9 ]{10}")  ]),
    Roles : new FormControl(["User"]),
  });

  constructor( private userService: UserService ) { // 1. connect with service using dependency injection

  }

  ngOnInit(): void {
  }

  handleAddUser(){
    console.log('submitted');
    console.log(this.addUserForm); // the form state 

    console.log(this.addUserForm.value); // submittable form data
    
    // 2. send the above data to the service
    this.userService.createUser(this.addUserForm.value)
      .subscribe( (res: any) => { // 3. get the resp from the service
        console.log(res);
        this.reqSent = true;
        if(res && res.Succeeded==true){
          this.isSaved = true;
        }

        if(res.Succeeded==false){
          this.errorMessage = res.Errors[0];
        }

      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  isSaved : boolean = false;
  reqSent : boolean = false;
  errorMessage : string = "Error";

  userList: any[] = []
  Id = 0;
  UName = "";
  UEmail="";
  UMobile = "";
  UStatus = "";
  Personal = "";

  booksSubscription: Subscription | undefined = undefined;


  addBookForm: FormGroup = new FormGroup({
    // Step 2: Have the input equivalents in TS 
    // Refer HTML for step 3
    //name: new FormControl('Arun', Validators.required), // Step 5: Let's work on Validations
    //phone: new FormControl('123432', Validators.required), // For step 6 --- go to the HTML
    //email: new FormControl('a@b.com', [Validators.required, Validators.email]), // multiple validators can be used in an element
    UserId: new FormControl({value:this.Id,disabled: true}, Validators.required),
    UserName: new FormControl({value:this.UName,disabled: true}, Validators.required),
    UserEmail: new FormControl(this.UEmail, Validators.required),
    UserMobile: new FormControl(this.UMobile, Validators.required),
    UserStatus: new FormControl(this.UStatus, Validators.required),
  });
 
  
  constructor( private bookService: BookService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    const id = this.route.snapshot.paramMap.get('id');
    this.fetchUserDetails(id);
    await this.delay(50);
    this.setFormValue();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  fetchUserDetails(userId: any){
    this.bookService.getUserById(userId)
    .subscribe((res:any) =>{
      this.userList=res
      this.Id = res.Id
      this.UName = res.UName
      this.UEmail = res.UEmail
      this.UMobile = res.UMobile
      this.UStatus = res.UStatus
      console.log(this.Id)
    });

  }

  setFormValue(){
    let userDetailsFetched = {
      UserId : this.Id,
      UserName : this.UName,
      UserEmail : this.UEmail,
      UserMobile : this.UMobile,
      UserStatus : this.UStatus
    }
    this.addBookForm.setValue(userDetailsFetched);
  }


  handleAddBook(){
    console.log('submitted');
    console.log(this.addBookForm.controls['UserEmail'].value); // the form state 

    console.log(this.addBookForm.value); // submittable form data

    let edittedUserDetails = {
      UId : this.Id,
      UName : this.UName,
      UPwd : "Encrpted",
      UMobile : this.addBookForm.controls['UserMobile'].value,
      UEmail : this.addBookForm.controls['UserEmail'].value,
      UStatus : this.addBookForm.controls['UserStatus'].value
    }
    
    // 2. send the above data to the service
    this.bookService.updateUserDetails(edittedUserDetails)
      .subscribe( (res: any) => { // 3. get the resp from the service
        console.log(res);
        //console.log(res.BId);
        this.reqSent = true;
        console.log(this.isSaved);
        if(res == "Success"){
          this.isSaved = true;
        }
        console.log(this.isSaved , "completed");

      });


  }

}

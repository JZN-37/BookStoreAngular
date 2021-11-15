import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

  isSaved : boolean = false;
  reqSent : boolean = false;
  errorMessage : string = "Error";

  discountList: any[] = []
  booksSubscription: Subscription | undefined = undefined;

  addDiscountForm: FormGroup = new FormGroup({
    // Step 2: Have the input equivalents in TS 
    // Refer HTML for step 3
    //name: new FormControl('Arun', Validators.required), // Step 5: Let's work on Validations
    //phone: new FormControl('123432', Validators.required), // For step 6 --- go to the HTML
    //email: new FormControl('a@b.com', [Validators.required, Validators.email]), // multiple validators can be used in an element
    DCouponCode: new FormControl('', Validators.required),
//  CatCreatedAt: new FormControl('', Validators.required),
    DDiscountValue: new FormControl('', Validators.required),
 //   CatPosition: new FormControl('', Validators.required),
 //   CatCount: new FormControl('', Validators.required),
    DStatus: new FormControl('', Validators.required),
  });
  
  constructor( private bookService: BookService) { }

  ngOnInit(): void {

    this.booksSubscription = this.bookService.getDiscounts()
    .subscribe( (res: any) => {
      console.log(res);
      this.discountList = res
      // for (var i = 0; i < this.categoryList.length; i++) {
      //   console.log("hmm");
      //   if (this.bookData.BCatId == this.categoryList[i].CatId){
      //     this.bookData.BCat = this.categoryList[i].CatName
      //     console.log(this.bookData.BCat)
      //   }
      // }
    });
  }

  handleAddDiscount(){
    console.log('submitted');
    console.log(this.addDiscountForm); // the form state 

    console.log(this.addDiscountForm.value); // submittable form data
    
    // 2. send the above data to the service
    this.bookService.createDiscount(this.addDiscountForm.value)
      .subscribe( (res: any) => { // 3. get the resp from the service
        console.log(res);
        console.log(res.DId);
        this.reqSent = true;
        console.log(this.isSaved);
        this.errorMessage = res;
        //if(res == "Success"){
          this.isSaved = true;
        //}
        console.log(this.isSaved);

      });


  }
}

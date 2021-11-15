import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  isSaved : boolean = false;
  reqSent : boolean = false;
  errorMessage : string = "Error";

  categoryList: any[] = []
  booksSubscription: Subscription | undefined = undefined;

  addCategoryForm: FormGroup = new FormGroup({
    // Step 2: Have the input equivalents in TS 
    // Refer HTML for step 3
    //name: new FormControl('Arun', Validators.required), // Step 5: Let's work on Validations
    //phone: new FormControl('123432', Validators.required), // For step 6 --- go to the HTML
    //email: new FormControl('a@b.com', [Validators.required, Validators.email]), // multiple validators can be used in an element
    CatName: new FormControl('', Validators.required),
//  CatCreatedAt: new FormControl('', Validators.required),
    CatDesc: new FormControl('', Validators.required),
 //   CatPosition: new FormControl('', Validators.required),
 //   CatCount: new FormControl('', Validators.required),
    CatStatus: new FormControl('', Validators.required),
    CatImgPath: new FormControl('', Validators.required),
  });
  
  constructor( private bookService: BookService) { }

  ngOnInit(): void {

    this.booksSubscription = this.bookService.getCategories()
    .subscribe( (res: any) => {
      console.log(res);
      this.categoryList = res
      // for (var i = 0; i < this.categoryList.length; i++) {
      //   console.log("hmm");
      //   if (this.bookData.BCatId == this.categoryList[i].CatId){
      //     this.bookData.BCat = this.categoryList[i].CatName
      //     console.log(this.bookData.BCat)
      //   }
      // }
    });
  }

  handleAddCategory(){
    console.log('submitted');
    console.log(this.addCategoryForm); // the form state 

    console.log(this.addCategoryForm.value); // submittable form data
    
    // 2. send the above data to the service
    this.bookService.createCategory(this.addCategoryForm.value)
      .subscribe( (res: any) => { // 3. get the resp from the service
        console.log(res);
        console.log(res.CatId);
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

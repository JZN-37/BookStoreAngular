import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  isSaved : boolean = false;
  reqSent : boolean = false;
  errorMessage : string = "Error";

  categoryList: any[] = []
  booksSubscription: Subscription | undefined = undefined;

  addBookForm: FormGroup = new FormGroup({
    // Step 2: Have the input equivalents in TS 
    // Refer HTML for step 3
    //name: new FormControl('Arun', Validators.required), // Step 5: Let's work on Validations
    //phone: new FormControl('123432', Validators.required), // For step 6 --- go to the HTML
    //email: new FormControl('a@b.com', [Validators.required, Validators.email]), // multiple validators can be used in an element
    BCatId: new FormControl('', Validators.required),
    BTitle: new FormControl('', Validators.required),
    BISBN: new FormControl('', Validators.required),
    BYear: new FormControl('', Validators.required),
    BPrice: new FormControl('', Validators.required),
    BDesc: new FormControl('', Validators.required),
    BPosition: new FormControl('', Validators.required),
    BCount: new FormControl('', Validators.required),
    BStatus: new FormControl('', Validators.required),
    BImgPath: new FormControl('', Validators.required),
    Norders: new FormControl('', Validators.required),
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

  handleAddBook(){
    console.log('submitted');
    console.log(this.addBookForm); // the form state 

    console.log(this.addBookForm.value); // submittable form data
    
    // 2. send the above data to the service
    this.bookService.createBook(this.addBookForm.value)
      .subscribe( (res: any) => { // 3. get the resp from the service
        console.log(res);
        console.log(res.BId);
        this.reqSent = true;
        console.log(this.isSaved);
        if(res == "Success"){
          this.isSaved = true;
        }
        console.log(this.isSaved);

      });


  }
}

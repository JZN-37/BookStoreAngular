import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  bookData: any;
  duplicateBookData: any;
  status: any;
  categoryList: any[] = []
  booksSubscription: Subscription | undefined = undefined;
  imgName : any;
  isUpdated: boolean = false;
  updateReqSent: boolean = false;
  isDeleted: boolean = false;


  constructor( private bookService: BookService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    let bookId = this.route.snapshot.paramMap.get('id');

    this.bookService.getBookById(bookId)
      .subscribe( ( res: any) => {
        console.log(res);
        this.bookData = res
      })
    await this.delay(50);  
    this.booksSubscription = this.bookService.getCategories()
      .subscribe( (res: any) => {
        console.log(res);
        this.categoryList = res
        for (var i = 0; i < this.categoryList.length; i++) {
          if (this.bookData.BCatId == this.categoryList[i].CatId){
            this.bookData.BCat = this.categoryList[i].CatName
            console.log(this.bookData.BCat)
          }
        }
      });

    
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  handleEditBookModalOpen(): void {
    
    this.duplicateBookData = { ...this.bookData };  // Shallow Copy
    console.log(this.duplicateBookData);
    this.isUpdated = false;
  }

  async handleUpdate(){
    console.log(this.duplicateBookData); // before sending to the service
    this.updateReqSent = true;
    this.duplicateBookData.BImgPath = "../../../assets/images/" + this.imgName;
    console.log(this.duplicateBookData.BImgPath);
    this.status = await this.bookService.updateBook(this.duplicateBookData);
    console.log(this.status);

    if(this.status == "Success"){
      this.isUpdated = true;
    }
  }

  handleDelete(){
    this.bookService.deleteBook(this.bookData);
    this.isDeleted = true;
  }

  handleUpload(event : any){
    console.log(event.target.files[0].name);
    this.imgName = event.target.files[0].name;
  }

}

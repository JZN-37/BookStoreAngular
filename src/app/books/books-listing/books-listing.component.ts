import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books-listing',
  templateUrl: './books-listing.component.html',
  styleUrls: ['./books-listing.component.scss']
})
export class BooksListingComponent implements OnInit {

  bookList: any[] = [];
  enabledBookList: any[] = [];
  searchText: string = "";

  booksSubscription: Subscription | undefined = undefined;

  constructor(private bookService: BookService) { }

  async ngOnInit(): Promise<void> {
    this.booksSubscription = this.bookService.getBooks()
    .subscribe( (res: any) => {
      this.bookList = res;
    });
    await this.delay(200);
    for (var i = 0; i < this.bookList.length; i++){
      if( this.bookList[i].BStatus == true ){
        this.enabledBookList.push(this.bookList[i])
      }
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}

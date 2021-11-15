import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  bookList: any[] = [];
  booksSubscription: Subscription | undefined = undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.booksSubscription = this.bookService.getNewBooks()
    .subscribe( (res: any) => {
      console.log(res);
      this.bookList = res;
    });
  }
}

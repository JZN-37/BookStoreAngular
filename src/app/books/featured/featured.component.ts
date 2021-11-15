import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  bookList: any[] = [];
  booksSubscription: Subscription | undefined = undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.booksSubscription = this.bookService.getFeaturedBooks()
    .subscribe( (res: any) => {
      console.log(res);
      this.bookList = res;
    });
  }
}

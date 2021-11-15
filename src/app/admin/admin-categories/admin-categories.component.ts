import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categoryList: any[] = [];
  categoriesSubscription: Subscription | undefined = undefined;

  constructor( private bookService: BookService ) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.bookService.getCategories()
    .subscribe( (res: any) => {
      this.categoryList = res;
    });


  }
}

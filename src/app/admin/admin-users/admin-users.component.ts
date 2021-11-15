import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {


  userList: any[] = [];
  booksSubscription: Subscription | undefined = undefined;

  constructor( private bookService: BookService ) { }

  ngOnInit(): void {
    this.booksSubscription = this.bookService.getUsersWithRole()
    .subscribe( (res: any) => {
      this.userList = res;
      //console.log('all users' , this.userList);
    });


  }

}

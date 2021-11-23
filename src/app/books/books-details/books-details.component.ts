import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { MakeRatingComponent } from 'src/app/make-rating/make-rating.component';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})

export class BooksDetailsComponent implements OnInit {

  bookData: any = {};
  userid: any;
  enabledBookList: any[] = [];
  cartList: any[] = [];
  cartItem: any = {
    cartTempId: 0,
    UserId: 0,
    BId: 0,
    BQty: 1
  }
  wishList: any[] = [];
  wishItem: any = {
    UserId: 0,
    BId: 0
  }
  isPresentCart: boolean = false;
  isSavedCart: boolean = false;
  isPresentWish: boolean = false;
  isSavedWish: boolean = false;
  reqRat: boolean = false;


  constructor(private bookService: BookService, private userService: UserService, private route: ActivatedRoute, private rating: MakeRatingComponent) { }

  async ngOnInit(): Promise<void> {
    this.userService.getUserDetails()
      .subscribe((res: any) => {
        this.userid = res
      })
    await this.delay(50);
    //console.log(this.userid);

    let bookId = this.route.snapshot.paramMap.get('id');

    this.bookService.getBookById(bookId)
      .subscribe((res: any) => {
        console.log(res);
        this.bookData = res
      })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async handleAddToCart(book: any): Promise<void> {
    this.cartItem.UserId = this.userid;
    this.cartItem.BId = book.BId;

    console.log(this.cartItem);

    this.bookService.getCartById(this.userid)
      .subscribe((res: any) => {
        console.log(res);
        this.cartList = res
      })
    await this.delay(50);
    for (var i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].BId == this.cartItem.BId) {
        this.isPresentCart = true;
      }
    }
    if (!this.isPresentCart) {
      console.log(this.cartItem);
      this.bookService.createCart(this.cartItem)
        .subscribe((res: any) => {
          if (res == "Success") {
            this.isSavedCart = true;
          }
        });
    }
  }

  async handleAddToWishList(book: any): Promise<void> {
    this.wishItem.UserId = this.userid;
    this.wishItem.BId = book.BId;

    console.log(this.wishItem);

    this.bookService.getWishById(this.userid)
      .subscribe((res: any) => {
        console.log(res);
        this.wishList = res
      })

    await this.delay(50);

    for (var i = 0; i < this.wishList.length; i++) {
      if (this.wishList[i].BId == this.wishItem.BId) {
        this.isPresentWish = true;
      }
    }
    if (!this.isPresentWish) {
      console.log(this.wishItem);
      this.bookService.createWish(this.wishItem)
        .subscribe((res: any) => {
          if (res == "Success") {
            this.isSavedWish = true;
          }
        });
    }
  }

  handleRatings(book: any) {
    this.rating.Ratings(book, this.userid);
    this.reqRat = true;
  }

  closeRat() {
    this.reqRat = false;
  }

}

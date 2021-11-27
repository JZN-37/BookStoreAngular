import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  personalWishItemList: any[] = [];
  userid: any;
  isEmptyWish: boolean = false;
  cartList: any[] = []
  cartItem: any = {
    cartTempId: 0,
    UserId: 0,
    BId: 0,
    BQty: 1
  }
  isPresentCart: boolean = false;
  isSaved: boolean = false;

  constructor(private userService: UserService, private bookService: BookService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.userService.getUserDetails()
      .subscribe((res: any) => {      
        this.userid = res;
        console.log("Id is", this.userid);
      });

    await this.delay(50);

    this.bookService.getWishById(this.userid)
      .subscribe((res: any) => {
        this.personalWishItemList = res;
        console.log(this.personalWishItemList);
      });

    await this.delay(50);
    console.log(this.personalWishItemList);

    if (this.personalWishItemList.length == 0) {
      this.isEmptyWish = true;
    }

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
          if(res == "Success"){
            this.isSaved=true;
          }
        });
    }
  }

  handleRemoveFromWish(pdt: any): void {
    this.bookService.deleteWish(pdt);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

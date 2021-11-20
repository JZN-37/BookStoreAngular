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
  
  wishItemList: any[] = [];
  personalWishItemList : any[] = [];
  userList : any[] = [];
  username: any;
  userid: any;
  isEmptyWish: boolean= false;
  cartList: any[] = []
  cartItem: any = {
    cartTempId : 0,
    UserId: 1,
    BId: 1,
    BQty: 1
  }
  isPresentCart:boolean= false;

  constructor(private userService: UserService,private bookService: BookService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    // this.cartDataService.latestCartItemsList.subscribe((cartItems: any[] | undefined) => {
    //   console.log(cartItems);
    //   this.cartItemList = cartItems;
    // });

    this.username = localStorage.getItem('userName');
    this.userService.getUsers()
      .subscribe( (res: any) => {
        console.log(res);
        this.userList = res
      })
      await this.delay(200); 
      for(var i = 0; i < this.userList.length; i++){
        console.log(this.userList[i].UName)
        if (this.username == this.userList[i].UName){
          this.userid = this.userList[i].Id; 
        }
      }

    this.bookService.getWish()
    .subscribe( (res: any) => {
      this.wishItemList = res;
      console.log(this.wishItemList);
    });

    await this.delay(200); 

    for(var i = 0; i < this.wishItemList.length; i++){
      console.log(this.userid);
      console.log(this.wishItemList[i].UserId);
      if( this.wishItemList[i].UserId == this.userid){
        console.log(this.wishItemList[i]);
        this.personalWishItemList.push(this.wishItemList[i]);
      }
    }
    console.log(this.personalWishItemList);

    if(this.personalWishItemList.length == 0){
      this.isEmptyWish = true;
    }
    
  }



  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async handleAddToCart(book: any): Promise<void> {
    console.log(book);
    console.log("handleAddToCart")
    //this.cartDataService.updateCart(book);
    console.log(this.userid);
    this.cartItem.UserId = this.userid;
    this.cartItem.BId = book.BId;

    console.log(this.cartItem);

    this.bookService.getCart()
      .subscribe( (res: any) => {
        console.log(res);
        this.cartList = res
      })
    await this.delay(50); 
    for(var i = 0; i < this.cartList.length ; i++) {
      if(this.cartList[i].UserId == this.cartItem.UserId){
        if(this.cartList[i].BId == this.cartItem.BId){
          console.log(this.cartItem);
          console.log(this.cartList[i]);
          this.cartItem.cartTempId = this.cartList[i].CartId;
          this.cartItem.BQty = this.cartList[i].BQty + 1;
          this.bookService.updateCart(this.cartItem);
          this.isPresentCart = true;
        }
      }
    }
    if(!this.isPresentCart){
      console.log(this.cartItem);
      this.bookService.createCart(this.cartItem)
      .subscribe( (res: any) => { // 3. get the resp from the service
        //if(res == "Success"){
        //}

      });
    }
  }
  
  handleRemoveFromWish(pdt: any): void {
    console.log(pdt);
    console.log("handleRemoveFromWish")
    this.bookService.deleteWish(pdt);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}

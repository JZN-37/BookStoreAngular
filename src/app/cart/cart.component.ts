import { Component, OnInit } from '@angular/core';
import { BookService } from '../books/services/book.service';
import { CartDataService } from './services/cart-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  cartItemList: any[] = [];
  personalCartItemList : any[] = [];
  userList : any[] = [];
  username: any;
  userid: any;

  constructor(private bookService: BookService, private cartDataService: CartDataService) { }

  async ngOnInit(): Promise<void> {
    // this.cartDataService.latestCartItemsList.subscribe((cartItems: any[] | undefined) => {
    //   console.log(cartItems);
    //   this.cartItemList = cartItems;
    // });

    this.username = localStorage.getItem('userName');
    this.bookService.getUsers()
      .subscribe( (res: any) => {
        console.log(res);
        this.userList = res
      })
      await this.delay(50); 
      for(var i = 0; i < this.userList.length; i++){
        console.log(this.userList[i].UName)
        if (this.username == this.userList[i].UName){
          this.userid = this.userList[i].Id; 
        }
      }

    this.bookService.getCart()
    .subscribe( (res: any) => {
      this.cartItemList = res;
    });

    await this.delay(50); 

    for(var i = 0; i < this.cartItemList.length; i++){
      if( this.cartItemList[i].UserId == this.userid){
        this.personalCartItemList.push(this.cartItemList[i]);
      }
    }
    console.log(this.personalCartItemList);
    
  }



  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  
  handleRemoveFromCart(pdt: any): void {
    console.log(pdt);
    console.log("handleRemoveFromCart")
    this.bookService.deleteCart(pdt);
  }


}

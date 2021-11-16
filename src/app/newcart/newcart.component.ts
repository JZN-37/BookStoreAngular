import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { BookService } from '../books/services/book.service';
import { CartDataService } from '../cart/services/cart-data.service';

@Component({
  selector: 'app-newcart',
  templateUrl: './newcart.component.html',
  styleUrls: ['./newcart.component.scss']
})
export class NewcartComponent implements OnInit {

  cartItemList: any[] = [];
  personalCartItemList : any[] = [];
  userList : any[] = [];
  username: any;
  userid: any;
  subTotal: number = 0;
  subtotalstring: any;
  total: number = 0;
  shippingCost: number = 4.99;
  totalstring:any;
  isEmptyCart: boolean = false;

  constructor(private userService : UserService,private bookService: BookService, private cartDataService: CartDataService,private router: Router) { }

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

    this.bookService.getCart()
    .subscribe( (res: any) => {
      this.cartItemList = res;
    });

    await this.delay(200); 

    for(var i = 0; i < this.cartItemList.length; i++){
      if( this.cartItemList[i].UserId == this.userid){
        this.personalCartItemList.push(this.cartItemList[i]);
      }
    }
    console.log(this.personalCartItemList);
    for(var i = 0; i < this.personalCartItemList.length; i++ ){
      this.subTotal = this.subTotal + ( Number(this.personalCartItemList[i].BQty) * Number(this.personalCartItemList[i].BPrice) );
    }
    console.log(this.subTotal);
    this.subtotalstring = (Math.round(this.subTotal * 100) / 100).toFixed(2);
    
    if(this.personalCartItemList.length == 0){
      this.isEmptyCart = true;
      this.shippingCost = 0;
    }
    this.total = this.subTotal + this.shippingCost;
    console.log(this.isEmptyCart);
    this.totalstring = (Math.round(this.total * 100) / 100).toFixed(2);
  }



  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  
  handleRemoveFromCart(pdt: any): void {
    console.log(pdt);
    console.log("handleRemoveFromCart")
    this.bookService.deleteCart(pdt);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }


}

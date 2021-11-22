import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { Book } from '../books/models/book';
import { BookService } from '../books/services/book.service';

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
  couponCode = "";
  discApplied = false;
  discount: number = 0;
  cartItem: any = {
    cartTempId : 0,
    UserId: 1,
    BId: 1,
    BQty: 1
  }

  userAddressList: any[] = [];
  shippingAddressId: number = -1;

  constructor(private userService : UserService,private bookService: BookService, private router: Router) { }

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

    this.userAddress();

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
    this.total = this.subTotal + this.shippingCost - this.discount;
    console.log(this.isEmptyCart);
    this.totalstring = (Math.round(this.total * 100) / 100).toFixed(2);

    console.log("These are the address associated with the user : " , this.userAddressList);

  }

  userAddress(){
    this.userService.getUserAddress(this.userid)
    .subscribe( (res: any) => {
      console.log(res);
      this.userAddressList = res;
      
    })
  }

  allFieldsValid(){
    if(this.shippingAddressId == -1){
      return true;
    }
    else{
      return false;
    }
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

    handleAdd(pdt:any):void{
      console.log("Updated count");
      console.log(pdt);
      this.cartItem.UserId = this.userid;
      this.cartItem.BId = pdt.BId;
      this.cartItem.cartTempId = pdt.CartId;
      this.cartItem.BQty = pdt.BQty + 1;
      this.bookService.updateCart(this.cartItem);
    }

    handleSub(pdt:any):void{
      console.log("Decresed count");
      console.log(pdt);
      this.cartItem.UserId = this.userid;
      this.cartItem.BId = pdt.BId;
      this.cartItem.cartTempId = pdt.CartId;
      this.cartItem.BQty = pdt.BQty - 1;     
      if(this.cartItem.BQty == 0)
      {
        this.handleRemoveFromCart(pdt);
      }
      else
      {
        this.bookService.updateCart(this.cartItem);
      }    
    }

    validateCoupon(){
      if(this.couponCode != ""){
        //check if valid
        console.log(this.couponCode , "value entered inside the coupon code field");
      }
      var disc = 0;
      console.log(this.couponCode , "value entered inside the coupon code field");
      this.userService.checkCouponValidity(this.couponCode)
      .subscribe((res: any) => {
        disc = Number(res);
        this.delay(100);
        console.log("Checking coupon validity ", disc);

        if(true){
          console.log("INSIDE DISC");
          this.discount =  Math.round(this.subTotal * disc) / 100;
          console.log(this.discount,"finding the discount value");
          this.delay(50);
          this.discApplied = true;
        }
  
        if(this.discApplied == true){
          this.discApplied = false;
          this.total = this.subTotal + this.shippingCost - this.discount;
          console.log(this.total, this.discount , "calculating the total after applying discount");
          console.log(this.isEmptyCart);
          this.totalstring = (Math.round(this.total * 100) / 100).toFixed(2);
        }


      });
      

    }



    checkOutBtn(){
      console.log("clicked on checkoutbutton ; ");
      //check if coupon is entered
      //if entered - ensure it is valid before placing order

      console.log("Checking the coupon code field value : ", this.couponCode!="");
      console.log("Id of the shipping address : " , this.shippingAddressId);



      let BookIds = [];
      let BookQtys = []
      for(var i = 0; i < this.personalCartItemList.length; i++ ){
        BookIds.push(this.personalCartItemList[i].BId);
        BookQtys.push(this.personalCartItemList[i].BQty);
      }

      console.log(BookIds, BookQtys);

      let orderDetails = {
        UserId : this.userid,
        BId : BookIds,
        BQty : BookQtys
      }

      this.userService.createOrder(orderDetails)
      .subscribe( (res: any) => {
        console.log("Placed order ", res);
      });
      
    }


}
 
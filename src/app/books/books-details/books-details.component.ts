import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  categoryList: any[] = []
  userList: any[] = []
  booksSubscription: Subscription | undefined = undefined;
  username: any;
  userid : any;
  bookList: any[] = [];
  enabledBookList: any[] = [];
  cartList: any[] = [];
  cartItem: any = {
    cartTempId : 0,
    UserId: 1,
    BId: 1,
    BQty: 1
  }
  wishList: any[] = [];
  wishItem: any = {
    UserId: 1,
    BId: 1
  }
  isPresentCart : boolean = false;
  isPresentWish: boolean = false;
  reqRat: boolean = false;


  constructor( private bookService: BookService, private userService: UserService,private route: ActivatedRoute, private rating:MakeRatingComponent) { }

  async ngOnInit(): Promise<void> {
    this.username = localStorage.getItem('userName');
    this.userService.getUsers()
      .subscribe( (res: any) => {
        console.log(res);
        this.userList = res
      })
      await this.delay(200); 
      for(var i = 0; i < this.userList.length; i++){
        //console.log(this.userList[i].UName)
        if (this.username == this.userList[i].UName){
          this.userid = this.userList[i].Id; 
        }
      }
      console.log(this.userid);
    //console.log("username");
    //console.log(this.username);
    let bookId = this.route.snapshot.paramMap.get('id');

    this.bookService.getBookById(bookId)
      .subscribe( ( res: any) => {
        console.log(res);
        this.bookData = res
      })
    await this.delay(20);  
    this.booksSubscription = this.bookService.getCategories()
      .subscribe( (res: any) => {
        console.log(res);
        this.categoryList = res
        for (var i = 0; i < this.categoryList.length; i++) {
          console.log("hmm");
          if (this.bookData.BCatId == this.categoryList[i].CatId){
            this.bookData.BCat = this.categoryList[i].CatName
            console.log(this.bookData.BCat)
          }
        }
      });

    
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
    
    //TO DO :
    //Change API call to retrieve data specifically for the user to avoid the first if in the below for loop


    //here we are checking if the book is already present in the cart
    //If so the increment the value of BQty and set isPresentCart to true

    //If book is not present in cart then it goes to the line if(!this.isPresentCart){..}
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
      console.log(this.cartItem , "This book id is a new entry to the cart");
      this.bookService.createCart(this.cartItem)
      .subscribe( (res: any) => { // 3. get the resp from the service
        //if(res == "Success"){
        //}

      });
    }
  }

  async handleAddToWishList(book: any): Promise<void> {
    console.log(book);
    console.log("handleAddToWishList")
    //this.cartDataService.updateCart(book);
    console.log(this.userid);
    this.wishItem.UserId = this.userid;
    this.wishItem.BId = book.BId;

    console.log(this.wishItem);

    this.bookService.getWish()
      .subscribe( (res: any) => {
        console.log(res);
        this.wishList = res
      })
    await this.delay(200); 
    for(var i = 0; i < this.wishList.length ; i++) {
      if(this.wishList[i].UserId == this.cartItem.UserId){
        if(this.wishList[i].BId == this.cartItem.BId){
          this.isPresentWish = true;
        }
      }
    }
    if(!this.isPresentWish){
      console.log(this.wishItem);
      this.bookService.createWish(this.wishItem)
      .subscribe( (res: any) => { // 3. get the resp from the service
        //if(res == "Success"){
        //}

      });
    }
  }

  handleRatings(book: any) {
    this.rating.Ratings(book,this.userid);
    this.reqRat = true;
  }

  closeRat(){
    this.reqRat = false;
  }


}

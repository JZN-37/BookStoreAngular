import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.component.html',
  styleUrls: ['./vieworders.component.scss']
})
export class ViewordersComponent implements OnInit {
  username: any;
  userid: any;
  orderid: any;

  BookTitle:any;
  BookCatName:any;
  BookISBN:any;
  BookYear:any;
  BookPrice:any;
  BImagePath:any;
  BookQty:any;
  OrderDate:any;

  userList : any[] = [];
  OrderList: any[] = [];

  isOrderEmpty: boolean = true;

  constructor(private bookService: BookService) { }

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
      await this.delay(200); 
      for(var i = 0; i < this.userList.length; i++){
        console.log(this.userList[i].UName)
        if (this.username == this.userList[i].UName){
          this.userid = this.userList[i].Id; 
        }
      }

    this.bookService.getOrderById(this.userid)
    .subscribe( (res: any) => {
      this.OrderList = res;
    });

    await this.delay(200); 
    console.log(this.OrderList);
    if(this.OrderList.length>0)
    {
      this.isOrderEmpty=false;
    }

    // for(var i = 0; i < this.OrderList.length; i++ ){
    //   this.orderid = Number(this.OrderList[i].OrderId);
    //   this.BookTitle = this.OrderList[i].BookTitle ;
    //   this.BookCatName = this.OrderList[i].BookCatName;
    //   this.BookISBN = this.OrderList[i].BookISBN;
    //   this.BImagePath = this.OrderList[i].BImagePath;
    //   this.BookQty = Number(this.OrderList[i].BookQty);
    //   this.BookPrice = Number(this.OrderList[i].BookPrice);
    //   this.OrderDate = this.OrderList[i].OrderDate;
    //   console.log(this.BookTitle);
    // }

    
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
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

  constructor(private userService: UserService,private bookService: BookService) { }

  async ngOnInit(): Promise<void>  {
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

    this.bookService.getAllOrder(this.userid)
    .subscribe( (res: any) => {
      this.OrderList = res;
    });

    await this.delay(200); 
    console.log(this.OrderList , "All Orders ");
    if(this.OrderList.length>0)
    {
      this.isOrderEmpty=false;
    }
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.scss']
})
export class AdminCouponsComponent implements OnInit {

  discountList: any[] = [];
  discountData: any;
  discountsSubscription: Subscription | undefined = undefined;
  status: any;
  isUpdated: boolean = false;
  updateReqSent : boolean = false;
  isDeleted : boolean = false;

  constructor( private bookService: BookService, private router: Router ) { }

  async ngOnInit(): Promise<void> {
    this.discountsSubscription = this.bookService.getDiscounts()
    .subscribe( (res: any) => {
      this.discountList = res;
    });

    await this.delay(200); 


  }

  handleEditDiscountModal(id: any){
    this.bookService.getDiscountById(id)
    .subscribe( ( res: any) => {
      console.log(res);
      this.discountData = res
    })
    this.isUpdated = false;
  }

  async handleUpdate(){
    console.log(this.discountData); // before sending to the service
    this.updateReqSent = true;
    this.status = await this.bookService.updateDiscount(this.discountData);
    console.log(this.status);

    //if(this.status == "Success"){
      this.isUpdated = true;
    //}
  }

  async handleDelete(id: any){
    this.bookService.getDiscountById(id)
    .subscribe( ( res: any) => {
      console.log(res);
      this.discountData = res
    })
    await this.delay(200); 

    this.bookService.deleteDiscount(this.discountData);
    await this.delay(200); 
    this.isDeleted = true;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}

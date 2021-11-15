import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  // Step 1: default cart items in the cart 
  // We will normally load this from REST API 
  // but now I am mocking it with static data
  private defaultCartItems: any[] = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    }
  ];


  // in order to make the above data subscribable 
  // We need to create an Observable with the default cart Items 
  // Step 2: Create Behaviour Subject with default item
  private cartItemsList = new BehaviorSubject(this.defaultCartItems);

  // Step 3: Let's make the above as Observable so that any other comp can subscribe to it.
  latestCartItemsList: Observable<any[]> = this.cartItemsList.asObservable();
  // latestCartItemsList is subscribable 

  constructor() { }

  updateCart(pdt: any){
    console.log(pdt);
    console.log("updatecart")
    
    this.latestCartItemsList.pipe( take(1)).subscribe( (cartItems) => {
      console.log(cartItems); // array 
      console.log(...cartItems); // spread operator
      const newCartItemsArr = [ ...cartItems, pdt]; 
      console.log(newCartItemsArr);
      this.cartItemsList.next(newCartItemsArr);
    });
  }

  removeFromCart(pdt: any){
    this.latestCartItemsList.pipe( take(1)).subscribe( (cartItems) => {
      console.log(cartItems); // array 
      console.log(...cartItems); // spread operator
      const newCartItemsArr = [ ...cartItems]; 
      console.log("removing");
      for (var i = newCartItemsArr.length; i--;) {
        if (newCartItemsArr[i].id == pdt.id) newCartItemsArr.splice(i, 1);
      }
      console.log(newCartItemsArr);

      this.cartItemsList.next(newCartItemsArr);
    });
  }

}



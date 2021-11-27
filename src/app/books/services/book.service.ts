import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private REST_API_URL = 'http://localhost:60494/api/book/'
  private catAPIURL = 'http://localhost:60494/api/category/'
  private featuredURL = 'http://localhost:60494/api/book?ColName=BPosition'
  private newURL = 'http://localhost:60494/api/book?ColName=BYear'
  private discountURL = 'http://localhost:60494/api/discount/'
  private userURL = 'http://localhost:60494/api/users/'
  private cartURL = 'http://localhost:60494/api/cart/'
  private wishURL = 'http://localhost:60494/api/wishlist/'
  private orderURL = 'http://localhost:60494/api/orders/'

  constructor( private http: HttpClient) { }

  createBook( bookData: any ): any { // 1. get the form data from comp ts 
    console.log(bookData);
    bookData.BImgPath = bookData.BImgPath.replace("C:\\fakepath\\", "../../../assets/images/");
    // 2. send the form data to the REST API 
    // 2.1 What's the REST API? https://jsonplaceholder.typicode.com/users/ 
    // 2.2 What's the HTTP Method? POST
    // 2.3 What's the REST API Client? HttpClient
    return this.http.post(this.REST_API_URL, bookData)
      .pipe( map( (res: any) => { // 3. get the resp from the REST API
        console.log(res);
        // 4. send the resp to the comp ts
        return res;
      }));
  }

  createCategory( categoryData: any ): any { // 1. get the form data from comp ts 
    console.log(categoryData);
    categoryData.CatImgPath = categoryData.CatImgPath.replace("C:\\fakepath\\", "../../../assets/images/");
    // 2. send the form data to the REST API 
    // 2.1 What's the REST API? https://jsonplaceholder.typicode.com/users/ 
    // 2.2 What's the HTTP Method? POST
    // 2.3 What's the REST API Client? HttpClient
    return this.http.post(this.catAPIURL, categoryData)
      .pipe( map( (res: any) => { // 3. get the resp from the REST API
        console.log(res);
        // 4. send the resp to the comp ts
        return res;
      }));
  }

  createDiscount( discountData: any ): any { // 1. get the form data from comp ts 
    console.log(discountData);
    // 2. send the form data to the REST API 
    // 2.1 What's the REST API? https://jsonplaceholder.typicode.com/users/ 
    // 2.2 What's the HTTP Method? POST
    // 2.3 What's the REST API Client? HttpClient
    return this.http.post(this.discountURL, discountData)
      .pipe( map( (res: any) => { // 3. get the resp from the REST API
        console.log(res);
        // 4. send the resp to the comp ts
        return res;
      }));
  }

  createCart( cartData: any ): any { // 1. get the form data from comp ts 
    console.log(cartData);
    // 2. send the form data to the REST API 
    // 2.1 What's the REST API? https://jsonplaceholder.typicode.com/users/ 
    // 2.2 What's the HTTP Method? POST
    // 2.3 What's the REST API Client? HttpClient
    return this.http.post(this.cartURL, cartData)
      .pipe( map( (res: any) => { // 3. get the resp from the REST API
        console.log(res);
        // 4. send the resp to the comp ts
        return res;
      }));
  }

  createWish( wishData: any ): any { // 1. get the form data from comp ts 
    console.log(wishData);
    // 2. send the form data to the REST API 
    // 2.1 What's the REST API? https://jsonplaceholder.typicode.com/users/ 
    // 2.2 What's the HTTP Method? POST
    // 2.3 What's the REST API Client? HttpClient
    return this.http.post(this.wishURL, wishData)
      .pipe( map( (res: any) => { // 3. get the resp from the REST API
        console.log(res);
        // 4. send the resp to the comp ts
        return res;
      }));
  }

  createOrder( orderData: any ): any { // 1. get the form data from comp ts 
    console.log(orderData);
    // 2. send the form data to the REST API 
    // 2.1 What's the REST API? https://jsonplaceholder.typicode.com/users/ 
    // 2.2 What's the HTTP Method? POST
    // 2.3 What's the REST API Client? HttpClient
    return this.http.post(this.orderURL, orderData)
      .pipe( map( (res: any) => { // 3. get the resp from the REST API
        console.log(res);
        // 4. send the resp to the comp ts
        return res;
      }));
  }

  getBooks(): Observable<any[]> {
    return this.http.get(this.REST_API_URL)
        .pipe( map( (res: any) => {
          console.log(res);
          return res;
        }));
  }

  getCategories(): Observable<any[]> {
    return this.http.get(this.catAPIURL)
        .pipe( map( (res: any) => {
          console.log(res);
          return res;
        }));
  }

  getDiscounts(): Observable<any[]> {
    return this.http.get(this.discountURL)
        .pipe( map( (res: any) => {
          console.log(res);
          return res;
        }));
  }


  getCart(): Observable<any[]> {
    return this.http.get(this.cartURL)
        .pipe( map( (res: any) => {
          console.log(res);
          return res;
        }));
  }

  getWish(): Observable<any[]> {
    return this.http.get(this.wishURL)
        .pipe( map( (res: any) => {
          console.log(res);
          return res;
        }));
  }

  getBookById( id: string | null ): any { 
    let APIUrl = this.REST_API_URL + id; 

    return this.http.get(APIUrl)
      .pipe(map( (res: any) => {
        return res;
      }));
  }

  getCategoryById( id: string | null ): any { 
    let APIUrl = this.catAPIURL + id; 

    return this.http.get(APIUrl)
      .pipe(map( (res: any) => {
        return res;
      }));
  }

  getDiscountById( id: string | null ): any { 
    let APIUrl = this.discountURL + id; 

    return this.http.get(APIUrl)
      .pipe(map( (res: any) => {
        return res;
      }));
  }



  updateBook( updateableBookData: any): any {
    console.log(updateableBookData); // before submitting to the REST API
    return this.http.put(this.REST_API_URL + updateableBookData.BId, updateableBookData)
      .toPromise()
      .then( (res: any) => {
        console.log(res);
        return res;
      })
      .catch( (err: any) => {
        console.log(err);
        return err;
      })
      .finally( () => {
        console.log('It is over!');
      });
  }

  updateCategory( updateableCategoryData: any): any {
    console.log(updateableCategoryData); // before submitting to the REST API
    return this.http.put(this.catAPIURL + updateableCategoryData.CatId, updateableCategoryData)
      .toPromise()
      .then( (res: any) => {
        console.log(res);
        return res;
      })
      .catch( (err: any) => {
        console.log(err);
        return err;
      })
      .finally( () => {
        console.log('It is over!');
      });
  }

  updateDiscount( updateableDiscountData: any): any {
    console.log(updateableDiscountData); // before submitting to the REST API
    return this.http.put(this.discountURL + updateableDiscountData.DId, updateableDiscountData)
      .toPromise()
      .then( (res: any) => {
        console.log(res);
        return res;
      })
      .catch( (err: any) => {
        console.log(err);
        return err;
      })
      .finally( () => {
        console.log('It is over!');
      });
  }

  updateCart( updateableCartData: any): any {
    console.log(updateableCartData); // before submitting to the REST API
    return this.http.put(this.cartURL + updateableCartData.cartTempId, updateableCartData)
      .toPromise()
      .then( (res: any) => {
        console.log(res);
        return res;
      })
      .catch( (err: any) => {
        console.log(err);
        return err;
      })
      .finally( () => {
        console.log('It is over!');
      });
  }

  deleteBook( deleteableBookData: any): any{
    return this.http.delete(this.REST_API_URL + deleteableBookData.BId, deleteableBookData)
    .toPromise()
    .then( (res: any) => {
      console.log(res);
      return res;
    })
    .catch( (err: any) => {
      console.log(err);
      return err;
    })
    .finally( () => {
      console.log('It is over!');
    });
  }

  deleteCategory( deleteableCategoryData: any): any{
    return this.http.delete(this.catAPIURL + deleteableCategoryData.CatId, deleteableCategoryData)
    .toPromise()
    .then( (res: any) => {
      console.log(res);
      return res;
    })
    .catch( (err: any) => {
      console.log(err);
      return err;
    })
    .finally( () => {
      console.log('It is over!');
    });
  }

  deleteDiscount( deleteableDiscountData: any): any{
    return this.http.delete(this.discountURL + deleteableDiscountData.DId, deleteableDiscountData)
    .toPromise()
    .then( (res: any) => {
      console.log(res);
      return res;
    })
    .catch( (err: any) => {
      console.log(err);
      return err;
    })
    .finally( () => {
      console.log('It is over!');
    });
  }

  deleteCart( deleteableCartData: any): any{
    return this.http.delete(this.cartURL + deleteableCartData.UserId + "?bid=" + deleteableCartData.BId, deleteableCartData)
    .toPromise()
    .then( (res: any) => {
      console.log(res);
      return res;
    })
    .catch( (err: any) => {
      console.log(err);
      return err;
    })
    .finally( () => {
      console.log('It is over!');
    });
  }

  deleteWish( deleteableWishData: any): any{
    console.log("inside service delete wish");
    return this.http.delete(this.wishURL + deleteableWishData.UserId + "?bid=" + deleteableWishData.BId, deleteableWishData)
    .toPromise()
    .then( (res: any) => {
      console.log(res);
      return res;
    })
    .catch( (err: any) => {
      console.log(err);
      return err;
    })
    .finally( () => {
      console.log('It is over!');
    });
  }

  getFeaturedBooks(): Observable<any[]> {
    return this.http.get(this.featuredURL)
        .pipe( map( (res: any) => {
          console.log(res);
          return res;
        }));
  }

  getNewBooks(): Observable<any[]> {
    return this.http.get(this.newURL)
        .pipe( map( (res: any) => {
          console.log(res);
          return res;
        }));
  }



  getOrderById( id: any ): any { 
    let APIUrl = this.orderURL + id; 
    return this.http.get(APIUrl)
      .pipe(map( (res: any) => {
        return res;
      }));
  }

  getAllOrder( id: any ): any { 
    let APIUrl = this.orderURL; 
    return this.http.get(APIUrl)
      .pipe(map( (res: any) => {
        return res;
      }));
  }

  

}

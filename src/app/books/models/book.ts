import { Injectable } from "@angular/core";

interface IBook {
  id: number;
  title: string;
  url: string;
  thumburl: string;
}

@Injectable({
  providedIn: 'root'
})
export class Book implements IBook{
  id: number = 0;
  title: string = '';
  url: string = '';
  thumburl: string = '';


  // util methods around User...
  // filter users, total users 
}

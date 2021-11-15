import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pageRedirect(){
    if(localStorage.getItem('userRole')=="Admin"){
      return "/admin-dashboard";
    }else{
      return '/users';
    }
  }

}

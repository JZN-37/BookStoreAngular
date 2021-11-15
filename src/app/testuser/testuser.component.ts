import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testuser',
  templateUrl: './testuser.component.html',
  styleUrls: ['./testuser.component.scss']
})
export class TestuserComponent implements OnInit {

  username: any;
  constructor() { }

  ngOnInit(): void {
    
    this.username = localStorage.getItem('userName');
    
  }
  
  logOut(){
    localStorage.clear();
  }
}


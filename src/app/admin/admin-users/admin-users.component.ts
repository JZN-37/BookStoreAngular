import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {


  userList: any[] = [];
  booksSubscription: Subscription | undefined = undefined;

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.booksSubscription = this.userService.getUsersWithRole()
    .subscribe( (res: any) => {
      this.userList = res;
      //console.log('all users' , this.userList);
    });


  }

}

import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-make-rating',
  templateUrl: './make-rating.component.html',
  styleUrls: ['./make-rating.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class MakeRatingComponent implements OnInit {
  static UserId: any;
  static BId: any;
  UserRating: any;
  isSaved: boolean = false;
  prevrating = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(MakeRatingComponent.UserId, MakeRatingComponent.BId);
    this.userService.getRatingsbyUser(MakeRatingComponent.UserId)
      .subscribe((res: any) => {
        for(let r of res)
        {
          if(r.BId == MakeRatingComponent.BId)
          {
            this.prevrating = r.UserRating.toString();
          }
        } 
      });
  }

Ratings(data: any, user: number): void {
  MakeRatingComponent.BId = data.BId;
  MakeRatingComponent.UserId = user;
}

handleAddRatings(data: any): void {
  this.UserRating = data.rating;
  let ratingsData = {
    UserId: MakeRatingComponent.UserId,
    BId: MakeRatingComponent.BId,
    UserRating: this.UserRating
  }
  if(this.prevrating == "")
  {
    this.userService.AddRatings(ratingsData)
    .subscribe((res: any) => {
      if (res == "Success") {
        this.isSaved = true;
      }
    });
  }
  else
  {
    this.userService.UpdateRatings(ratingsData)
    .subscribe((res: any) => {
      if (res == "Success") {
        this.isSaved = true;
      }
    });
  }
}

}


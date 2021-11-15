import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private userService: UserService, private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null)
      {
        let roles = next.data["roles"] as Array<string>;
        if (roles) {
          console.log(roles , roles[0]);
          //var match = this.userService.roleMatch(roles);
          if (this.userService.roleMatch(roles)) {return true;}
          else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        else
          return true;

      }
      this.router.navigate(['/signin']);
      return false;
  }

  
}

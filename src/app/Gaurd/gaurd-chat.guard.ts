import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatsService } from '../services/chats.service';
// import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class GaurdChatGuard implements CanActivate {
  constructor(public service:ChatsService,public router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if (this.service.LoggedUser().id==route.params.id) {
        return true
      }else{
        this.router.navigate(['/sign-in']);
      }
      

}
  
}

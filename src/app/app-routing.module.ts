import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatpageComponent } from './chatpage/chatpage.component';
import { GaurdChatGuard } from './Gaurd/gaurd-chat.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'sign-in', pathMatch:'full'},
  {path:'sign-in',component:SignInComponent},
  {path:'home',component:HomeComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'chat/:id',canActivate:[GaurdChatGuard], component:ChatpageComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

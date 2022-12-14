import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { logGuard } from './log.guard';
import { LoginComponent } from './login/login.component';
import { MempackagesComponent } from './mempackages/mempackages.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SlideComponent } from './slide/slide.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ManagerComponent } from './manager/manager.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileBasicComponent } from './profile-basic/profile-basic.component';
import { SportPreferenceComponent } from './sport-preference/sport-preference.component';
import { ProfileSportComponent } from './profile-sport/profile-sport.component';
import { EventsComponent } from './events/events.component';
import { PartnerComponent } from './partner/partner.component';
import { WelcomePartnerComponent } from './welcome-partner/welcome-partner.component';
import { ProfileFoodComponent } from './profile-food/profile-food.component';

const routes: Routes = [
   {path:"",component:SlideComponent},
   {path:"register", component:RegisterComponent,canActivate:[logGuard]},
   {path:"contact",component:ContactComponent},
   {path:"login", component:LoginComponent ,canActivate:[logGuard]},
   {path:"profile", component:ProfileComponent, canActivate:[AuthGuard]},
   {path:"packages", component:MempackagesComponent},
   {path:"cart", component:CartComponent, canActivate:[AuthGuard]},
   {path:"payment", component:PaymentComponent, canActivate:[AuthGuard]},
   {path:"manager", component:ManagerComponent, canActivate:[AdminGuard]},
   {path:"edituser/:userid",component:EdituserComponent,canActivate:[AdminGuard]},
   {path:"adduser", component:AdduserComponent,canActivate:[AdminGuard]},
   {path:"profile-basic", component:ProfileBasicComponent, canActivate:[AuthGuard]},
   {path:"profile-sport", component:ProfileSportComponent, canActivate:[AuthGuard]},
   {path:"sport-preference", component:SportPreferenceComponent, canActivate:[AuthGuard]},
   {path:"events", component:EventsComponent, canActivate:[AuthGuard]},
   {path:"register-partner", component:PartnerComponent},
   {path:"welcome-partner", component:WelcomePartnerComponent, canActivate:[AuthGuard]},
   {path:"profile-food", component:ProfileFoodComponent, canActivate:[AuthGuard]},
   

   {path:"**",component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

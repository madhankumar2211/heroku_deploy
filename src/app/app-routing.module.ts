import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BooknowComponent } from './booknow/booknow.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { QuoteComponent } from './quote/quote.component';
import { RegisterComponent } from './register/register.component';
import { ServiceComponent } from './service/service.component';
import { OrderResolver } from './services/order.resolver';
import { UsersResolver } from './services/users.resolver';
import { VehicleResolver } from './services/vehicle.resolver';
import { TrackingComponent } from './tracking/tracking.component';
import { UpdateprofieComponent } from './updateprofie/updateprofie.component';
import { WhychooseusComponent } from './whychooseus/whychooseus.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'Home',
    component : HomeComponent
  },
  {
    path : 'Service',
    component : ServiceComponent
  },
  {
    path : 'Whychooseus',
    component : WhychooseusComponent
  },
  {
    path : 'Booknow',
    component : BooknowComponent,
    resolve : {
      vh : VehicleResolver
    }
  },
  {
    path : 'Tracking',
    component : TrackingComponent
  },
  {
    path : 'Contactus',
    component : ContactusComponent
  },
  {
    path : 'Profile',
    component : ProfileComponent,
    canActivate:[AuthGuard], 
    resolve : {
      user : UsersResolver,
      order : OrderResolver
    }
  },
  {
    path : 'Login',
    component : LoginComponent
  },
  {
    path : 'Forgot',
    component : ForgotComponent
  },
  {
    path : 'Register',
    component : RegisterComponent
  },
  {
    path : 'Payment',
    component : PaymentComponent,
    canActivate:[AuthGuard]
  },
  
  {
    path : 'Quote',
    component : QuoteComponent,
    resolve : {
      vh : VehicleResolver
    }
  },
  {
    path : 'Update',
    component : UpdateprofieComponent,
    resolve : {
      user : UsersResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

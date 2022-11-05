import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AuthGuard } from './Auth/auth.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditproductComponent } from './editproduct/editproduct.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
       component: DashboardComponent 
      },
      {
        path: 'manageusers',
        component: ManageusersComponent
      },
      {
        path:'manageusers/adduser',
        component:AdduserComponent
      },
      {
        path: 'manageuser/:id',
        component: EdituserComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path:'products/addproduct',
        component:AddproductComponent
      },
      {
        path: 'products/:id',
        component: EditproductComponent
      },
      {
        path: 'changepassword',
        component: ChangepasswordComponent
      },
      
    ]
  },
  {
    path: '**',
    component: PagenotfoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

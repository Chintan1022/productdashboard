import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardServiceService } from '../services/dashboard-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show = false
  pwdType = 'password'
 constructor(private router: Router,private service:DashboardServiceService) { }
 ngOnInit() {

   if (sessionStorage.getItem('token')) {
     this.router.navigate(['home/dashboard']);
   }else{
     this.router.navigate(['login'])
   }  
   
 }
 
  toggleShow() {
   this.show = !this.show
   this.pwdType = this.show ? 'text' : 'password'
  }

 onLogin(value: any) {
     this.service.Login(value).subscribe(
     (response: any) => {
      console.log(response)
       if (response['code'] == 1) {
         sessionStorage.setItem('token', response.data['token']);
         
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Login Success',
           showConfirmButton: false,
           timer: 1000
         })
         this.router.navigate(['home/dashboard'])
       } else {
         Swal.fire({
           position: 'center',
           icon: 'error',
           title: 'Invalid Credentials !!',
           showConfirmButton: false,
           timer: 1000
         })
         
         
         this.ngOnInit()
       }
       
     }

   ); 

 } 
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readuser: any = []
  token=sessionStorage.getItem('token')
 
  constructor(private router:Router,private service:DashboardServiceService) { }

  ngOnInit(): void {
    this.service.getuserprofile(this.token).subscribe((res:any)=>{
      // console.log(res)
     this.readuser=res.data    
   })

  }
  confirmBox(){
    this.service.logout().subscribe(()=>{
    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, please!',
      cancelButtonText: 'No, keep it'
    })
    .then((result:any) => {
        if (result.value) {
          sessionStorage.removeItem('token');
          this.router.navigate(['login']);
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelled',
           'error'
         )
      }
    })
  })
  
  
  
  }
  

}

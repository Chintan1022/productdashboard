import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.scss']
})
export class ManageusersComponent implements OnInit,OnDestroy {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  router: any;
  readuser: any = []
  constructor(private service: DashboardServiceService) { }
  
  ngOnInit(): void {
   this.dtOptions = {
      pagingType: 'full_numbers',
       pageLength: 3,
      lengthMenu : [3,5, 10, 25],
      processing: true 
     };
     this.service.getuserdetails().subscribe(
      (response: any) => {
         this.readuser = response.data
         this.dtTrigger.next(null);
      });
      
  }
   
   ngOnDestroy(): void {
   this.dtTrigger.unsubscribe();
   
  } 
 


  deleteuser(id: any) {
   Swal.fire({
      title: 'Are you sure want to delete user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, please!',
      cancelButtonText: 'No, keep it'
    }).then((result: any) => {
      if (result.value) {

        this.service.deleteuser(id).subscribe((response: any) => {

          if (response.code == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User Deleted Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.ngOnInit();
    
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'oops something went wrong!!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }
  
 

}

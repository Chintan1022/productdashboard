import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  router: any;
  allproducts: any = []
  constructor(private service: DashboardServiceService) { }
  
  
  ngOnInit(): void {
     this.dtOptions = {
        pagingType: 'full_numbers',
        

     };
     this.service.getproductdetails().subscribe(
      (response: any) => {
         this.allproducts = response.data
         this.dtTrigger.next(this.allproducts);
      });
    
  }

  ngOnDestroy(): void {
   this.dtTrigger.unsubscribe();
}

  



  deleteproduct(id: any) {
     this.service.deleteproduct(id).subscribe((res: any) => {
        if (res['code'] == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'delete product Success',
            showConfirmButton: false,
            timer: 1000
          })
            
           this.ngOnInit();
        }
        else {
           console.log("fail")
        }
     })
  }

 

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {


  public addproductForm!: FormGroup;
  public submitted = false;
 
  constructor(private formBuilder: FormBuilder, private router: Router,private service:DashboardServiceService) { }

  

  ngOnInit(): void {
    this.addproductForm = this.formBuilder.group({
      product_name: ["",[Validators.required]],
      product_price: ["",[Validators.required]],
      about: ["",[Validators.required]],
} );


  }
  get formControl() {
    return this.addproductForm.controls;
  }

  onSubmit():void{
    this.submitted = true;
    console.log(this.addproductForm.valid)
    if (this.addproductForm.valid) {
      this.service.addproduct(this.addproductForm.value).subscribe(
        (response:any) => {
          if(response['code'] == 1){    
            Swal.fire({  
              position: 'center',  
              icon: 'success',  
              title: 'user product Successfully',  
              showConfirmButton: false,  
              timer: 1000  
            })        
            this.router.navigate(['/home/products'])
          }else{
            Swal.fire({  
              position: 'center',  
              icon: 'error',  
              title: 'something wrong',  
              showConfirmButton: false,  
              timer: 1000  
            })        
            this.ngOnInit();
          }
        
        });
 
     
    }
  }

}

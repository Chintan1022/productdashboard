import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  submitted = false;
  editproductForm!: FormGroup;
  
  constructor(private service: DashboardServiceService, private router:Router,private formBuilder: FormBuilder,private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.editproductForm = this.formBuilder.group({
        product_name: ["",[Validators.required]],
        product_price: ["",[Validators.required]],
        about: ["",[Validators.required]],
    })
    this.service.getSingleProductData(this.route.snapshot.params.id).subscribe((res:any)=>{
      this.editproductForm.patchValue({
        product_name:res.data.product_name,
        product_price:res.data.product_price,
        about:res.data.about,
     })     
      
    })
  }
  
  get formControl() {
    return this.editproductForm.controls;
  }
  
  onSubmit() {
    this.submitted=true
    if(this.editproductForm.valid){
      this.update();
    }
    else{
      console.log("false");
    }
  }

  update() {
    this.service.updateproduct(this.route.snapshot.params.id,this.editproductForm.value).subscribe((res:any)=>{
      if(res['code'] == 1){    

        Swal.fire({  
          position: 'center',  
          icon: 'success',  
          title: 'Successfully Update user data',  
          showConfirmButton: false,  
          timer: 1000  
        })        
        this.router.navigate(['home/products'])
      }else{
        Swal.fire({  
          position: 'center',  
          icon: 'error',  
          title: 'Try Again !!!',  
          showConfirmButton: false,  
          timer: 1000  
        })        
        this.ngOnInit();
      }
    })
  }
  
  
}

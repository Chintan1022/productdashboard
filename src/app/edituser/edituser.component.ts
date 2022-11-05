import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  submitted = false;
  updateForm!: FormGroup;
  
  constructor(private service: DashboardServiceService, private router:Router,private formBuilder: FormBuilder,private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name:["", [Validators.required, Validators.pattern(
        "[a-zA-Z]+"
      )]],
      email:["", [Validators.email, Validators.required]],
      phoneno: ["", [Validators.required, Validators.maxLength(10)]],
    })
    this.service.getSingleData(this.route.snapshot.params.id).subscribe((res:any)=>{
      this.updateForm.patchValue({
        name:res.data.name,
        email:res.data.email,
        phoneno:res.data.phoneno,
     })     
      
    })
  }
  
  get formControl() {
    return this.updateForm.controls;
  }
  
  onSubmit() {
    this.submitted=true
    if(this.updateForm.valid){
      this.update();
    }
    else{
      console.log("false");
    }
  }

  update() {
    this.service.updateUser(this.route.snapshot.params.id,this.updateForm.value).subscribe((res:any)=>{
      if(res['code'] == 1){    

        Swal.fire({  
          position: 'center',  
          icon: 'success',  
          title: 'Successfully Update user data',  
          showConfirmButton: false,  
          timer: 1000  
        })        
        this.router.navigate(['home/manageusers'])
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

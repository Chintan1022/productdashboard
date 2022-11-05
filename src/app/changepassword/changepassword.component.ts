import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ConfirmedValidator } from './confirmed.validator';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  public submitted:any = false;
  public cForm!: FormGroup; 
  
  
  
  
  constructor(private fb: FormBuilder,private service:DashboardServiceService,private router:Router){}
  ngOnInit():void{
    this.cForm = this.fb.group({
      oldPwd:["",[Validators.required]],
      newPwd: ["",[Validators.required,Validators.pattern(
            "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          )
        ]
      ],
      confirmPwd:['', [Validators.required]]
    },
    {
      validator: ConfirmedValidator('newPwd', 'confirmPwd')
    });
    
  }
  get formControl() {
    return this.cForm.controls;
  }
  changepassword(value:any){
    this.submitted = true;
    if (this.cForm.valid) {
      this.service.changepassword(value).subscribe(
        (response:any) => {
          if(response['code'] == 1){    
            Swal.fire({  
              position: 'center',  
              icon: 'success',  
              title: 'Password Change Successfully',  
              showConfirmButton: false,  
              timer: 1000  
            })        
            this.router.navigate(['home/dashboard'])
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

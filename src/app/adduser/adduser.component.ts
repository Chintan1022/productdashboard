import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ConfirmedValidator } from './confirmed.validator';
import { country } from './contry list';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  public adduserForm!: FormGroup;
  public submitted = false;
 
  constructor(private formBuilder: FormBuilder, private router: Router,private service:DashboardServiceService) { }

  countryList: country[] = [
    new country('1', 'India'),
    new country('2', 'USA'),
    new country('3', 'England'),
    new country('4', 'Caneda'),

  ];

  ngOnInit(): void {
    this.adduserForm = this.formBuilder.group({
      name: ["", [Validators.required,Validators.pattern(
        "[a-zA-Z]+"
      )]],
      email: ["", [Validators.email, Validators.required]],
      role: ["",[Validators.required]],
      country: new FormControl('', [Validators.required]),
      phoneno: new FormControl('', [Validators.required,Validators.maxLength(10)]),
      
      password: ["",[Validators.required,Validators.pattern(
            "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          )
        ]
      ],
      acceptTerms: [false, Validators.requiredTrue],
      confirmpassword: ['', [Validators.required]]
    },
    {
      validator: ConfirmedValidator('password', 'confirmpassword')
    });


  }
  get formControl() {
    return this.adduserForm.controls;
  }

  onSubmit():void{
    console.log(this.submitted)
    this.submitted = true;
    console.log(this.adduserForm.valid)
    if (this.adduserForm.valid) {
      this.service.adduser(this.adduserForm.value).subscribe(
        (response:any) => {
          if(response['code'] == 1){    
            Swal.fire({  
              position: 'center',  
              icon: 'success',  
              title: 'user add Successfully',  
              showConfirmButton: false,  
              timer: 1000  
            })        
            this.router.navigate(['/home/manageusers'])
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

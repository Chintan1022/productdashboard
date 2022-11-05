import { Component, OnInit } from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalusers:any;
  constructor(private service:DashboardServiceService) { }

  ngOnInit(): void {
    this.service.dashboard().subscribe((res:any)=>{
      this.totalusers=res;
   })
  }

}

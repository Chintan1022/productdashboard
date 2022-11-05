import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  body = ['key', 'val'];
  token = sessionStorage.getItem('token') || "";
  constructor(private http: HttpClient) { }

  Login(body: any) {
    return this.http.post('http://localhost:3000/api/v1/auth/login', body);
  }

  dashboard() {
    return this.http.get('http://localhost:3000/api/v1/auth/dashboard');
  }

  getuserprofile(token:any) {
    return this.http.get('http://localhost:3000/api/v1/auth/getuserprofile',token);
  }
  logout() {
    return this.http.get('http://localhost:3000/api/v1/auth/logout');
  }

  adduser(body: any) {
    return this.http.post('http://localhost:3000/api/v1/auth/addUser', body);
  }

  getuserdetails() {
    return this.http.get('http://localhost:3000/api/v1/auth/userDetails');
  }

  getproductdetails() {
    return this.http.get('http://localhost:3000/api/v1/auth/getProductDetails');
  }

  
  deleteuser(id:any) {
    var ids = {
      "getid":id
    }
    return this.http.post('http://localhost:3000/api/v1/auth/deleteuser',ids);
  }

  addproduct(body: any) {
    return this.http.post('http://localhost:3000/api/v1/auth/addProduct', body);
  }

  deleteproduct(id:any) {
    var ids = {
      "getid":id
    }
    return this.http.post('http://localhost:3000/api/v1/auth/deleteProduct',ids);
  }

  updateUser(id:any,data:any) {
    data.id=id;
      return this.http.post('http://localhost:3000/api/v1/auth/updateUserDetails',data);
    }
    
    getSingleData(id:any) {
      var ids = {
        "id":id
      }
      return this.http.post('http://localhost:3000/api/v1/auth/getSingleUser',ids);
    }

    getSingleProductData(id:any) {
      var ids = {
        "id":id
      }
      return this.http.post('http://localhost:3000/api/v1/auth/getSingleProduct',ids);
    }

    updateproduct(id:any,data:any) {
      data.id=id;
        return this.http.post('http://localhost:3000/api/v1/auth/updateProductDetails',data);
      }

    changepassword(data:any){
      return this.http.post('http://localhost:3000/api/v1/auth/changePassword',data);
    }

}

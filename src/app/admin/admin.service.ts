import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl: string = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  loginAdminUser(adminData: any) {
    return this.http.post('http://localhost:9091/admin/login', adminData, {
      responseType: 'text'
    });
  }



  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  logoutAdmin() {
    localStorage.removeItem('adminToken');
  }
}

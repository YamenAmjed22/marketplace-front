import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.';


@Injectable({
    providedIn: 'root'
})
export class RegistrationService {


    apiUrl: String = `${environment.apiUrl}`;


    constructor(
        private http: HttpClient) { }


    registration(userDate: any) {
        return this.http.post(this.apiUrl + "/addnewuser", userDate);
    }

    verifyOtp(otpCheckRequest: any) {
        return this.http.post(this.apiUrl + "/ckeckotp", otpCheckRequest);
    }

    login(loginData: any) {
        return this.http.post(this.apiUrl + "/login", loginData)
    }
    contactUs(contactUs: any, headers: unknown) {
        return this.http.post(this.apiUrl + "/contact", contactUs)

    }

    addProduct(productFormData: FormData) {
        return this.http.post(this.apiUrl + "/products", productFormData, {
            withCredentials: true
        });
    }

    uploadImage(formData: FormData) {
        return this.http.post(this.apiUrl + "/uploadfile", formData, {
            responseType: 'text' // because backend returns URL string
        });
    }

    getAllProducts() {
        return this.http.get(this.apiUrl + "/products");
    }

    deleteProductById(id: any) {
        return this.http.delete(this.apiUrl + "/products/" + `${id}`);
    }

    addProductToTheCart(addedProduct: any) {
        const token = localStorage.getItem('authToken'); // or get from AuthService
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(this.apiUrl + "/MyCart", addedProduct, { headers });

    }

    getAllProductsFromCart() {
        const token = localStorage.getItem('authToken'); // or get it from AuthService
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get(this.apiUrl + "/MyCart", { headers });
    }

    deleteProductFromCartById(id: any) {
        const token = localStorage.getItem('authToken'); // or get from AuthService
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete(this.apiUrl + "/MyCart/" + id, { headers });
    }


    getAllContactMessages() {
        return this.http.get(this.apiUrl + "/contact");
    } 

    deleteContactMessage(id:any){
        return this.http.delete(this.apiUrl + "/contact/" + `${id}`);

    }

}

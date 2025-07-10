import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RegistrationService } from '../Services/registration.service';
import { Product } from '../models/product.interface';
import { ConfirmationDialogService, NotificationService } from 'nzrm-ng';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [FormsModule, CommonModule, NavbarComponent],
  standalone: true
})
export class ProductsComponent implements OnInit {

  products: Product[] | undefined;
  filteredProducts: Product[] | undefined;
  categories: string[] = ['All', 'Electronics', 'Fitness', 'Accessories', 'Home'];
  selectedCategory = 'All';
  searchTerm = '';
  isImgLoaded: boolean = false;
  isAdmin:boolean = true ;

  constructor(private router: Router, private registrationService: RegistrationService, private confirmDialogSerive: ConfirmationDialogService,private noti:NotificationService) { }

  ngOnInit(): void {
    this.registrationService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log("Got all products: ", data);
        this.products = data;
        this.filterProducts();
      },
      error: (error) => {
        console.error('Failed to fetch products:', error);
      }
    });
  }


  filterProducts(): void {
    this.filteredProducts = this.products?.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.productType === this.selectedCategory;
      const matchesSearch = product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.productDescription.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  onSearch(): void {
    this.filterProducts();
  }

  goToAddProducts(): void {
    this.router.navigate(['/addProducts']);
  }


  addToCart(product: any) {
    const cartProduct = {
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productType: product.productType,
      productImage: product.productImage,
      rating: product.rating
    };
    this.registrationService.addProductToTheCart(cartProduct).subscribe({
      next: () => {
        console.log('Product added to cart:', product.productName);
        this.noti.info("added"," Check The Cart , The Product Added  ")
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
      }
    });
  }

  deleteProduct(id: any): void {

    this.confirmDialogSerive.confirm({
      severity: 'warn',
      title: 'Delete confirmation',
      message: 'Are You Sure you want to delete product ? ',
      confirmText: 'Delete'
    }).subscribe(async result => {
      if (result.confirmed) {
        this.registrationService.deleteProductById(id).subscribe({
          next: () => {
            this.products = this.products?.filter(p => p.id !== id);
            this.filterProducts(); // refresh filtered list
            console.log('Product deleted successfully.');
          },
          error: (err) => {
            this.isAdmin = false;
            this.noti.error("Error","You are not have the permission to delete product just contact the admin on this email ***** to delete it ")
          }
        });
      } else {
        return
      }
    })


  } 


  goToCart(){
    this.router.navigate(['/cart']);
  }


  // getStars(rating: number): ('full' | 'half' | 'empty')[] {
  //   const fullStars = Math.floor(rating);
  //   const halfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  //   const totalStars = 5;

  //   const stars: ('full' | 'half' | 'empty')[] = [];

  //   for (let i = 0; i < fullStars; i++) stars.push('full');
  //   if (halfStar) stars.push('half');
  //   while (stars.length < totalStars) stars.push('empty');

  //   return stars;
  // }

    onLoad() {
    setTimeout(() => {
      this.isImgLoaded = true;
    }, 700);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RegistrationService } from '../Services/registration.service';
import { Product } from '../models/product.interface';
import { ButtonModule, ConfirmationDialogService, NotificationService } from 'nzrm-ng'; 

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
  categories: string[] = ['All','Electronics','Fitness' ,'Accessories' ,'Home' ];
  selectedCategory = 'All';
  searchTerm = '';

  constructor(private router: Router, private registrationService: RegistrationService, private confirmDialogSerive: ConfirmationDialogService) { }

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
            console.error('Failed to delete product:', err);
          }
        });
      } else {
        return
      }
    })


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


}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RegistrationService } from '../Services/registration.service';
import { Product } from '../models/product.interface';
import { ConfirmationDialogService, NotificationService } from 'nzrm-ng';
import { AdminService } from '../admin/admin.service';

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

  // Filter state
  categories: string[] = ['All', 'Electronics', 'Fitness', 'Accessories', 'Home'];
  categoryIcons: Record<string, string> = {
    'All': 'pi-th-large',
    'Electronics': 'pi-desktop',
    'Fitness': 'pi-heart',
    'Accessories': 'pi-tag',
    'Home': 'pi-home'
  };
  selectedCategory = 'All';
  searchTerm = '';
  minPrice = 0;
  maxPrice = 500;
  minRating = 0;
  sortBy = 'default';

  // UI state
  isImgLoaded = false;
  isAdmin = false;
  isLoading = true;
  viewMode: 'grid' | 'list' = 'grid';
  sidebarOpen = false;
  skeletons = Array(8).fill(0);
  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private confirmDialogSerive: ConfirmationDialogService,
    private noti: NotificationService,
    private adminService: AdminService
  ) {
    this.isAdmin = this.adminService.isAdminLoggedIn();
  }

  ngOnInit(): void {
    // Read search query from URL params
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
      }
    });

    this.registrationService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log("Got all products: ", data);
        this.products = data;
        this.isLoading = false;
        this.filterProducts();
      },
      error: (error) => {
        console.error('Failed to fetch products:', error);
        this.isLoading = false;
      }
    });
  }

  filterProducts(): void {
    let result = this.products?.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.productType === this.selectedCategory;
      const matchesSearch = product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.productDescription.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPrice = +product.productPrice >= this.minPrice && +product.productPrice <= this.maxPrice;
      const matchesRating = this.minRating === 0 || +product.rating >= this.minRating;
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    }) ?? [];

    // Sort
    switch (this.sortBy) {
      case 'price-asc':
        result = result.sort((a, b) => +a.productPrice - +b.productPrice);
        break;
      case 'price-desc':
        result = result.sort((a, b) => +b.productPrice - +a.productPrice);
        break;
      case 'rating-desc':
        result = result.sort((a, b) => +b.rating - +a.rating);
        break;
    }

    this.filteredProducts = result;
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  onSearch(): void {
    this.filterProducts();
  }

  clearAllFilters(): void {
    this.selectedCategory = 'All';
    this.searchTerm = '';
    this.minPrice = 0;
    this.maxPrice = 500;
    this.minRating = 0;
    this.sortBy = 'default';
    this.filterProducts();
  }

  getRatingCount(rating: string): number {
    // Simulated review count based on rating
    return Math.floor((+rating) * 47 + 12);
  }

  getOriginalPrice(price: string): string {
    return (Math.round(+price * 1.25)).toString();
  }

  goToAddProducts(): void {
    this.router.navigate(['/admin/dashboard/addProducts']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
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
        this.noti.info("Added to Cart", `${product.productName} was added to your cart.`);
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
      message: 'Are you sure you want to delete this product?',
      confirmText: 'Delete'
    }).subscribe(async result => {
      if (result.confirmed) {
        this.registrationService.deleteProductById(id).subscribe({
          next: () => {
            this.products = this.products?.filter(p => p.id !== id);
            this.filterProducts();
            this.noti.info("Deleted", "Product removed successfully.");
          },
          error: (err) => {
            this.isAdmin = false;
            this.noti.error("Error", "You don't have permission to delete this product.");
          }
        });
      }
    });
  }

  onLoad() {
    setTimeout(() => {
      this.isImgLoaded = true;
    }, 700);
  }
}

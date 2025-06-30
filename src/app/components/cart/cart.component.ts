import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../Services/registration.service';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NavbarComponent } from "../navbar/navbar.component";
import { ConfirmationDialogService } from 'nzrm-ng';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  totalPrice: number = 0;

  constructor(private registrationService: RegistrationService, private confirmDialogSerive: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

loadCartItems(): void {
  this.isLoading = true;
  this.errorMessage = '';
  this.registrationService.getAllProductsFromCart().subscribe({
    next: (items: any) => {
      this.cartItems = items;
      this.calculateTotal();
      console.log("the total price is : " , this.totalPrice )
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = 'Failed to load cart items. Please try again later.';
      this.isLoading = false;
      console.error('Error loading cart items:', err);
    }
  });
}

  removeItem(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.calculateTotal();
    // Here you would typically also call a service to remove from backend
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + Number(item.productPrice || 0), 0
    );
  }

  checkout(): void {
    // Implement checkout logic here
    console.log('Proceeding to checkout');
  }

  deleteProductFromCartById(id: any): void {
    console.log("Delete API triggered");

    this.confirmDialogSerive.confirm({
      severity: 'warn',
      title: 'Delete confirmation',
      message: 'Are you sure you want to delete this product?',
      confirmText: 'Delete'
    }).subscribe(result => {
      if (result.confirmed) {
        this.registrationService.deleteProductFromCartById(id).subscribe({
          next: () => {
            console.log('Product deleted successfully.');
            this.loadCartItems();
          },
          error: (err) => {
            console.error('Failed to delete product:', err);
          }
        });
      }
    });
  }


}
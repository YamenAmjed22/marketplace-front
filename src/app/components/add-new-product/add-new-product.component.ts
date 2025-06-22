import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../Services/registration.service';
import { NotificationService } from 'nzrm-ng';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddNewProductComponent {
  addProductForm: FormGroup;
  submitted = false;
  selectedImageFile: File | null = null;
  successMessage = '';
  errorMessage = '';

 categories = [
  { name: 'Home', id: 'f30bbfae-2764-4b47-a18e-414a5684cc52' },
  { name: 'Accessories', id: 'b364abdd-c5dc-4219-a5bf-a340d0063493' },
  { name: 'Fitness', id: 'aed67e16-7351-4bf9-8fb9-22b0def1ada4' },
  { name: 'Electronics', id: 'aeb17982-1e03-474c-9e1f-7fd39c9d0ec8' }
];



  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private _notificationService: NotificationService
  ) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', [Validators.required, Validators.minLength(8)]],
      productPrice: ['', Validators.required],
      status: ['', Validators.required],
      productCategory: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      rating: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    console.log("Got the input: ", input);

    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[input.files.length - 1];

      this._notificationService.success("Success","this product image uploaded ");

      console.log("Is image?:", this.selectedImageFile.type.startsWith('image') ? true : false);

      const imageFormData = new FormData();
      imageFormData.append('file', this.selectedImageFile);
      this.registrationService.uploadImage(imageFormData).subscribe({
        next: (imageUrl: string) => {
          console.log("GOT THE IMAGE URL: ", JSON.stringify(imageUrl));

        }, error: (error) => {
          console.error("Error uploading image: ", error);

        }
      })
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addProductForm.invalid || !this.selectedImageFile) {
      this.errorMessage = 'Please fill all fields and select an image.';
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('file', this.selectedImageFile);

    // First: upload image
    this.registrationService.uploadImage(imageFormData).subscribe({
      next: (imageUrl: string) => {
        // Second: use returned image URL to build full product
        const productData = {
          ...this.addProductForm.value,
          productImage: imageUrl
        };

        this.registrationService.addProduct(productData).subscribe({
          next: () => {
            this.successMessage = 'Product added successfully!';
            this._notificationService.success('Success', this.successMessage);
            this.addProductForm.reset();
            this.selectedImageFile = null;
            this.submitted = false;
          },
          error: (err: any) => {
            this.errorMessage = 'Error adding product: ' + err.message;
            this._notificationService.error('Error', this.errorMessage);
          }
        });
      },
      error: (err: any) => {
        this.errorMessage = 'Image upload failed: ' + err.message;
        this._notificationService.error('Error', this.errorMessage);
      }
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  } 

onCategoryChange(event: Event): void {
  const selectedName = (event.target as HTMLSelectElement).value;
  const selectedCategory = this.categories.find(cat => cat.name === selectedName);

  if (selectedCategory) {
    this.addProductForm.patchValue({
      categoryId: selectedCategory.id
    });
  }
}


}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../data-access/models/product.model';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss']
})
export class ProductDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  addToCart(): void {
    this.dialogRef.close('added-to-cart');
  }
}

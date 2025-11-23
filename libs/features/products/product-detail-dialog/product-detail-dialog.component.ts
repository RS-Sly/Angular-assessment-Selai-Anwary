import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '@data-access/models/product.model';
import { COMMON_IMPORTS, MATERIAL_CORE_IMPORTS, MATERIAL_DATA_IMPORTS } from '../shared-material.imports';

@Component({
  selector: 'app-product-detail-dialog',
  standalone: true,
  imports: [
    ...COMMON_IMPORTS,
    ...MATERIAL_CORE_IMPORTS,
    ...MATERIAL_DATA_IMPORTS
  ],
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

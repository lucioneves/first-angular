import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { MatButtonModule} from '@angular/material/button'
import { MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Delete file</h2>
  <mat-dialog-content>
    Tem certeza que quer deletar esse produto?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
  <button mat-button (click)="onNo()">Não</button>
  <button mat-raised-button color="primary" (click)="onYes()" cdkFocusInitial>Sim</button>
</mat-dialog-actions>

  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  
})
export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true)
  }
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  
  products: Product[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog)

  ngOnInit(){
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {    
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
     this.matDialog.open(ConfirmationDialogComponent)
     .afterClosed()
     .pipe(filter((answer) => answer))
     .subscribe((answer: boolean) => {
      this.productsService.delte(product.id).subscribe(() => {
        this.productsService.getAll().subscribe((products) => {
          this.products = products;
        });
      })
    })
  }
}

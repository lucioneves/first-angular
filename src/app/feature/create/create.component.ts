import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/products.interface';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormComponent
    
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(product: Product) { 
    this.productsService.post(product) 
    .subscribe(() => {
      this.matSnackBar.open('Poduto criado com sucesso!', 'ok');
      
      this.router.navigateByUrl('/')
    });
  }

}

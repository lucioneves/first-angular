import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/products.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router)
 
  product: Product = inject(ActivatedRoute).snapshot.data['product'];
  
  form = new FormGroup({
    title: new FormControl<string>(this.product.title, {
      nonNullable: true,
     validators: Validators.required,
    }),
  });

  onSubmit() { 
    this.productsService
    .put(this.product.id, {
      title: this.form.controls.title.value
    }) 
    .subscribe(() => {
      this.matSnackBar.open('Poduto editado com sucesso!', 'ok');
      
      this.router.navigateByUrl('/').catch(console.log)
    });
  }

}

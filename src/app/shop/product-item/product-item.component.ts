import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: IProduct;

  constructor(
    private basketService: BasketService,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit() {

  }

  addItemToBasket(){
    this._snackBar.open("Product added successfully","Close",{duration: 3000});
    this.basketService.addItemToBasket(this.product);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];
  deliveryChosen: boolean = false;

  constructor(private checkoutService: CheckoutService, private basketService: BasketService){}

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm.map(method => ({ ...method, checked: false }));
    }, error => {
      console.log(error);
    })
  }

  setShippingPrice(deliveryMethod: any){
    this.deliveryMethods.forEach((item: any) => {
      item.checked = false;
    })
    this.deliveryChosen = true;
    deliveryMethod.checked = !deliveryMethod.checked
    this.basketService.setShippingPrice(deliveryMethod);
  }
}

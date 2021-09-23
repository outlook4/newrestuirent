import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import{HttpClientModule} from'@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemComponent } from './orders/order-item/order-item.component';
import { OrderService } from './shared/order.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule ,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule ,
    ToastrModule.forRoot(),

  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { OrderItemComponent } from '../order-item/order-item.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItem } from 'src/app/shared/order-item.model';
import { Order } from 'src/app/shared/order.model';
 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customerList!:Customer[]; 
  isValid:boolean=true;
res!:number;
  constructor( public service:OrderService, private dailog:MatDialog ,
    private customerservice:CustomerService,
    private toastr:ToastrService,
    private raouter:Router,
    private currentRouter:ActivatedRoute) { }

  ngOnInit(): void {


    let orderID=this.currentRouter.snapshot.paramMap.get('id');
    if(orderID==null)

   this.resetForm();
   else
   {
     this.service.getOrderByID(parseInt(orderID)).then((res: { order: Order; orderDetails: OrderItem[]; })=>{
       this.service.formData=res.order;
       this.service.orderItem=res.orderDetails;
     });
   }

   this.customerservice.getCustomerList().then(res=> this.customerList=res as Customer[])
  }
  resetForm(form?:NgForm){
  if(form!=null)
  form.resetForm();
 
  this.service.formData ={
    OrderID  :0,
     OrderNo  :Math.floor(100000+Math.random()*900000).toString(),
    CustomerID  :0,
    PMethod   :'',
     GTotal:0,

  };
  this.service.orderItem=[];

}
 
AddorEditOrderItem(orderItemIndex: any,OrderID: any) {
  const dialogConfig =new MatDialogConfig();
  dialogConfig.autoFocus=true;
  dialogConfig.disableClose=true;
  dialogConfig.width="50%";
  dialogConfig.data={orderItemIndex,OrderID}
  this.dailog.open(OrderItemComponent,dialogConfig).afterClosed().subscribe(res=>{
    this.updateGrandTotal();
  });

}
onDeleteOrderItem(OrderItemID:number,i:number){
  this.service.orderItem.splice(i,1);
  this.updateGrandTotal();
  
}
updateGrandTotal(){
  this.service.formData.GTotal=this.service.orderItem.reduce((prev,curr)=>{
    return prev +curr.Total;
  },0);
  this.service.formData.GTotal=parseFloat(this.service.formData.GTotal.toFixed(2));
}
validateForm(){
  this.isValid=true;
  if(this.service.formData.CustomerID==0)
  this.isValid=false;
  else if(this.service.orderItem.length==0)
  this.isValid=false;
  return this.isValid;
}
onSubmit(form:NgForm){
  if(this.validateForm()){
   this.service.saveorUpdateOrder().subscribe(res=>{
     this.resetForm();
     this.toastr.success('Submitted Successfully','Restaurent App.');
     this.raouter.navigate(['/orders'])

   })  }
}
  }



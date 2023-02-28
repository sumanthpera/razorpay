import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare var Razorpay: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private httpClient: HttpClient) { }

  name = 'Sumanth'
  email = 'email@gmail.com'
  contact = '3543443435'

  amount: any
  currency: any

  createOrder() {
    this.httpClient.post('https://Razorpay.supersum4n.repl.co/create-order', { amount: this.amount, currency: this.currency }).subscribe({
      next: (res: any) => {
        this.pay(res.amount, res.currency, res.id)
      },
      error: (er) => alert(er.error)
    })
  }

  pay(amount: string, currency: string, order_id: string) {
    const options = {
      "key": "rzp_test_c5O496hGtgGHO3",
      "amount": amount,
      "currency": currency,
      "name": "Supersu & Co",
      "image": "https://example.com/your_logo",
      "order_id": order_id,
      "handler": (response: any) => alert(response.razorpay_order_id),
      "prefill": {
        "name": this.name,
        "email": this.email,
        "contact": this.contact
      },
      "theme": {
        "color": "#3399cc"
      }
    }
    const rzp = new Razorpay(options)
    rzp.on('payment.failed', (response: any) => {
      alert(response)
    })
    rzp.open()
  }

}

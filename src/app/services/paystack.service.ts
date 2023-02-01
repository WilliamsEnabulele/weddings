import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaystackService {

  constructor(private client: HttpClient) { }

  confirmPayment(reference: string){
    return this.client.get(`${environment.ps_verify_url +'/'+ reference}`)
  }
}

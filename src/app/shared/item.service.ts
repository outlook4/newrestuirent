import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }
  getItemList(){
    return this.http.get(environment.apiURL+'/Item').toPromise();
  }
}

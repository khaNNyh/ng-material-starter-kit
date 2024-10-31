import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private brandsUrl = 'https://636ce2d8ab4814f2b2712854.mockapi.io/car-brands';
  private comfortUrl =
    'https://636ce2d8ab4814f2b2712854.mockapi.io/car-comfort-features';
  private securityUrl =
    'https://636ce2d8ab4814f2b2712854.mockapi.io/car-security-features';
  private submitUrl = 'https://636ce2d8ab4814f2b2712854.mockapi.io/cars';

  constructor(private http: HttpClient) {}

  getCarBrands(): Observable<any> {
    return this.http.get<any>(this.brandsUrl);
  }

  getCarSecurity(): Observable<any> {
    return this.http.get<any>(this.securityUrl);
  }

  getCarComfort(): Observable<any> {
    return this.http.get<any>(this.comfortUrl);
  }

  postCarForm(formData: any) {
    return this.http.post<any>(this.submitUrl, formData);
  }
}

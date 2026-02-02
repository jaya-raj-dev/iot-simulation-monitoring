import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  //baseUrl = 'http://localhost:3000/api';
  baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getBedrooms() {
    return this.http.get<any[]>(`${this.baseUrl}/bedrooms`);
  }

  addBedroom(name: string) {
    return this.http.post(`${this.baseUrl}/bedrooms`, { name });
  }

  getSensors(bedroomId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/sensors/${bedroomId}`);
  }

  addSensor(sensor: any) {
    return this.http.post(`${this.baseUrl}/sensors`, sensor);
  }

   deleteBedroom(id: number) {
    return this.http.delete(`${this.baseUrl}/bedrooms/${id}`);
  }

  deleteSensor(id: number) {
  return this.http.delete(`${this.baseUrl}/sensors/${id}`);
}

}

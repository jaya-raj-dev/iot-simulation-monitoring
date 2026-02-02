import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sensor } from '../sensor/sensor';

@Component({
  selector: 'app-bedroom',
  imports: [    CommonModule,
    FormsModule,
    Sensor],
  templateUrl: './bedroom.html',
  styleUrl: './bedroom.css',
})
export class Bedroom implements OnInit {
   bedrooms: any[] = [];
  roomName = '';
  selectedBedroom: any = null;

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadBedrooms();
  }

  loadBedrooms() {
    this.api.getBedrooms().subscribe(data => {
      this.bedrooms = data;
    });
  }

  addBedroom() {
    if (!this.roomName) return;

    this.api.addBedroom(this.roomName).subscribe(() => {
      this.roomName = '';
      this.loadBedrooms();
    });
  }

  selectBedroom(bedroom: any) {
    this.selectedBedroom = bedroom;
  }

  deleteBedroom(id: number) {
    this.api.deleteBedroom(id).subscribe(() => {
      this.loadBedrooms();
      this.selectedBedroom = null;
    });
  }

}

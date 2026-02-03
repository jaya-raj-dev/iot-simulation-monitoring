import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sensor } from '../sensor/sensor';

@Component({
  selector: 'app-bedroom',
  imports: [ CommonModule,FormsModule,Sensor],
  templateUrl: './bedroom.html',
  styleUrl: './bedroom.css',
})
export class Bedroom implements OnInit {
   bedrooms: any[] = [];
   roomName = '';
   selectedBedroom: any = null;
   editingBedroom: any = null;
   editRoomName: string = '';

   bedroomOptions: string[] = [
    'Master Bedroom',
    'Guest Bedroom',
  
  ];
  selectedRoomName: string = '';

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
    if (!this.selectedRoomName) return;
    if (this.bedrooms.length >= 2) {
      alert('Only 2 bedrooms allowed as per assignment scenario');
      return;
    }

    const exists = this.bedrooms.some(
      b => b.name === this.selectedRoomName
    );

    if (exists) {
      alert('Bedroom already added');
      return;
    }

    this.api.addBedroom(this.selectedRoomName).subscribe(() => {
      this.selectedRoomName = '';
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

     isBedroomAdded(roomName: string): boolean {
    return this.bedrooms.some(b => b.name === roomName);
  }
  
startEdit(bedroom: any) {
  this.editingBedroom = bedroom;
  this.editRoomName = bedroom.name;
}

cancelEdit() {
  this.editingBedroom = null;
  this.editRoomName = '';
}

updateBedroom() {
  if (!this.editRoomName) return;

  // prevent duplicate
  const exists = this.bedrooms.some(
    b => b.name === this.editRoomName && b.id !== this.editingBedroom.id
  );

  if (exists) {
    alert('Bedroom already exists');
    return;
  }

  this.api.updateBedroom(this.editingBedroom.id, this.editRoomName)
    .subscribe(() => {
      this.cancelEdit();
      this.loadBedrooms();
    });
}


}

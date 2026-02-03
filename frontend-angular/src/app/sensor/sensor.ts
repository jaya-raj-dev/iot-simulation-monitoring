import { Component, Input, OnChanges } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor',
  imports: [CommonModule,
    FormsModule],
  templateUrl: './sensor.html',
  styleUrl: './sensor.css',
})
export class Sensor implements OnChanges {

  @Input() bedroom: any;

  sensors: any[] = [];
  sensorName = '';
  sensorType = 'temperature';  
  editingSensor: any = null;
  editSensorName = '';
  editSensorType = 'temperature';
  

  constructor(private api: Api) {}

  ngOnChanges() {
    if (this.bedroom) {
      this.loadSensors();
    }
  }

  loadSensors() {
    this.api.getSensors(this.bedroom.id).subscribe(data => {
      this.sensors = data;
    });
  }

  addSensor() {
    if (!this.sensorName) return;

    const payload = {
      bedroom_id: this.bedroom.id,
      sensor_name: this.sensorName,
      sensor_type: this.sensorType
    };

    this.api.addSensor(payload).subscribe(() => {
      this.sensorName = '';
      this.loadSensors();
    });
  }

   deleteSensor(id: number) {
    this.api.deleteSensor(id).subscribe(() => {
      this.loadSensors();
    this.sensors = this.sensors.filter(s => s.id !== id);
    });
  }
  startEdit(sensor: any) {
  this.editingSensor = sensor;
  this.editSensorName = sensor.sensor_name;
  this.editSensorType = sensor.sensor_type;
}

cancelEdit() {
  this.editingSensor = null;
  this.editSensorName = '';
  this.editSensorType = 'temperature';
}

updateSensor() {
  if (!this.editSensorName || !this.editSensorType) return;

  const payload = {
    sensor_name: this.editSensorName,
    sensor_type: this.editSensorType
  };

  this.api.updateSensor(this.editingSensor.id, payload)
    .subscribe(() => {
      this.cancelEdit();
      this.loadSensors();
    });
}

}

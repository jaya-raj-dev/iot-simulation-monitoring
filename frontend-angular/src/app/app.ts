import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bedroom } from './bedroom/bedroom';

@Component({
  selector: 'app-root',
  imports: [Bedroom],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-angular');
}

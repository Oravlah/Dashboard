import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export default class FooterComponent {
  isDarkMode = true; // Cambia esto según cómo quieras manejar el modo oscuro

}

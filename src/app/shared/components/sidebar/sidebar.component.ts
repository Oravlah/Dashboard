import { Component } from '@angular/core';
import { sideBarData } from '../../interfaces/sideBarData';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sideBarData = sideBarData;
  private openDropdowns: { [key: string]: boolean } = {};
  isDarkMode = true; // Cambia esto según cómo quieras manejar el modo oscuro

  toggleDropdown(label: string): void {
    this.openDropdowns[label] = !this.openDropdowns[label];
  }

  isDropdownOpen(label: string): boolean {
    return this.openDropdowns[label] || false;
  }
}


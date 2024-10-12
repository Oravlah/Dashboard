import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BodyComponent } from '../components/body/body.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import FooterComponent from '../components/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [BodyComponent, NavbarComponent, BodyComponent, SidebarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}

import { Component } from '@angular/core';
import { CardParkinglotsComponent } from '../../shared/components/card-parkinglots/card-parkinglots.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardParkinglotsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

}

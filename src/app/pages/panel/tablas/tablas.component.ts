import { Component, OnInit } from '@angular/core';
import { ParkinglotsService } from '../../../shared/services/parkinglots.service';
import { ParkingLot } from '../../../shared/models/Parkinglot.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tablas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tablas.component.html',
  styleUrl: './tablas.component.css'
})
export default class TablasComponent implements OnInit{

  constructor(private parkinglotsService: ParkinglotsService) { }

  parkingLots: ParkingLot[] = [];

  ngOnInit(): void {
    this.parkinglotsService.getParkingLots().subscribe(res => {
      this.parkingLots = res;
    });
  }

}

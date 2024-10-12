import { Component, OnInit } from '@angular/core';
import { ParkinglotsService } from '../../../../shared/services/parkinglots.service';
import { ParkingLot } from '../../../../shared/models/Parkinglot.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export default class EditComponent implements OnInit{

  _id!: any;

  constructor(private parkinglotsService: ParkinglotsService, private activatedRoute: ActivatedRoute) { }

  parkingLots!: ParkingLot;

  ngOnInit(): void {
  this._id = this.activatedRoute.snapshot.paramMap.get('id');
   this.parkinglotsService.getParkingLotById(this._id).subscribe(res => {
     this.parkingLots = {
      _id: res._id,
      status: res.status,
      email: res.email,
      parkingNumber: res.parkingNumber,
      type: res.type,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt

     };
     console.log(this.parkingLots);
   });
  }
}

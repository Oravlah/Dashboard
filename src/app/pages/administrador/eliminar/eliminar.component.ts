import { Component, OnInit } from '@angular/core';
import { ParkinglotsService } from '../../../shared/services/parkinglots.service';
import { ParkingLot } from '../../../shared/models/Parkinglot.model';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export default class EliminarComponent implements OnInit {

  parkingLots: ParkingLot[] = [];

  constructor(private parkinglotsService: ParkinglotsService) {}

  ngOnInit(): void {
    this.parkinglotsService.getParkingLots().subscribe(res => {
      this.parkingLots = res;
    });
  }

  deleteParkingLot(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción eliminará permanentemente el estacionamiento!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.parkinglotsService.deleteParkingLot(id).subscribe(
          () => {
            Swal.fire('¡Eliminado!', 'El estacionamiento ha sido eliminado.', 'success');
            // Actualizar la lista de estacionamientos después de la eliminación
            this.parkinglotsService.loadParkingLots();
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al eliminar el estacionamiento.', 'error');
          }
        );
      }
    });
  }
}

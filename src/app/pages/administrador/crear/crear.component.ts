import { Component } from '@angular/core';
import { ParkinglotsService } from '../../../shared/services/parkinglots.service';
import { ParkingLot } from '../../../shared/models/Parkinglot.model';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export default class CrearComponent {

  newParkingLot: Partial<ParkingLot> = {
    parkingNumber: 0,
    type: 'estudiante',
    status: 'disponible'
  };

  constructor(private parkinglotsService: ParkinglotsService) {}

  createParkingLot(): void {
    if (!this.newParkingLot.parkingNumber || !this.newParkingLot.type) {
      Swal.fire('Error', 'Debe completar todos los campos', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres crear este estacionamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.parkinglotsService.createParkingLot(this.newParkingLot as ParkingLot).subscribe(
          (res) => {
            Swal.fire('¡Creado!', 'El estacionamiento ha sido creado correctamente.', 'success');
            this.newParkingLot = {
              parkingNumber: 0,
              type: 'estudiante',
              status: 'disponible'
            };
          },
          (error) => {
            Swal.fire('Error', 'Hubo un problema al crear el estacionamiento.', 'error');
          }
        );
      }
    });
  }
}

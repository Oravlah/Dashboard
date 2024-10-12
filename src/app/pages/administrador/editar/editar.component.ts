import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParkinglotsService } from '../../../shared/services/parkinglots.service';
import { ParkingLot } from '../../../shared/models/Parkinglot.model';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export default class EditarComponent implements OnInit {

  parkingLots: ParkingLot[] = [];
  statusOptions = ['disponible', 'ocupado', 'reservado'];
  typeOptions = ['estudiante', 'administrativo', 'docente', 'preferencial'];

  constructor(private parkinglotsService: ParkinglotsService) { }

  ngOnInit(): void {
    this.parkinglotsService.getParkingLots().subscribe(res => {
      this.parkingLots = res;
    });
  }

  editParkingLot(parkingLot: ParkingLot): void {
    Swal.fire({
      title: 'Editar estacionamiento',
      html: `
        <input id="parkingNumber" class="swal2-input" placeholder="Número" value="${parkingLot.parkingNumber}">
        <input id="email" class="swal2-input" placeholder="Email" value="${parkingLot.email || ''}">
        <select id="type" class="swal2-select">
          ${this.typeOptions.map(option => `
            <option value="${option}" ${option === parkingLot.type ? 'selected' : ''}>${option}</option>
          `).join('')}
        </select>
        <select id="status" class="swal2-select">
          ${this.statusOptions.map(option => `
            <option value="${option}" ${option === parkingLot.status ? 'selected' : ''}>${option}</option>
          `).join('')}
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const parkingNumber = (Swal.getPopup()?.querySelector('#parkingNumber') as HTMLInputElement).value;
        const email = (Swal.getPopup()?.querySelector('#email') as HTMLInputElement).value;
        const type = (Swal.getPopup()?.querySelector('#type') as HTMLSelectElement).value;
        const state = (Swal.getPopup()?.querySelector('#status') as HTMLSelectElement).value;

        if (!parkingNumber || !type || !state) {
          Swal.showValidationMessage('Por favor, ingresa todos los campos');
          return;
        }

        if (state === 'Reservado' && !email) {
          Swal.showValidationMessage('Debes ingresar un correo electrónico para el estado reservado');
          return;
        }

        return {
          parkingNumber,
          email,
          type,
          state
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedParkingLot: ParkingLot = {
          ...parkingLot,
          parkingNumber: +result.value.parkingNumber,
          email: result.value.email,
          type: result.value.type,
          status: result.value.state
        };
        this.updateParkingLot(updatedParkingLot);
      }
    });
  }

  private updateParkingLot(parkingLot: ParkingLot): void {
    this.parkinglotsService.updateParkingLot(parkingLot).subscribe(
      () => {
        Swal.fire(
          '¡Actualizado!',
          'El estacionamiento ha sido actualizado.',
          'success'
        );
      },
      (error) => {
        Swal.fire(
          'Error',
          'Hubo un problema al actualizar el estacionamiento.',
          'error'
        );
      }
    );
  }
}

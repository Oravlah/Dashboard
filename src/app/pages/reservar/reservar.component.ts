import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParkinglotsService } from '../../shared/services/parkinglots.service';
import { ParkingLot } from '../../shared/models/Parkinglot.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export default class ReservarComponent implements OnInit {

  parkingLots: ParkingLot[] = [];
  type = 'administrativ';
  email!: string;

  constructor(private parkinglotsService: ParkinglotsService) {
  }

  ngOnInit(): void {
    this.parkinglotsService.getParkingLots().subscribe(res => {
      this.parkingLots = res;
    });

  }

  onParkingLotStateChange(event: Event, parkingLot: ParkingLot): void {
    const selectElement = event.target as HTMLSelectElement;
    const newState = selectElement.value;

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres cambiar el estado a ${newState}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Manejo para el estado "reservado"
        if (newState === 'reservado') {
          return this.promptForEmail();
        }
        // Manejo para el estado "ocupado"
        else if (newState === 'ocupado') {
          return this.promptForEmail('ocupado');
        } else {
          return Promise.resolve(); // Para otros estados
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (newState === 'reservado' && result.value) {
          parkingLot.email = result.value; // Asignar el email ingresado para "reservado"
        }
        else if (newState === 'ocupado' && result.value) {
          parkingLot.email = result.value; // Asignar el email ingresado para "ocupado"
        }
        else if (newState === 'disponible') {
          delete parkingLot.email; // Eliminar el email si el estado cambia a "disponible"
        }
        parkingLot.status = newState; // Actualizar el estado del estacionamiento
        this.updateParkingLotState(parkingLot);
      } else {
        // Revertir el cambio si el usuario cancela
        selectElement.value = parkingLot.status;
      }
    }).catch((error) => {
      if (error.message === 'EmailInputCancelled') {
        selectElement.value = parkingLot.status; // Revertir si se cancela el ingreso de email
      }
    });
  }



  private promptForEmail(state: string = 'reservado'): Promise<any> {
    // Preguntar si el usuario quiere ingresar un email para el estado específico
    return Swal.fire({
      title: `¿Deseas ingresar un correo electrónico para el estado "${state}"?`,
      text: 'Puedes optar por ingresar el correo del usuario o dejarlo vacío.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ingresar correo',
      cancelButtonText: 'No ingresar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si elige ingresar correo, mostrar el input de email
        return Swal.fire({
          title: 'Ingresa el correo electrónico del usuario:',
          input: 'email',
          inputPlaceholder: 'Email del usuario',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          preConfirm: (email) => {
            if (!email) {
              Swal.showValidationMessage('Debes ingresar un correo electrónico');
              return null;
            } else if (!this.isValidEmail(email)) {
              Swal.showValidationMessage('Debes ingresar un correo electrónico válido');
              return null;
            }
            return email;
          }
        }).then((emailResult) => {
          if (emailResult.isConfirmed) {
            return emailResult.value;
          } else {
            throw new Error('EmailInputCancelled');
          }
        });
      } else {
        return null; // Si no ingresa correo, continuar sin modificar el email
      }
    });
  }

  private updateParkingLotState(parkingLot: ParkingLot): void {
    this.parkinglotsService.updateParkingLot(parkingLot).subscribe(
      (res) => {
        Swal.fire(
          '¡Actualizado!',
          'El estado del estacionamiento ha sido actualizado.',
          'success'
        );
      },
      (error) => {
        Swal.fire(
          'Error',
          'Hubo un problema al actualizar el estado.',
          'error'
        );
      }
    );
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}

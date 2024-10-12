import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/Guest.model';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User.model';
import { QRCodeModule } from 'angularx-qrcode';

import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-guest-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, QRCodeModule],
  templateUrl: './guest-register.component.html',
  styleUrl: './guest-register.component.css'
})
export default class GuestRegisterComponent {
  guest!: Guest
  formulario!: FormGroup;
  email!: string;
  user!: User;
  qrImage!: string;
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  constructor(private guestService: GuestService, private fb: FormBuilder,
    private router: Router,  private usersService: UsersService){
    this.formulario = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.guestService.addGuest(this.formulario.value).subscribe({
        next: (response) => {
          console.log('Datos enviados correctamente:', response)
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
        },
        complete: () => {
          this.email = this.formulario.value.email;
          console.log('Email:', this.email);
          this.generateQRCode();
          this.formulario.reset();
        }
      })
    }

  }
  generateQRCode() {
    this.usersService.getUserByEmail(this.email).subscribe({
      next: (response) => {
        this.user = response;
        console.log('Usuario encontrado:', this.user);
        this.myAngularxQrCode = this.user._id + '//' + this.user.email;
        console.log('Código QR:', this.myAngularxQrCode);
      },
      error: (error) => {
        console.error('Error al buscar el usuario:', error);
      }
    })
  }

  onDownloadQRCode(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}

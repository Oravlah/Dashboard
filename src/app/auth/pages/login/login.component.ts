import { Component, OnInit, inject } from '@angular/core';
import FooterComponent from '../../../shared/components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, FormsModule, NgClass, MatSelectModule,MatInputModule, MatFormFieldModule, MatDatepickerModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  loginForm: FormGroup;
  toastr=inject(ToastrService)
  error:any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: { token: string }) => {
          this.toastr.success('Login successful');
          this.router.navigateByUrl('/home');
        },
        (error: HttpErrorResponse) => {
          if (error.error && error.error.message) {
            this.error = error.error.message;
          } else {
            this.error = 'An unexpected error occurred';
          }
          this.toastr.error(this.error);
        }
      );
    }
  }
}

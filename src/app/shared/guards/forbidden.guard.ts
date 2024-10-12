import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const forbiddenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Aquí deberías obtener la lógica real para verificar si el usuario tiene permiso
  const permitted = false; // Cambia esto según tu lógica de permisos

  if (permitted) {
    return true;
  } else {
    router.navigate(['/forbidden']);
    return false;
  }
};

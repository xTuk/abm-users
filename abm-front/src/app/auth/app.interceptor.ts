import {
  HttpErrorResponse,
  type HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        //ACA SE PUEDE VALIDAR Y ENVIAR MENSAJE CUSTOM POR CADA CODE ERROR
        const message =
          err?.error?.message || 'Ocurrio un error, intentelo nuevamente';
        snackbar.open(message, 'Cerrar', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
      return throwError(() => err);
    })
  );
};

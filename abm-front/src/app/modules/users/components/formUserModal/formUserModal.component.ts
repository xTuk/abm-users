import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/users.interfaces';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';

@Component({
  selector: 'form-user-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    SpinnerComponent,
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideNativeDateAdapter(),
  ],
  templateUrl: './formUserModal.component.html',
  styleUrl: './formUserModal.component.scss',
})
export class FormUserModalComponent {
  private fb = inject(FormBuilder);
  formUser: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.min(3)]],
    lastname: ['', [Validators.required, Validators.min(3)]],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', Validators.required],
    cuit: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    domicile: ['', Validators.required],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
  });

  id!: number;
  loading: boolean = false;

  private userService = inject(UsersService);
  private datePipe = inject(DatePipe);
  private snakbar = inject(MatSnackBar);
  constructor(
    public dialogRef: MatDialogRef<FormUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    if (this.data) {
      const { id, birthdate, cuit, domicile, email, lastname, name, phone } =
        this.data;
      this.id = id;
      this.formUser.setValue({
        birthdate,
        cuit,
        domicile,
        email,
        lastname,
        name,
        phone,
      });
    }
  }

  onSubmit() {
    if (this.formUser.invalid) return;
    const birthdate = this.datePipe.transform(
      this.formUser.value.birthdate,
      'YYYY-MM-dd'
    );
    const user: User = { ...this.formUser.value, birthdate };
    this.id ? this.putEditUser(this.id, user) : this.postCreateUser(user);
  }

  postCreateUser(user: User) {
    this.loading = true;
    this.userService.createUser(user).subscribe({
      next: (res) => {
        this.loading = false;
        this.snakbar.open(res.msg, 'Cerrar');
        this.dialogRef.close({ ...user, id: res.useid });
      },
      error: () => (this.loading = false),
    });
  }

  putEditUser(id: number, user: User) {
    this.loading = true;
    this.userService.editUser(id, user).subscribe({
      next: (msg) => {
        this.loading = false;
        this.snakbar.open(msg, 'Cerrar');
        this.dialogRef.close({ ...user, id });
      },
      error: () => (this.loading = false),
    });
  }
}

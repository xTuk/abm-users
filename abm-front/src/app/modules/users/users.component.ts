import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from './services/users.service';
import { User } from './interfaces/users.interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormUserModalComponent } from './components/formUserModal/formUserModal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'users',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    DatePipe,
    MatIconModule,
    FormsModule,
    SpinnerComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'name',
    'lastname',
    'email',
    'birthdate',
    'cuit',
    'domicile',
    'phone',
    'actions',
  ];

  dataUsers = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: User[] = [];
  loading: boolean = false;
  inputSearch: string = '';
  private usersService = inject(UsersService);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit() {
    this.dataUsers.paginator = this.paginator;
  }

  getAll() {
    this.getAllUsers();
  }

  createUser() {
    this.dialog
      .open(FormUserModalComponent)
      .afterClosed()
      .subscribe({
        next: (user) => {
          if (!user) return;
          this.users.push(user);
        },
      });
  }

  editUser(user: User) {
    this.dialog
      .open(FormUserModalComponent, { data: user })
      .afterClosed()
      .subscribe({
        next: (newUser) => {
          if (!newUser) return;
          const user = this.users.find((us) => us.id === newUser.id);
          const fila = this.dataUsers.data.find(
            (fila) => fila.id === newUser.id
          );
          if (!fila || !user) return;

          //Se hace una asignacion por referencia
          Object.assign(fila, newUser);
          Object.assign(user, newUser);
        },
      });
  }

  search() {
    this.getUsersBy(this.inputSearch);
  }

  private getAllUsers() {
    this.loading = true;
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.dataUsers = new MatTableDataSource<User>(users);
        this.loading = false;
      },
      error: (err) => (this.loading = false),
    });
  }

  private getUsersBy(text: string) {
    this.loading = true;
    this.usersService.getUsersByName(text).subscribe({
      next: (users) => {
        this.users = users;
        this.dataUsers = new MatTableDataSource<User>(users);
        this.loading = false;
      },
      error: (err) => (this.loading = false),
    });
  }
}

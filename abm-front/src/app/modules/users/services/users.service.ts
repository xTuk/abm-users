import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { env } from 'process';
import { Observable, take } from 'rxjs';
import { GenericResponse } from '../../../interfaces/interfaces';
import { User, PostUser } from '../interfaces/users.interfaces';
import { enviroments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  createUser(user: PostUser): Observable<{ msg: string; useid: number }> {
    return new Observable((subscriber) => {
      this.http
        .post<GenericResponse<{ msg: string; useid: number }>>(
          `${enviroments.baseUrl}/users`,
          user
        )
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            subscriber.next({ msg: res.data.msg, useid: res.data.useid });
          },
          error: (err) => {
            console.error(err);
            subscriber.error(err);
          },
        });
    });
  }

  editUser(id: number, user: PostUser): Observable<string> {
    return new Observable((subscriber) => {
      this.http
        .put<GenericResponse<{ msg: string }>>(
          `${enviroments.baseUrl}/users/${id}`,
          user
        )
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            subscriber.next(res.data.msg);
          },
          error: (err) => {
            console.error(err);
            subscriber.error(err);
          },
        });
    });
  }

  getAll(): Observable<User[]> {
    return new Observable((subscriber) => {
      this.http
        .get<GenericResponse<{ users: User[] }>>(
          `${enviroments.baseUrl}/users/all`
        )
        .subscribe({
          next: (res) => {
            subscriber.next(res.data.users || []);
          },
          error: (err) => {
            console.error(err);
            subscriber.error(err);
          },
        });
    });
  }

  getUser(id: string): Observable<User> {
    return new Observable((subscriber) => {
      this.http
        .get<GenericResponse<{ user: User }>>(
          `${enviroments.baseUrl}/users/${id}`
        )
        .subscribe({
          next: (res) => {
            subscriber.next(res.data.user);
          },
          error: (err) => {
            console.error(err);
            subscriber.error(err);
          },
        });
    });
  }

  getUsersByName(text: string): Observable<User[]> {
    return new Observable((subscriber) => {
      this.http
        .get<GenericResponse<{ users: User[] }>>(
          `${enviroments.baseUrl}/users/search/${text}`
        )
        .subscribe({
          next: (res) => {
            subscriber.next(res.data.users || []);
          },
          error: (err) => {
            console.error(err);
            subscriber.error(err);
          },
        });
    });
  }
}

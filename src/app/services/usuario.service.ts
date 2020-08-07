import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http
      .get(`${this.url}/users?per_page=6`)
      .pipe(map((_data) => _data['data']));
  }

  getUser(idUsr: string) {
    this.http.get(`${this.url}/users/${idUsr}`);
  }
}

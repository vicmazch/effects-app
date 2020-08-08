import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';

import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuarios } from 'src/app/store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [],
})
export class ListaComponent implements OnInit, OnDestroy {
  usuarios: Usuario[];
  usuariosSubscriptions: Subscription;
  loading: boolean;
  error: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(cargarUsuarios());

    this.usuariosSubscriptions = this.store
      .select('usuarios')
      .subscribe(({ users, loading, error }) => {
        this.usuarios = users;
        this.loading = loading;
        this.error = error;
      });
  }

  ngOnDestroy() {
    this.usuariosSubscriptions.unsubscribe();
  }
}

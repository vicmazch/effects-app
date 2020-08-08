import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

import { cargarUsuario } from 'src/app/store/actions';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit, OnDestroy {
  usuario: Usuario;
  usuarioSubscription: Subscription;
  paramsSubscription: Subscription;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.paramsSubscription = this.router.params.subscribe(({ id }) => {
      this.store.dispatch(cargarUsuario({ id: id }));
      console.log('::: ID_USR: ', id);
    });

    this.usuarioSubscription = this.store
      .select('usuario')
      .subscribe(({ user }) => {
        this.usuario = user;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.usuarioSubscription.unsubscribe();
  }
}

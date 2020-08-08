import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';

import * as usuariosActions from '../actions';

import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuario),
      tap((data) => console.log(':::Effect tap ', data)),
      mergeMap((action) =>
        this.usuarioService.getUserById(action.id).pipe(
          map((usuario) =>
            usuariosActions.cargarUsuarioSuccess({ usuario: usuario })
          ),
          catchError((err) =>
            of(usuariosActions.cargarUsuarioError({ payload: err }))
          ),
          tap((data) => console.log(':::GetUusario WS Effect', data))
        )
      )
    )
  );
}

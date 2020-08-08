import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';

import * as usuariosActions from '../actions';

import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      tap((data) => console.log(':::Effect tap ', data)),
      mergeMap(() =>
        this.usuarioService.getUsers().pipe(
          map((usuarios) =>
            usuariosActions.cargarUsuariosSuccess({ usuarios: usuarios })
          ),
          catchError((err) =>
            of(usuariosActions.cargarUsuariosError({ payload: err }))
          ),
          tap((data) => console.log(':::GetUusarios WS Effect', data))
        )
      )
    )
  );
}

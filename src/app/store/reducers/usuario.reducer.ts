import { createReducer, on } from '@ngrx/store';
import {
  cargarUsuario,
  cargarUsuarioError,
  cargarUsuarioSuccess,
} from '../actions';
import { Usuario } from 'src/app/models/usuario.model';

export interface UsuarioState {
  user: Usuario;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const UsuarioInitialState: UsuarioState = {
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _usuarioReducer = createReducer(
  UsuarioInitialState,

  on(cargarUsuario, (state, { id }) => ({ ...state, loading: true })),

  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...usuario },
  })),

  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  }))
);

export function usuarioReducer(state, action) {
  return _usuarioReducer(state, action);
}

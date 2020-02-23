import { SERVER_URL,COMBATE,VICTORIA } from '../Constantes';
import { hacerRequest } from './utilidades';

export const dameEnemigoAleatorio = (idUsuario) => {
    return hacerRequest({idUsuario},SERVER_URL+COMBATE);
}
export const obtenerRecompensas = (idUsuario, idMision, esEvento) => {
    return hacerRequest({idMision, idUsuario, esEvento},SERVER_URL+VICTORIA);
}

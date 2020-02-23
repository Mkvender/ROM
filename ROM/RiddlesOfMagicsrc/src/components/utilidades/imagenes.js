import noImage from "../../img/noimage.png";

import ladron from "../../img/ladron.png";
import mago from "../../img/mago.png";
import guerrero from "../../img/guerrero.png";

import armaGuerrero1 from "../../img/armaGuerrero1.png";
import armaGuerrero2 from "../../img/armaGuerrero2.png";
import armaGuerrero3 from "../../img/armaGuerrero3.png";
import armaGuerrero4 from "../../img/armaGuerrero4.png";
import armaGuerrero5 from "../../img/armaGuerrero5.png";

import armaLadron1 from "../../img/armaLadron1.png";
import armaLadron2 from "../../img/armaLadron2.png";
import armaLadron3 from "../../img/armaLadron3.png";
import armaLadron4 from "../../img/armaLadron4.png";
import armaLadron5 from "../../img/armaLadron5.png";

import armaMago1 from "../../img/armaMago1.png";
import armaMago2 from "../../img/armaMago2.png";
import armaMago3 from "../../img/armaMago3.png";
import armaMago4 from "../../img/armaMago4.png";
import armaMago5 from "../../img/armaMago5.png";

import accesorio1 from "../../img/accesorio1.png";
import accesorio2 from "../../img/accesorio2.png";
import accesorio3 from "../../img/accesorio3.png";
import accesorio4 from "../../img/accesorio4.png";

import botas1 from "../../img/botas1.png";
import botas2 from "../../img/botas2.png";
import botas3 from "../../img/botas3.png";

import cabeza1 from "../../img/cabeza1.png";
import cabeza2 from "../../img/cabeza2.png";

import manos1 from "../../img/manos1.png";
import manos2 from "../../img/manos2.png";
import manos3 from "../../img/manos3.png";

import pecho1 from "../../img/pecho1.png";
import pecho2 from "../../img/pecho2.png";
import pecho3 from "../../img/pecho3.png";

import mascota1 from "../../img/mascota1.png";
import mascota2 from "../../img/mascota2.png";
import mascota3 from "../../img/mascota3.png";
import mascota4 from "../../img/mascota4.png";

import enemigo1 from '../../img/enemigo1.png';
import enemigo2 from '../../img/enemigo2.png';
import enemigo3 from '../../img/enemigo3.png';

import hector from '../../img/Hector.PNG';
import jaime from '../../img/Jaime.PNG';
import jota from '../../img/Jota.PNG';

const IMAGENES_OBJETOS = [
    { img: armaGuerrero1, nombre: 'armaGuerrero1' },
    { img: armaGuerrero2, nombre: 'armaGuerrero2' },
    { img: armaGuerrero3, nombre: 'armaGuerrero3' },
    { img: armaGuerrero4, nombre: 'armaGuerrero4' },
    { img: armaGuerrero5, nombre: 'armaGuerrero5' },
    { img: armaLadron1, nombre: 'armaLadron1' },
    { img: armaLadron2, nombre: 'armaLadron2' },
    { img: armaLadron3, nombre: 'armaLadron3' },
    { img: armaLadron4, nombre: 'armaLadron4' },
    { img: armaLadron5, nombre: 'armaLadron5' },
    { img: armaMago1, nombre: 'armaMago1' },
    { img: armaMago2, nombre: 'armaMago2' },
    { img: armaMago3, nombre: 'armaMago3' },
    { img: armaMago4, nombre: 'armaMago4' },
    { img: armaMago5, nombre: 'armaMago5' },
    { img: accesorio1, nombre: 'accesorio1' },
    { img: accesorio2, nombre: 'accesorio2' },
    { img: accesorio3, nombre: 'accesorio3' },
    { img: accesorio4, nombre: 'accesorio4' },
    { img: botas1, nombre: 'botas1' },
    { img: botas2, nombre: 'botas2' },
    { img: botas3, nombre: 'botas3' },
    { img: cabeza1, nombre: 'cabeza1' },
    { img: cabeza2, nombre: 'cabeza2' },
    { img: manos1, nombre: 'manos1' },
    { img: manos2, nombre: 'manos2' },
    { img: manos3, nombre: 'manos3' },
    { img: pecho1, nombre: 'pecho1' },
    { img: pecho2, nombre: 'pecho2' },
    { img: pecho3, nombre: 'pecho3' },
    { img: mascota1, nombre: 'mascota1' },
    { img: mascota2, nombre: 'mascota2' },
    { img: mascota3, nombre: 'mascota3' },
    { img: mascota4, nombre: 'mascota4' },
];

const IMAGENES_PERSONAS = [
    { img: hector, nombre: 'hector' },
    { img: jaime, nombre: 'jaime' },
    { img: jota, nombre: 'jota' },
];

const IMAGENES_CLASES = [
    { img: mago, nombre: 'mago' },
    { img: guerrero, nombre: 'guerrero' },
    { img: ladron, nombre: 'ladron' },
];

const IMAGENES_ENEMIGOS = [
    { img: enemigo1, nombre: 'caballero' },
    { img: enemigo2, nombre: 'goblin' },
    { img: enemigo3, nombre: 'esqueleto' },
];

const DEFAULT = { img: noImage, nombre: '' };

const buscaImagen = (listaImagenes, nombre) => {
    let imagenDefault = DEFAULT;
    let imagenBuscada = null;

    if (nombre) {
        imagenBuscada = listaImagenes.find(
            image =>
                image.nombre.toUpperCase() === nombre.toUpperCase() && image.img
        );
    }

    return imagenBuscada ? imagenBuscada.img : imagenDefault.img;
};

export const dameImagenObjetos = nombre => buscaImagen(IMAGENES_OBJETOS, nombre);
export const dameImagenPersona = nombre => buscaImagen(IMAGENES_PERSONAS, nombre);
export const dameImagenClase = nombre => buscaImagen(IMAGENES_CLASES, nombre);
export const dameImagenEnemigo = nombre => buscaImagen(IMAGENES_ENEMIGOS, nombre);
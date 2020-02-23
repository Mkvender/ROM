/****************************
 *Autor: Jaime Monforte
 *Fecha: 23/06/2019
 *Licencia: gpl30
 *Version:1.0
 *Descripcion: Componente en React de Combate y subcomponentes del mismo
 ****************************/
/*
 * Copyright (C) Daw2 2019
 *
 *
 * This program is free software: you can redistribute it and/or modify
 *
 * it under the terms of the GNU General Public License as published by
 *
 * the Free Software Foundation, either version 3 of the License, or
 *
 * (at your option) any later version.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonToolbar, Button, Image, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import imgAtaque from '../../img/ataque.svg';
import imgDefensa from '../../img/escudo.svg';
import imgRendicion from '../../img/bandera-blanca.svg';
import '../../css/general.css';
import '../../css/combate.css';

import { dameEnemigoAleatorio } from '../../backend/doCombate';
import { dameDatosSesion } from '../../backend/utilidades';
import { dameImagenClase, dameImagenEnemigo } from '../utilidades/imagenes';

//Valores iniciales
let defensaActivadaJugador = false;
let defensaActivadaEnemigo = false;

class Participante extends Component {
	render() {
		const { participante, ataque, defensa, vida, vidaOrigen, enemigo } = this.props;

		let sesion=JSON.parse(sessionStorage.getItem('datosPersonaje'));
		return <div className="col-md-3 text-center mt-5">
			<div className="imagenVidaJu">
				<h3>{participante}:</h3>
				{ participante==="JUGADOR"?<Image className="imgPersonaje" src={dameImagenClase(sesion.jugador.clase)}/>:<Image className="imgPersonaje" src={dameImagenEnemigo(enemigo)}/>}
				<span className="break"></span>
				<div className="d-flex justify-content-center">	
				<ProgressBar className="w-50">
					<ProgressBar animated variant="success" now={vida} max={vidaOrigen} key={1} />
					<ProgressBar animated striped variant="danger" now={(vidaOrigen-vida)} max={vidaOrigen} key={2} />
				</ProgressBar>
				</div>
				<span>Vida:</span><p><span id="muestraVida">{vida}</span>/{vidaOrigen}</p>
			</div>
			<div>
				<label>Ataque:</label><p>{ataque}</p>
				<label>Defensa:</label><p>{defensa}</p>
			</div>
		</div>
	}
}
class Boton extends Component {
	render() {
		const { onSelectClick, title, imagenIcono } = this.props;
		return <Button className="col-md-4 boton" variant="dark" size="lg" title={title} onClick={onSelectClick}>
			<Image className="iconoBoton" src={imagenIcono} />
			<p>{title}</p>
		</Button>
	}
}
//Grupo de Botones
class Botones extends Component {

	render() {
		const { ataque, defensa, rendirse } = this.props;
		return <ButtonToolbar className="col-md-6 row">
			<Boton onSelectClick={ataque} title="ATACAR" imagenIcono={imgAtaque} />
			<Boton onSelectClick={defensa} title="DEFENSA" imagenIcono={imgDefensa} />
			<Boton onSelectClick={rendirse} title="RENDIRSE" imagenIcono={imgRendicion} />
		</ButtonToolbar>
	}
}
//Registro inferior  del combate
class RegistroCombate extends Component {
	render() {
		const { combateLogComponent, nombre } = this.props;
		return <div className="row flex-column">
			<h3>Registro del combate contra {nombre}</h3>
			<p className="text-center" id="combate-log">{combateLogComponent}</p>
		</div>
	}
}
//Componente principal de combate
class Combate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			combateLog: '',
			vidaOrigenJugador: null,
			vidaOrigenEnemigo: null,
			ataqueOrigenJugador: null,
			ataqueOrigenEnemigo: null,
			defensaOrigenJugador: null,
			defensaOrigenEnemigo: null,
			agilidadOrigenJugador: null,
			agilidadOrigenEnemigo: null,
			vidaJugador: null,
			vidaEnemigo: null,
			ataqueJugador: null,
			ataqueEnemigo: null,
			defensaJugador: null,
			defensaEnemigo: null,
			agilidadJugador: null,
			agilidadEnemigo: null,
			nombreEnemigo: null,

		}

		this.respuestaEnemigo = this.respuestaEnemigo.bind(this);
		this.fin = this.fin.bind(this);
		this.atackJugador = this.atackJugador.bind(this);
		this.defensaDelJugador = this.defensaDelJugador.bind(this);
		this.atackEnemigo = this.atackEnemigo.bind(this);
		this.defensaDelEnemigo = this.defensaDelEnemigo.bind(this);
		this.rendirseJugador = this.rendirseJugador.bind(this);

	}
	montarAtributos(atributos) {
		this.setState({
			vidaOrigenJugador: atributos.jugador.salud,
			vidaOrigenEnemigo: atributos.enemigo.salud,
			ataqueOrigenJugador: atributos.jugador.ataque,
			ataqueOrigenEnemigo: atributos.enemigo.ataque,
			defensaOrigenJugador: atributos.jugador.defensa,
			defensaOrigenEnemigo: atributos.enemigo.defensa,
			vidaJugador: atributos.jugador.salud,
			vidaEnemigo: atributos.enemigo.salud,
			ataqueJugador: atributos.jugador.ataque,
			ataqueEnemigo: atributos.enemigo.ataque,
			defensaJugador: atributos.jugador.defensa,
			defensaEnemigo: atributos.enemigo.defensa,
			nombreEnemigo: atributos.enemigo.nombre
			//TODO: La agilidad se implementara en futuras versiones
			// agilidadOrigenJugador: atributos.jugador.agilidad,
			// agilidadOrigenEnemigo: atributos.enemigo.agilidad,
			//agilidadJugador: atributos.jugador.agilidad,
			//agilidadEnemigo: atributos.enemigo.agilidad,
		});
	}
	componentDidMount() {
		dameEnemigoAleatorio(dameDatosSesion().idUsuario)
			.then(res => {
				this.montarAtributos(res);
			})
			.catch(error => console.error(error));
	}

	//Respuesta del enemigo tras el turno del jugador
	respuestaEnemigo() {

		let numAleatorio = parseInt((Math.random() * 2), "10");
		switch (numAleatorio) {
			case 1:
				this.atackEnemigo();
				break;
			case 0:
				this.defensaDelEnemigo();
				break;
			default:
				break;
		}
	}

	//Al morir uno de los contendientes cambia a victoria o derrota
	fin(valor) {
		if (valor === "jugador") {
			this.props.history.push('/derrota');
		} else {
			const mision = this.props.location.state.mision;
			const esEvento = this.props.location.state.esEvento;
			this.props.history.push('/victoria', { mision: mision, esEvento: esEvento });
		}
	}

	//Ataque del jugador
	atackJugador() {
		let numAleatorio = parseInt(Math.random() * (20 - 1) + 1, "10");
		let perdida = numAleatorio + this.state.ataqueJugador - this.state.defensaEnemigo;
		if (perdida < 0) perdida = 0;//Daño nulo
		const vidaEnemigoNew = this.state.vidaEnemigo - perdida;

		if (this.state.vidaEnemigo <= 0 || perdida >= this.state.vidaEnemigo) {
			this.fin("enemigo");
			return;
		}

		this.setState({ vidaEnemigo: vidaEnemigoNew });


		if (defensaActivadaEnemigo) {
			this.setState({ defensaEnemigo: this.state.defensaOrigenEnemigo });
			defensaActivadaEnemigo = false;
		}


		this.setState({ combateLog: "El jugador ha realizado " + perdida + " de daño" });
		this.respuestaEnemigo();
	};
	//Defensa/Bloqueo jugador
	defensaDelJugador() {
		let numAleatorio = parseInt(Math.random() * (15 - 2) + 2);
		this.setState({
			defensaJugador: this.state.defensaOrigenJugador + numAleatorio,
			combateLog: "El jugador ha mejorado " + (this.state.defensaOrigenJugador + numAleatorio) + " su defensa"
		});
		defensaActivadaJugador = true;
		this.respuestaEnemigo();
	};
	//Rendirse jugador
	rendirseJugador() {
		this.props.history.push('/derrota');
	};
	//Ataque del Enemigo
	atackEnemigo() {
		let numAleatorio = parseInt(Math.random() * (20 - 1) + 1, "10");
		let perdida = numAleatorio + this.state.ataqueEnemigo - this.state.defensaJugador;

		if (perdida < 0) perdida = 0;//Daño nulo
		this.setState((state) => {
			return { vidaJugador: state.vidaJugador - perdida };
		});

		if (this.state.vidaJugador <= 0 || perdida >= this.state.vidaJugador) {
			this.fin("jugador");
			return;
		}
		//document.getElementById("muestraVidaJugador").innerText = this.state.vidaEnemigo;
		if (defensaActivadaJugador) {
			this.setState({ defensaJugador: this.state.defensaOrigenJugador });
			defensaActivadaJugador = false;
		}
		this.setState({ combateLog: "El enemigo te ha realizado " + perdida + " de daño" });
	}


	//Defensa/Bloqueo enemigo
	defensaDelEnemigo() {
		let numAleatorio = parseInt(Math.random() * (15 - 2) + 2);
		this.setState({
			defensaEnemigo: this.state.defensaOrigenEnemigo + numAleatorio,
			combateLog: "El enemigo ha mejorado su defensa en " + numAleatorio
		});
		defensaActivadaEnemigo = true;
	};


	render() {
		const { combateLog } = this.state;

		let vidaJugador = this.state.vidaJugador;
		let vidaEnemigo = this.state.vidaEnemigo;

		let vidaOrigenJugador = this.state.vidaOrigenJugador;
		let vidaOrigenEnemigo = this.state.vidaOrigenEnemigo;

		let ataqueJugador = this.state.ataqueJugador;
		let ataqueEnemigo = this.state.ataqueEnemigo;

		let defensaJugador = this.state.defensaJugador;
		let defensaEnemigo = this.state.defensaEnemigo;

		let nombreEnemigo = this.state.nombreEnemigo;
		
		return (
			<div className="combate">
				<div className="row">
					<Participante participante="JUGADOR" ataque={ataqueJugador} defensa={defensaJugador} vida={vidaJugador} vidaOrigen={vidaOrigenJugador} enemigo={nombreEnemigo} />
					<Botones ataque={this.atackJugador} defensa={this.defensaDelJugador} rendirse={this.rendirseJugador} />
					<Participante participante="ENEMIGO" ataque={ataqueEnemigo} defensa={defensaEnemigo} vida={vidaEnemigo} vidaOrigen={vidaOrigenEnemigo} enemigo={nombreEnemigo} />
				</div>
				<RegistroCombate combateLogComponent={combateLog} nombre={nombreEnemigo} />

			</div>


		);
	}
}

export default withRouter(Combate);

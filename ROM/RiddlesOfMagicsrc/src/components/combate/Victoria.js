/****************************
 *Autor: Jaime Monforte
 *Fecha: 23/06/2019
 *Licencia: gpl30
 *Version:1.0
 *Descripcion: Componente en React de Victoria
 ****************************/

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { obtenerRecompensas } from '../../backend/doCombate';
import { dameDatosSesion } from '../../backend/utilidades';


class Victoria extends Component {

    componentDidMount() {
        const mision  = this.props.location.state.mision;
        const esEvento = this.props.location.state.esEvento;


        obtenerRecompensas(dameDatosSesion().idUsuario, mision, esEvento)
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log());
    }

    render() {
        const { history } = this.props;
        return (
            <div className="text-center  mt-5 mb-5">
                <h2 className = "mt-5 mb-5">Has obtenido la victoria</h2>
                <p>Tus recompensas han sido añadidas a tu inventario</p>
                <Button className="mb-5  mt-5" variant="dark" onClick={() => history.push("/taberna")}>Volver</Button>

            </div>
        );
    }

}

export default withRouter(Victoria);

/****************************
 *Autor: Jaime Monforte
 *Fecha: 23/06/2019
 *Licencia: gpl30
 *Version:1.0
 *Descripcion: Componente en React de Derrota
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
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Derrota extends Component 
{
    
    render() 
    {
        const {history} = this.props;
        return (
            <div className = "text-center mt-5 mb-5">
                <h2 className = "mt-5 mb-5">Has sido derrotado</h2>
                <p>Tu única recompensa es sobrevivir para volver a intentarlo otro dia</p>
                <Button className="mb-5 mt-5" variant="dark" onClick={() => history.push("/taberna")}>Volver</Button>
            </div>
        );
    }
}

export default withRouter(Derrota);
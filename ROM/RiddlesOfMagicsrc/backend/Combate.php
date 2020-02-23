<?php
include 'Config.php';

//TODO: Obtener el id del Jugador
$json = $_POST["json"];
$jsonDecode = json_decode($json);

$idUsuario = $jsonDecode->{'idUsuario'}; 

$res = new stdClass();

$numAletorio = rand(1, 3);

$enemigo = Combate::obtenerEnemigo($numAletorio);
$jugador = Combate::obtenerJugador($idUsuario);

$res->enemigo = $enemigo;
$res->jugador = $jugador;

echo json_encode($res);

class Combate
{

    public static function obtenerEnemigo($idUsuario)
    {
        $sql = "SELECT nombre_enemigo, ataque, salud, defensa FROM enemigos WHERE id = ?";
        $con = ConfiguracionDB::crearConexion();

        $query = $con->prepare($sql);
        $query->bind_param("i", $idUsuario);
        $query->execute();

        $resultado = new stdClass();

        $query->bind_result(
            $resultado->{'nombre'},
            $resultado->{'ataque'},
            $resultado->{'salud'},
            $resultado->{'defensa'}
        );
        $query->fetch();

        $con->close();
        return $resultado;
    }
    public static function obtenerJugador($id)
    {
        $sql = "SELECT nombre_personaje, fuerza, salud, defensa FROM personajes WHERE id = ?";
        $con = ConfiguracionDB::crearConexion();

        $query = $con->prepare($sql);
        $query->bind_param("i", $id);
        $query->execute();

        $resultado = new stdClass();

        $query->bind_result(
            $resultado->{'nombre'},
            $resultado->{'ataque'},
            $resultado->{'salud'},
            $resultado->{'defensa'}
        );
        $query->fetch();

        $con->close();
        return $resultado;
    }

}
<?php
include 'Config.php';

$json = $_POST["json"];
$jsonDecode = json_decode($json);

$idUsuario = $jsonDecode->{'idUsuario'}; 

$res = new stdClass();


$jugador = Personaje::obtenerJugador($idUsuario);

$objetos = Personaje::obtenerInventario($idUsuario);

$res->jugador = $jugador;
$id=$objetos->{'objetos'};

$objetosArray = array();

foreach( $id as $aux){
    $objts=Personaje::obtenerObjeto($aux);
    array_push($objetosArray, $objts);
}

$res->objetos = $objetosArray;



echo json_encode($res);

class Personaje
{

    public static function obtenerJugador($id)
    {
        $sql = "SELECT nombre_personaje, fuerza, salud, defensa, clase, critico, suerte, descripcion, experiencia FROM personajes WHERE id = ?";
        $con = ConfiguracionDB::crearConexion();

        $query = $con->prepare($sql);
        $query->bind_param("i", $id);
        $query->execute();

        $resultado = new stdClass();

        $query->bind_result(
            $resultado->{'nombre'},
            $resultado->{'ataque'},
            $resultado->{'salud'},
            $resultado->{'defensa'},
            $resultado->{'clase'},
            $resultado->{'critico'},
            $resultado->{'suerte'},
            $resultado->{'descripcion'},
            $resultado->{'experiencia'}
            
        );
        $query->fetch();

        $con->close();
        return $resultado;
    }
    public static function obtenerObjeto($id)
    {
        $sql = "SELECT NombreObjeto,DescObjeto, AtribObjeto,ImagenObjeto, tipo FROM objetos WHERE IdObjeto = ?";
        $con = ConfiguracionDB::crearConexion();

        $query = $con->prepare($sql);
        $query->bind_param("i", $id);
        $query->execute();

        $resultado = new stdClass();

        $query->bind_result(
            $resultado->{'nombre'},
            $resultado->{'descripcion'},
            $resultado->{'atributo'},
            $resultado->{'imagen'},
            $resultado->{'tipo'}
        );
        $query->fetch();

        $con->close();
        return $resultado;
    }
    public static function obtenerInventario($id)
    {
        $sql = "SELECT id_objeto FROM objetos_personaje WHERE id_personaje = ?";
        $con = ConfiguracionDB::crearConexion();

        $query = $con->prepare($sql);
        $query->bind_param("i", $id);
        $query->execute();

        $resultado = new stdClass();
        $resultado->objetos = array();

        $query->bind_result(
            $id            
        );
        
        while($query->fetch()) {
            $idObjeto = $id;
            array_push($resultado->objetos, $idObjeto);
        }

        $con->close();
        return $resultado;
    }


}
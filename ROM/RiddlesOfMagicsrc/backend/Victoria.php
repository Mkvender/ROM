<?php
include 'Config.php';

$json = $_POST["json"];
$jsonDecode = json_decode($json);

$idMision = $jsonDecode->{'idMision'};
$idUsuario = $jsonDecode->{'idUsuario'};

$recompensa = Victoria::cuantificaRecompensa($idMision);

$experiencia = $recompensa->{'experiencia'};
$dinero=$recompensa->{'dinero'};

$isUpdated = Victoria::actualizaRecompensa($experiencia, $dinero, $idUsuario);


$res = new stdClass();
$res->resultado = $isUpdated;
echo json_encode($res);

class Victoria
{
   public static function actualizaRecompensa($experiencia, $dinero, $idUsuario)
    {

        $sql = "UPDATE personajes SET experiencia = experiencia + ? , dinero = dinero + ? WHERE id=?";
        $con = ConfiguracionDB::crearConexion();

        $query = $con->prepare($sql);
        $query->bind_param("iii", $experiencia, $dinero, $idUsuario);
        $isUpdated = $query->execute();

        $con->close();
        return $isUpdated;
    }

    public static function cuantificaRecompensa($id)
    {
        $sql = "SELECT experiencia, dinero FROM misiones WHERE id = ?";
        $con = ConfiguracionDB::crearConexion();
        
        $query = $con->prepare($sql);
        $query->bind_param("i", $id);
        $query->execute();

        $resultado = new stdClass();

        $query->bind_result(
            $resultado->{'experiencia'},
            $resultado->{'dinero'}
        );

        $query->fetch();
        $con->close();
        return $resultado;
    }
}

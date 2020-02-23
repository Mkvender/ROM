<?php
include 'Config.php';

$resultado1 = Mision::obtenerMisiones(1);
$resultado2 = Mision::obtenerMisiones(2);
$resultado3 = Mision::obtenerMisiones(3);

$res = new stdClass();
$res->mision1 = $resultado1;
$res->mision2 = $resultado2;
$res->mision3 = $resultado3;

echo json_encode($res);

class Mision
{
    
    public static function obtenerMisiones($id)
    {
        $sql = "SELECT id, nombre_mision, desc_mision, experiencia, dinero FROM misiones WHERE id = ?";
        $con = ConfiguracionDB::crearConexion();
        
        $query = $con->prepare($sql);        
        $query->bind_param("i", $id);
        $query->execute();

        $resultado = new stdClass();

        $query->bind_result(
            $resultado->{'idMision'},
            $resultado->{'nombre'},
            $resultado->{'descripcion'},
            $resultado->{'experiencia'},
            $resultado->{'dinero'}
        );
        $query->fetch();

        $con->close();
        return $resultado;
        
    }
}

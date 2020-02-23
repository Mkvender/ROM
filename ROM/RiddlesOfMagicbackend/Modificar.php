<?php
include 'Config.php';

// La primera vez, el json solo contiene el nombre de usuario
if (isset($_POST["json"])) {
    $json = $_POST["json"];
    $jsonDecode = json_decode($json);
    $id = $jsonDecode->{'id'};

    $res = new stdClass();

    $datos = Modificar::getUsuario($id);

    $res->usuario = $datos->{'usuario'};
    $res->contrasena = $datos->{'contrasena'};
    echo json_encode($res);
} else {
    $json = $_POST["modify"];
    $jsonDecode = json_decode($json);
    $id = $jsonDecode->{'id'};
    $usuario = $jsonDecode->{'nombreUsuario'};
    $contraseña = $jsonDecode->{'contrasena'};

    $res = new stdClass();

    $validaUser = Modificar::validate_alpha_space($usuario);

    $existeUsuario = Modificar::checkUser($usuario);

    if ($validaUser) {
        $res->error = false;
        if ($existeUsuario !== $usuario && !$existeUsuario) {
            $res->existeUsr = false;
            $registro = Modificar::modificarUsuario($id, $usuario, $contraseña);
            if ($registro->{'actualizado'} && $registro->{'actualizadopj'}) {
                $res->actualizado = true;
                $res->estaLogueado = true;
                $res->existe = true;
                $res->idUsuario = $id;
                $res->nombreUsuario = $registro->{'usuario'};
            } else {
                $res->actualizado = $resultado->{'actualizado'};
            }
        } else {
            $res->registro = false;
            if ($existeUsuario === $usuario) {
                $res->existeUsr = true;
            }
        }
    } else {
        $res->error = true;
    }
    echo json_encode($res);
}

class Modificar
{
    public static function getUsuario($id)
    {
        $con = ConfiguracionDB::crearConexion();
        $sql = "SELECT NombreUsuario, Correo, Contrasena FROM usuarios WHERE IdUsuario = ?";

        $resultado = new stdClass();

        $query = $con->prepare($sql);
        // los flags indican que son strings
        $query->bind_param("i", $id);
        $query->execute();

        // Volcamos el resultado en una variable
        $query->bind_result($nombreUsuario, $correo, $contrasena);
        $query->fetch();

        $resultado->{'usuario'} = $nombreUsuario;
        $resultado->{'correo'} = $correo;
        $resultado->{'contrasena'} = $contrasena;

        // Cerramos la consulta preparada
        $query->close();
        $con->close();
        return $resultado;
    }

    public static function modificarUsuario($id, $nombreUsr = null, $pass = null)
    {
        $con = ConfiguracionDB::crearConexion();

        $resultado = new stdClass();

        $sql = "UPDATE usuarios SET NombreUsuario= ?, Contrasena = ?  WHERE IdUsuario = ?";
        $query = $con->prepare($sql);
        $query->bind_param("sss", $nombreUsr, $pass, $id);
        $query->execute();

        if ($con->affected_rows > 0) {
            $resultado->{'actualizado'} = true;
            $resultado->{'usuario'} = $nombreUsr;
            $resultado->{'idUsuario'} = $id;
        } else {
            $resultado->{'actualizado'} = false;
            $resultado->{'usuario'} = $nombreUsr;
            $resultado->{'idUsuario'} = $id;
        }

        $query->close();

        $sql = "UPDATE personajes SET nombre_personaje= ?  WHERE id = ?";
        $query = $con->prepare($sql);
        $query->bind_param("ss", $nombreUsr, $id);
        $query->execute();

        if ($con->affected_rows > 0) {
            $resultado->{'actualizadopj'} = true;
        } else {
            $resultado->{'actualizadopj'} = false;
        }

        $query->close();
        $con->close();

        return $resultado;
    }

    public static function checkUser($usuario)
    {
        $con = ConfiguracionDB::crearConexion();
        $sql = "SELECT NombreUsuario FROM usuarios WHERE NombreUsuario = ?";
        $query = $con->prepare($sql);
        $query->bind_param("s", $usuario);
        $query->execute();
        $query->bind_result($resultado);
        $query->fetch();

        $query->close();
        $con->close();

        return $resultado;
    }

    // validar email
    public function validate_email($value)
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL);
    }

    public function validate_alpha_space($value)
    {
        return preg_match('/^[a-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ_@#0-9][a-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ0-9_@#\s]+$/i', $value);
    }
    public function validate_alpha_space_user($value)
    {
        return preg_match('/^[A-Za-záñéíóúüÁÉÍÓÚÜÑçÇ1-9]{3,15}$/i', $value);
    }
}

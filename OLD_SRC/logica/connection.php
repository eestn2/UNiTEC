<?php 

class conecction{

    function conectar(){
        //$pdo = new PDO('mysql:host=localhost;id22089797_bolsadetrabajotecncia2','id22089797_bdtt2','WebHostTecnica2JuninEEST2!');
        $pdo = mysqli_connect('localhost', 'root', '', 'bolsatest');
        return $pdo;
    }

}

$c = new conecction();
$connection = $c->conectar();

?>
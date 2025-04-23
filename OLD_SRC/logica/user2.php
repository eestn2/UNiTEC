<?php 

class usuario{
    private $id,$nombre,$edad,$localidad,$email,$clave,$descripcion,$dateAct,$fotoPerfil,$portfolio,$habilitado,$tipo,$rango,$estado;
    
    public function __construct($id, $nombre, $edad, $localidad,$email,$clave,$descripcion,$dateAct,$fotoPerfil,$portfolio,$habilitado,$tipo,$estado){
        $this->id = $id;
        $this->nombre = $nombre;
        $this->edad = $edad;
        $this->localidad = $localidad;
        $this->email = $email;
        $this->clave = $clave;
        $this->descripcion = $descripcion;
        $this->dateAct = $dateAct;
        $this->fotoPerfil = $fotoPerfil;
        $this->portfolio = $portfolio;
        $this->habilitado = $habilitado;
        $this->tipo = $tipo;
        $this->estado = $estado;
    }

    public function getId(){
        return $this->id;
    }
             
    public function setId($id){
       
        $this->id = $id;
    }

    public function getNombre(){
        return $this->nombre;
    }
             
    public function setNombre($nombre){
       
        $this->nombre = $nombre;
    }

    public function getEdad(){
        return $this->edad;
    }
             
    public function setEdad($edad){
       
        $this->edad = $edad;
    }

    public function getLocalidad(){
        return $this->localidad;
    }
             
    public function setLocalidad($localidad){
       
        $this->localidad = $localidad;
    }

    public function getEmail(){
        return $this->email;
    }
             
    public function setEmail($email){
       
        $this->email = $email;
    }

    public function getClave(){
        return $this->clave;
    }
             
    public function setClave($clave){
       
        $this->clave = $clave;
    }

    public function getDescripcion(){
        return $this->descripcion;
    }
             
    public function setDescripcion($descripcion){
       
        $this->descripcion = $descripcion;
    }

    public function getDateAct(){
        return $this->dateAct;
    }
             
    public function setDateAct($dateAct){
       
        $this->dateAct = $dateAct;
    }

    public function getFotoPerfil(){
        return $this->fotoPerfil;
    }
             
    public function setFotoPerfil($fotoPerfil){
       
        $this->fotoPerfil = $fotoPerfil;
    }

    public function getPortfolio(){
        return $this->portfolio;
    }
             
    public function setPortfolio($portfolio){
       
        $this->portfolio = $portfolio;
    }

    public function getHabilitado(){
        return $this->habilitado;
    }
             
    public function setHabilitado($habilitado){
       
        $this->habilitado = $habilitado;
    }

    public function getTipo(){
        return $this->tipo;
    }
             
    public function setTipo($tipo){
       
        $this->tipo = $tipo;
    }

    public function getEstado(){
        return $this->estado;
    }
             
    public function setEstado($estado){
       
        $this->estado = $estado;
    }
        


}



?>
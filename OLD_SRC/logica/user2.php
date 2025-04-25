<?php
// This class represents a user (usuario) with various attributes and methods to get and set those attributes.
class usuario {
    // Private properties of the class. These represent the user's attributes.
    // $id: User ID
    // $nombre: User's name
    // $edad: User's age
    // $localidad: User's location
    // $email: User's email address
    // $clave: User's password
    // $descripcion: User's description or bio
    // $dateAct: Last activity date
    // $fotoPerfil: Profile picture URL or path
    // $portfolio: User's portfolio (could be a URL or description)
    // $habilitado: Whether the user is enabled (active)
    // $tipo: User type (e.g., admin, regular user, etc.)
    // $rango: User's rank (not used in the constructor)
    // $estado: User's status (e.g., online, offline, etc.)
    private $id, $nombre, $edad, $localidad, $email, $clave, $descripcion, $dateAct, $fotoPerfil, $portfolio, $habilitado, $tipo, $rango, $estado;

    // Constructor method to initialize the user's attributes when an object of this class is created.
    public function __construct($id, $nombre, $edad, $localidad, $email, $clave, $descripcion, $dateAct, $fotoPerfil, $portfolio, $habilitado, $tipo, $estado) {
        $this->id = $id; // Assigns the provided ID to the $id property
        $this->nombre = $nombre; // Assigns the provided name to the $nombre property
        $this->edad = $edad; // Assigns the provided age to the $edad property
        $this->localidad = $localidad; // Assigns the provided location to the $localidad property
        $this->email = $email; // Assigns the provided email to the $email property
        $this->clave = $clave; // Assigns the provided password to the $clave property
        $this->descripcion = $descripcion; // Assigns the provided description to the $descripcion property
        $this->dateAct = $dateAct; // Assigns the provided last activity date to the $dateAct property
        $this->fotoPerfil = $fotoPerfil; // Assigns the provided profile picture to the $fotoPerfil property
        $this->portfolio = $portfolio; // Assigns the provided portfolio to the $portfolio property
        $this->habilitado = $habilitado; // Assigns the provided enabled status to the $habilitado property
        $this->tipo = $tipo; // Assigns the provided user type to the $tipo property
        $this->estado = $estado; // Assigns the provided status to the $estado property
    }

    // Getter and setter methods for each property.
    // These methods allow controlled access to the private properties.

    // Gets the user ID
    public function getId() {
        return $this->id;
    }

    // Sets the user ID
    public function setId($id) {
        $this->id = $id;
    }

    // Gets the user's name
    public function getNombre() {
        return $this->nombre;
    }

    // Sets the user's name
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    // Gets the user's age
    public function getEdad() {
        return $this->edad;
    }

    // Sets the user's age
    public function setEdad($edad) {
        $this->edad = $edad;
    }

    // Gets the user's location
    public function getLocalidad() {
        return $this->localidad;
    }

    // Sets the user's location
    public function setLocalidad($localidad) {
        $this->localidad = $localidad;
    }

    // Gets the user's email
    public function getEmail() {
        return $this->email;
    }

    // Sets the user's email
    public function setEmail($email) {
        $this->email = $email;
    }

    // Gets the user's password
    public function getClave() {
        return $this->clave;
    }

    // Sets the user's password
    public function setClave($clave) {
        $this->clave = $clave;
    }

    // Gets the user's description
    public function getDescripcion() {
        return $this->descripcion;
    }

    // Sets the user's description
    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    // Gets the last activity date
    public function getDateAct() {
        return $this->dateAct;
    }

    // Sets the last activity date
    public function setDateAct($dateAct) {
        $this->dateAct = $dateAct;
    }

    // Gets the profile picture
    public function getFotoPerfil() {
        return $this->fotoPerfil;
    }

    // Sets the profile picture
    public function setFotoPerfil($fotoPerfil) {
        $this->fotoPerfil = $fotoPerfil;
    }

    // Gets the portfolio
    public function getPortfolio() {
        return $this->portfolio;
    }

    // Sets the portfolio
    public function setPortfolio($portfolio) {
        $this->portfolio = $portfolio;
    }

    // Gets whether the user is enabled
    public function getHabilitado() {
        return $this->habilitado;
    }

    // Sets whether the user is enabled
    public function setHabilitado($habilitado) {
        $this->habilitado = $habilitado;
    }

    // Gets the user type
    public function getTipo() {
        return $this->tipo;
    }

    // Sets the user type
    public function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    // Gets the user's status
    public function getEstado() {
        return $this->estado;
    }

    // Sets the user's status
    public function setEstado($estado) {
        $this->estado = $estado;
    }
}
?>
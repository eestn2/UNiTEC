<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable('../../../../');
$dotenv->load();

//header("Access-Control-Allow-Origin: " . $_ENV['ALLOWED_ORIGIN']);
header("Access-Control-Allow-Origin: http://localhost:5173/UNITEC/");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

?>
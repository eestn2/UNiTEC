<?php
include_once(__DIR__ . '/../DotEnv.php');

(new DotEnv(__DIR__ . '/../../../.env'))->load();

header("Access-Control-Allow-Origin: " . getenv('ALLOWED_ORIGIN'));
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
?>
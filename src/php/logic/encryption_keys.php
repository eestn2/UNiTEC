<?php
include_once(__DIR__ . '/../DotEnv.php'); // Use __DIR__ for an absolute path

(new DotEnv(__DIR__ . '/../../../.env'))->load();

define("KEY", getenv('ENCRYPTION_KEY'));
define("AES", getenv('AES'));

?>
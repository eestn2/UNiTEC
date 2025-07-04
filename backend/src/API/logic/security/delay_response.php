<?php

function wait_until_five_seconds(float $startTime): void {
    $elapsed = microtime(true) - $startTime;
    $target = 5.0;

    if ($elapsed < $target) {
        usleep((int)(($target - $elapsed) * 1_000_000)); // microsegundos
    }
}
?>
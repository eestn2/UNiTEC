<?php
function rateLimitCheck($limit = 5, $window = 2, $blockDuration = 150) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $exempt_ips = ['127.0.0.1', '::1']; // IPs excluidas del sistema

    if (in_array($ip, $exempt_ips)) return;

    $file = __DIR__ . '/rate_limit.json';
    $now = microtime(true); // Tiempo exacto con milisegundos

    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    if (!isset($data[$ip])) {
        $data[$ip] = [
            'timestamps' => [$now],
            'blocked_until' => 0
        ];
    } else {
        if ($now < $data[$ip]['blocked_until']) {
            http_response_code(429);
            echo json_encode([
                "status" => "failed",
                "message" => "🚫 IP bloqueada temporalmente por exceso de peticiones.",
                "data" => null
            ]);
            exit;
        }

        $data[$ip]['timestamps'][] = $now;
        $data[$ip]['timestamps'] = array_filter($data[$ip]['timestamps'], function($ts) use ($now, $window) {
            return ($now - $ts) <= $window;
        });

        if (count($data[$ip]['timestamps']) >= $limit) {
            $data[$ip]['blocked_until'] = $now + $blockDuration;
            file_put_contents($file, json_encode($data));
            http_response_code(429);
            echo json_encode([
                "status" => "failed",
                "message" => "🚫 Acceso bloqueado por exceso de peticiones en poco tiempo (2 min 30 seg).",
                "data" => null
            ]);
            exit;
        }
    }

    file_put_contents($file, json_encode($data));
}

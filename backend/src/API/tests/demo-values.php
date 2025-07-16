<?php
/**
 * Forced values for demo purpouses
 */

include_once(__DIR__ . '/../logic/database/connection.php');
require_once(__DIR__ . '/../logic/security/security_functions.php');

try {
    $connection->beginTransaction();

    // Insert admin account
    $adminEmail = 'admin@admin.com';
    $adminName = 'Admin';
    $adminPassword = encryption('admin');
    $enabled = 1;
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1990-01-01', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 4, 3)");
    $stmt->execute([$adminName, $adminEmail, $adminPassword, $enabled]);
    $adminId = $connection->lastInsertId();
    // Insert student account
    $studentEmail = 'estudiante@estudiante.com';
    $studentName = 'Estudiante Raul';
    $studentPassword = encryption('estudiante');
    $enabled = 1;
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1990-01-01', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 2, 3)");
    $stmt->execute([$studentName, $studentEmail, $studentPassword, $enabled]);
    $studentId = $connection->lastInsertId();
    // Insert graduate account
    $graduateEmail = 'egresado@egresado.com';
    $graduateName = 'Egresado Juan';
    $graduatePassword = encryption('egresado');
    $enabled = 1;
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1990-01-01', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 3, 3)");
    $stmt->execute([$graduateName, $graduateEmail, $graduatePassword, $enabled]);
    $graduateId = $connection->lastInsertId();
    // Insert enterprise 1
    $microsoftEmail = 'empresa@empresa.com';
    $microsoftName = 'Microsoft';
    $microsoftPassword = encryption('empresa');
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1991-02-02', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 1, 3)");
    $stmt->execute([$microsoftName, $microsoftEmail, $microsoftPassword, $enabled]);
    $microsoftId = $connection->lastInsertId();
    // Insert enterprise 2
    $sistemasJEmail = 'sistemas@junin.com';
    $sistemasJName = 'Sistemas Junín';
    $sistemasJPassword = encryption('sistemasjunin');
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1991-02-02', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 1, 3)");
    $stmt->execute([$sistemasJName, $sistemasJEmail, $sistemasJPassword, $enabled]);
    $sistemasJId = $connection->lastInsertId();

    // Insert Job Offer by Microsoft
    $title1 = "Ingeniero de Software - Proyecto de Inteligencia Ambiental";
    $desc1 = 
    "Ubicación: Remoto / Híbrido en Madrid, España
    Tipo de empleo: Tiempo completo
    Industria: Tecnología / IoT / Medio Ambiente
    Nivel de experiencia: Intermedio a Senior
    
    Descripción del puesto
    En Microsoft EcoSentry Technologies, estamos revolucionando la forma en que las ciudades monitorean y responden al cambio climático. Nuestro equipo está desarrollando una solución basada en IoT e inteligencia artificial para medir la calidad del aire en tiempo real y generar alertas predictivas que ayuden a proteger la salud pública.
    Buscamos ingenieros/as de software que deseen contribuir a este proyecto de impacto ambiental, desarrollando sistemas escalables para la adquisición, análisis y visualización de datos ambientales recogidos por sensores distribuidos en áreas urbanas.
    
    Responsabilidades
    - Diseñar e implementar microservicios para la ingestión y análisis de datos ambientales.
    - Colaborar en el desarrollo de dashboards interactivos y herramientas de visualización en tiempo real.
    - Integrar APIs de terceros y trabajar con flujos de datos en streaming.
    - Escribir código limpio, mantenible y testeable.
    - Participar activamente en sesiones técnicas y toma de decisiones del equipo de ingeniería.
    
    Requisitos
    - Experiencia con lenguajes como Python, JavaScript o Go.
    - Conocimiento de arquitecturas basadas en microservicios y contenedores (Docker, Kubernetes).
    - Experiencia con bases de datos relacionales y NoSQL (PostgreSQL, InfluxDB, MongoDB).
    - Familiaridad con herramientas de visualización como Grafana o D3.js.
    - Conocimiento básico de protocolos IoT (MQTT, HTTP, WebSocket).
    - Buen nivel de inglés técnico.
    
    Se valorará
    - Experiencia previa en proyectos relacionados con sostenibilidad, medio ambiente o smart cities.
    - Contribuciones a proyectos open source.
    - Conocimiento de sistemas de geolocalización y mapas (Leaflet, Mapbox, etc.).
    - Mentalidad ágil y proactiva, con orientación a producto.
    
    ¿Qué ofrecemos?
    - Oportunidad de trabajar en un proyecto innovador con impacto real.
    - Equipo técnico altamente cualificado y colaborativo.
    - Horario flexible y posibilidad de trabajo 100% remoto.
    - Presupuesto para formación y participación en eventos tecnológicos.
    - Salario competitivo y beneficios adicionales según experiencia.
    
    ¿Estás listo/a para escribir el software que ayudará a respirar un aire más limpio?
    
    ¡Únete a Microsoft EcoSentry Technologies y sé parte del cambio!
    ";
    $stmt = $connection->prepare("INSERT INTO `offers`(`creator_id`, `title`, `description`, `status`) VALUES (?, ?, ?, 1)");
    $stmt->execute([$microsoftId, $title1, $desc1]);

    // Insert Job Offer by Sistemas Junín
    $title2 = "Desarrollador Junior - Aplicaciones Web Empresariales";
    $desc2 = 
    "Empresa: Sistemas Junín
    Ubicación: Junín, Buenos Aires (modalidad híbrida)
    Tipo de empleo: Tiempo completo / Primer empleo
    Industria: Software empresarial / Soluciones a medida
    Nivel de experiencia: Junior (0-2 años)
    Descripción del puesto
    En Sistemas Junín, desarrollamos soluciones tecnológicas personalizadas para pymes, industrias y organismos públicos. Estamos buscando desarrolladores/as junior con ganas de aprender, crecer profesionalmente y sumarse a proyectos reales desde el primer día.
    Si estás terminando tus estudios o ya diste tus primeros pasos en el desarrollo web y querés trabajar en un equipo donde vas a aprender en serio, ¡esta oportunidad es para vos!

    Responsabilidades
    - Colaborar en el desarrollo y mantenimiento de aplicaciones web internas y externas.
    - Participar en tareas de testing, documentación y mejoras continuas.
    - Asistir a reuniones técnicas y aprender de programadores más experimentados.
    - Escribir código siguiendo buenas prácticas y convenciones del equipo.
    - Recibir mentoría constante para crecer técnica y profesionalmente.
    Requisitos
    - Conocimientos básicos de programación web (HTML, CSS, JavaScript).
    - Familiaridad con algún lenguaje backend: PHP, Python o Node.js.
    - Conocimiento básico de bases de datos (MySQL, PostgreSQL).
    - Ganas de aprender y mejorar cada día.
    - Buena comunicación, responsabilidad y predisposición para el trabajo en equipo.

    Se valorará
    - Haber trabajado en proyectos personales, académicos o freelance.
    - Conocimientos básicos de control de versiones con Git.
    - Estudiantes de carreras de informática, sistemas o afines.
    - Residencia en Junín o alrededores (no excluyente si trabajás remoto).

    ¿Qué ofrecemos?
    - Primer experiencia laboral con acompañamiento constante.
    - Ambiente de trabajo relajado, con foco en el aprendizaje.
    - Jornadas flexibles y posibilidad de modalidad híbrida.
    - Capacitación interna, talleres y revisiones de código con feedback.
    - Posibilidad de crecimiento real dentro de la empresa.
    - ¿Querés empezar tu carrera en desarrollo rodeado/a de buena gente y buenos desafíos?

    Sumate a Sistemas Junín y crezcamos juntos.

";
    $stmt = $connection->prepare("INSERT INTO `offers`(`creator_id`, `title`, `description`, `status`) VALUES (?, ?, ?, 1)");
    $stmt->execute([$sistemasJId, $title2, $desc2]);

    

    $connection->commit();
    echo "Test users and job offers created successfully.";
    echo "<br>Admin ID: $adminId";
    echo "<br>Student ID: $studentId";
    echo "<br>Graduate ID: $graduateId";
    echo "<br>Microsoft ID: $microsoftId";
    echo "<br>Sistemas Junín ID: $sistemasJId";
} catch (Exception $e) {
    $connection->rollBack();
    die("Error: " . $e->getMessage());
} finally {
    if (isset($connection)) $connection = null;
}
?>
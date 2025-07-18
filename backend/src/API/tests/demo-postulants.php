<?php
// DEMO USERS (Postulantes)
$users = [
    [201, "Juan Pérez", "https://i.pravatar.cc/100?img=1"],
    [202, "Lucía Gómez", "https://i.pravatar.cc/100?img=2"],
    [203, "Carlos Díaz", "https://i.pravatar.cc/100?img=3"],
    [204, "Ana López", "https://i.pravatar.cc/100?img=4"],
    [205, "Mariana Suárez", "https://i.pravatar.cc/100?img=5"],
    [206, "Pedro Álvarez", "https://i.pravatar.cc/100?img=6"],
    [207, "Laura Ramírez", "https://i.pravatar.cc/100?img=7"],
    [208, "Gustavo Herrera", "https://i.pravatar.cc/100?img=8"],
    [209, "Camila Torres", "https://i.pravatar.cc/100?img=9"],
    [210, "Emilio Ferreyra", "https://i.pravatar.cc/100?img=10"],
    [211, "Nadia Sosa", "https://i.pravatar.cc/100?img=11"],
    [212, "Lucas Medina", "https://i.pravatar.cc/100?img=12"],
    [213, "Verónica Ruiz", "https://i.pravatar.cc/100?img=13"],
    [214, "Matías Navarro", "https://i.pravatar.cc/100?img=14"],
    [215, "Rocío Méndez", "https://i.pravatar.cc/100?img=15"],
    [216, "Federico Márquez", "https://i.pravatar.cc/100?img=16"],
    [217, "Daniela Ortega", "https://i.pravatar.cc/100?img=17"],
    [218, "Esteban Cabrera", "https://i.pravatar.cc/100?img=18"],
    [219, "Paula Aguirre", "https://i.pravatar.cc/100?img=19"],
    [220, "Diego Salinas", "https://i.pravatar.cc/100?img=20"],
];

$applicants = [
    [201, 1],
    [202, 1],
    [203, 2],
    [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3],
    [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3],
    [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3], [204, 3],
    [205, 4], [206, 4],
    [207, 5],
    [208, 7],
    [209, 8],
    [210, 9], [211, 9],
    [212, 10],
    [213, 12],
    [214, 13],
    [215, 14],
    [216, 15], [217, 15],
    [218, 16],
    [219, 17],
    [220, 18]
];

// DEMO EMPRESAS
$companies = [];
for ($i = 101; $i <= 117; $i++) {
    $companies[] = [
        'id' => $i,
        'name' => "Empresa $i",
        'email' => "empresa$i@example.com",
        'password' => "empresa$i",
    ];
}

// Cargar usuarios postulantes
foreach ($users as [$id, $name, $image]) {
    echo "INSERT INTO users (id, name, email, password, profile_picture, user_type, enabled, status) VALUES ";
    echo "($id, '$name', 'user$id@example.com', 'user$id', '$image', 2, 1, 1);\n";
}

// Cargar empresas
foreach ($companies as $c) {
    echo "INSERT INTO users (id, name, email, password, user_type, enabled, status) VALUES ";
    echo "({$c['id']}, '{$c['name']}', '{$c['email']}', '{$c['password']}', 1, 1, 1);\n";
}

// Cargar applicants
$applicantId = 1;
foreach ($applicants as [$userId, $offerId]) {
    echo "INSERT INTO applicants (id, user_id, offer_id, status) VALUES ";
    echo "($applicantId, $userId, $offerId, 1);\n";
    $applicantId++;
}

$offers = [
    [1, 101, "Desarrollador Frontend Desarrollador Frontend Desarrollador Frontend Desarrollador Frontend Desarrollador Frontend", "Buscamos un frontend con experiencia en React.", 1],
    [2, 101, "Backend Node.js", "Se busca desarrollador backend con experiencia en Node.js.", 1],
    [3, 102, "Diseñador UX/UI", "Se necesita diseñador para app móvil.", 0],
    [4, 103, "Fullstack Developer", "Buscamos desarrollador con experiencia en frontend y backend.", 1],
    [5, 104, "QA Tester", "Se busca tester manual y automatizado.", 0],
    [6, 105, "Mobile Developer", "Desarrollador con experiencia en React Native o Flutter.", 1],
    [7, 106, "DevOps Engineer", "Ingeniero DevOps con conocimientos en AWS y CI/CD.", 1],
    [8, 107, "Diseñador Gráfico", "Se busca diseñador para campañas de marketing.", 0],
    [9, 108, "Product Manager", "PM con experiencia en metodologías ágiles.", 1],
    [10, 109, "Data Analyst", "Analista con manejo de SQL y herramientas BI.", 1],
    [11, 110, "Cybersecurity Specialist", "Especialista en seguridad informática y auditorías.", 1],
    [12, 111, "Scrum Master", "Facilitador ágil para equipos de desarrollo.", 1],
    [13, 112, "Game Developer", "Se busca desarrollador con experiencia en Unity o Unreal.", 0],
    [14, 113, "UX Researcher", "Investigador UX con experiencia en pruebas de usabilidad.", 1],
    [15, 114, "Cloud Architect", "Arquitecto Cloud con dominio de Azure o AWS.", 1],
    [16, 115, "Machine Learning Engineer", "Ingeniero ML con conocimientos en Python y TensorFlow.", 1],
    [17, 116, "Soporte Técnico", "Soporte nivel 1 y 2 para empresa tecnológica.", 0],
    [18, 117, "Content Manager", "Gestor de contenido con experiencia en SEO.", 1],
];

foreach ($offers as [$id, $companyId, $title, $description, $status]) {
    echo "INSERT INTO offers (id, company_id, title, description, status) VALUES ";
    echo "($id, $companyId, '" . addslashes($title) . "', '" . addslashes($description) . "', $status);\n";
}

?>

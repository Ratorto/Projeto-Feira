<?php
header("Content-Type: application/json");

try {
    $banco = new PDO("mysql:host=localhost;dbname=banco_feira;charset=utf8", "root", "");

    // Consulta 1: plantas e espécies
    $stmt = $banco->query("SELECT plantas.id_planta, especie.nome_especie FROM plantas INNER JOIN especie ON especie.id_especie = plantas.especie_id ORDER BY plantas.id_planta ASC;");
    $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Consulta 2: irrigadores e reabastecimentos
    $stmt2 = $banco->query("SELECT irrigadores.id_irrigador, reabastecimento.data_reabastecimento FROM reabastecimento INNER JOIN irrigadores ON irrigadores.id_irrigador = reabastecimento.irrigador_id;");
$dados2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);

// Formatar datas no padrão BR (dd/mm/yyyy)
foreach ($dados2 as &$linha) {
    if (isset($linha['data_reabastecimento'])) {
        $data = new DateTime($linha['data_reabastecimento']);
        $linha['data_reabastecimento'] = $data->format('d/m/Y');
    }
}

    // Retornar tudo em um único JSON
    echo json_encode([
    "plantas" => $dados,
    "irrigadores" => $dados2
]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

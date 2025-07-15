fetch('conexao.php')
    .then(response => response.json())
    .then(resposta => {
        const dados = resposta.plantas;
        const dados2 = resposta.irrigadores;

        // --------------------- Tabela de Plantas ---------------------
        const container1 = document.getElementById('tabela-container');
        const tabela1 = document.createElement('table');
        tabela1.classList.add('tabela-estilizada');

        const cabecalho1 = tabela1.insertRow();
        if (dados.length > 0) {
            Object.keys(dados[0]).forEach(chave => {
                const th = document.createElement('th');
                th.textContent = chave === "id_planta" ? "Número da planta" :
                    chave === "nome_especie" ? "Espécie" :
                        chave;
                th.style.padding = '8px';
                th.style.backgroundColor = '#a5d6a7';
                cabecalho1.appendChild(th);
            });

            dados.forEach(item => {
                const linha = tabela1.insertRow();
                Object.values(item).forEach(valor => {
                    const celula = linha.insertCell();
                    celula.textContent = valor;
                    celula.style.padding = '8px';
                });
            });

            container1.appendChild(tabela1);
        } else {
            container1.textContent = 'Nenhum dado encontrado.';
        }

        // --------------------- Tabela de Irrigadores ---------------------
        const container2 = document.getElementById('tabela-container2');
        const tabela2 = document.createElement('table');
        tabela2.classList.add('tabela-estilizada');

        const cabecalho2 = tabela2.insertRow();
        if (dados2.length > 0) {
            Object.keys(dados2[0]).forEach(chave => {
                const th = document.createElement('th');
                th.textContent = chave === "id_irrigador" ? "Número do irrigador" :
                    chave === "data_reabastecimento" ? "Reabastecimentos" :
                        chave;
                th.style.padding = '8px';
                th.style.backgroundColor = '#a5d6a7';
                cabecalho2.appendChild(th);
            });

            dados2.forEach(item => {
                const linha = tabela2.insertRow();
                Object.values(item).forEach(valor => {
                    const celula = linha.insertCell();
                    celula.textContent = valor;
                    celula.style.padding = '8px';
                });
            });

            container2.appendChild(tabela2);
        } else {
            container2.textContent = 'Nenhum dado encontrado.';
        }
    })
    .catch(erro => console.error('Erro ao buscar dados:', erro));

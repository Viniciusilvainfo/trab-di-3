let dadosPaises;

export async function carregarPaises() {
    try {
        const select = document.getElementById("paises");
        const resposta = await fetch("./paises.json");

        const paises = await resposta.text();
        dadosPaises = JSON.parse(paises);

        dadosPaises.map(({ sigla, nome_pais }) => {
            const option = document.createElement("option");
            option.value = sigla;
            option.innerHTML = nome_pais;
            return option;
        }).forEach(option => select.appendChild(option));
    } catch (error) {
        alert("Erro ao gerar a tela, reinicie o processo");
    }
}

export function buscarDadosPais() {
    const siglaPais = document.getElementById("paises").value;
    const conteudo = document.getElementById("lista-paises");
    const pais = document.getElementById("pais");
    let paisEncontrado = 0;

    dadosPaises.forEach(({ sigla, nome_pais, gentilico, nome_pais_int }) => {
        if (siglaPais === sigla) {
            paisEncontrado++;
            conteudo.innerHTML = "";
            pais.innerHTML = "";

            const nomePais = document.createElement('li');
            nomePais.textContent = nome_pais;
            conteudo.appendChild(nomePais);

            const liGentilico = document.createElement('li');
            liGentilico.textContent = gentilico;
            conteudo.appendChild(liGentilico);

            const paisInt = document.createElement('li');
            paisInt.textContent = nome_pais_int;
            conteudo.appendChild(paisInt);

            const liSigla = document.createElement('li');
            liSigla.textContent = sigla;
            conteudo.appendChild(liSigla);
        }
    });

    if (paisEncontrado === 0) {
        pais.innerHTML = "<p style='text-align:center;'>País não encontrado</p>";
        conteudo.innerHTML = "";
    } else {
        pais.innerHTML = "";
    }
}
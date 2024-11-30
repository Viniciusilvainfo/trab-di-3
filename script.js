let dadosPaises;

window.onload = async function() {
    try {
        const select = document.getElementById("paises");
        const resposta = await fetch("./paises.json");
    
        let paises = await resposta.text();

        dadosPaises = JSON.parse(paises);

        //**map, filter ou reduce**
        //**Destructuring**
        dadosPaises.map(({ sigla, nome_pais }) => {
            const option = document.createElement("option");
            option.value = sigla;
            option.innerHTML = nome_pais;
            return option;
        }).forEach(option => select.appendChild(option));

    }catch(error) {
        alert("Erro ao gerar a tela reinicie o processo");
    }
};

async function buscarDadosPais() {
    const siglaPais = document.getElementById("paises").value;
    const conteudo = document.getElementById("lista-paises");
    const pais = document.getElementById("pais");
    var paisEncontrado = 0;

    dadosPaises.forEach(pais => {
        if(siglaPais == pais["sigla"]) {
            paisEncontrado++;
            conteudo.innerHTML = "";
            pais.innerHTML = "";

            let nomePais = document.createElement('li');
            nomePais.textContent = pais["nome_pais"];
            conteudo.appendChild(nomePais);

            let gentilico = document.createElement('li');
            gentilico.textContent = pais["gentilico"];
            conteudo.appendChild(gentilico);

            let paisInt = document.createElement('li');
            paisInt.textContent = pais["nome_pais_int"];
            conteudo.appendChild(paisInt);

            let sigla = document.createElement('li');
            sigla.textContent = pais["sigla"];
            conteudo.appendChild(sigla);
        }
    });

    if(paisEncontrado == 0) {
        pais.innerHTML = "<p style='text-align:center;'>País não encontrado</p>";
        conteudo.innerHTML = "";
    }else {
        pais.innerHTML = "";
    }
}

async function buscarDados() {
    const estado = document.getElementById("estado");
    const listaCidades = document.getElementById("lista-cidades");
    try {
        let ddd = document.getElementById("ddd").value;

        const resposta = await fetch("https://brasilapi.com.br/api/ddd/v1/"+ddd);

        if(resposta.status >= 400) {
            estado.innerHTML = "DDD não encontrado";
            listaCidades.innerHTML = "";
            return;
        }

        let dadosDDD = await resposta.text();

        dadosDDD = JSON.parse(dadosDDD);

        estado.innerHTML = "Estado - " + dadosDDD["state"];

        dadosDDD["cities"].forEach(cidade => {
            const li = document.createElement('li');
            li.textContent = cidade;
            listaCidades.appendChild(li);
        });
    }catch(error) {
        estado.innerHTML = "Erro ao obter os dados informe outro ddd";

        listaCidades.innerHTML = "";
    }
}
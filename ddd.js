export async function buscarDados() {
    const estado = document.getElementById("estado");
    const listaCidades = document.getElementById("lista-cidades");

    try {
        const ddd = document.getElementById("ddd").value;
        const resposta = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);

        if (resposta.status >= 400) {
            estado.innerHTML = "DDD não encontrado";
            listaCidades.innerHTML = "";
            return;
        }

        const { state, cities } = await resposta.json();

        estado.innerHTML = `Estado - ${state}`;

        cities.forEach(cidade => {
            const li = document.createElement('li');
            li.textContent = cidade;
            listaCidades.appendChild(li);
        });
    } catch (error) {
        estado.innerHTML = "Erro ao obter os dados. Informe outro DDD.";
        listaCidades.innerHTML = "";
    }
}
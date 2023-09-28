document.getElementById('adicionar-filme-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const diretor = event.target.diretor.value;

    try {
        const response = await fetch('/adicionar-filme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, diretor })
        });
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        resultDiv.innerText = data.message;
        resultDiv.classList.remove('alert-danger', 'alert-success');
        resultDiv.classList.add(data.success ? 'alert-success' : 'alert-danger');
        resultDiv.style.display = 'block';

        if (data.success) {
            const tbody = document.getElementById('filme-list');
            const newRow = document.createElement('tr');
            const nomeFilme = document.createElement('td');
            const diretorFilme = document.createElement('td');

            nomeFilme.innerText = nome;
            diretorFilme.innerText = diretor;

            newRow.appendChild(nomeFilme);
            newRow.appendChild(diretorFilme);
            tbody.appendChild(newRow);
        }

    } catch (error) {
        console.error("Erro ao adicionar filme:", error);
    }
});

document.getElementById('buscar-diretor-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('buscar-nome').value;

    try {
        const response = await fetch(`/buscar-diretor/${nome}`);
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        if (data.success) {
            resultDiv.innerText = `O diretor do filme ${nome}: ${data.diretor}`;
            resultDiv.classList.add('alert-success');
            resultDiv.classList.remove('alert-danger');
        } else {
            resultDiv.innerText = data.message;
            resultDiv.classList.remove('alert-success');
            resultDiv.classList.add('alert-danger');
        }
        resultDiv.style.display = 'block';
    } catch (error) {
        console.error("Erro ao buscar diretor:", error);
    }
});

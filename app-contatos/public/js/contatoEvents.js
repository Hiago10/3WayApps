document.getElementById('adicionar-contato-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const numero = event.target.numero.value;

    try {
        const response = await fetch('/adicionar-contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, numero })
        });
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        resultDiv.innerText = data.message;
        resultDiv.classList.remove('alert-danger', 'alert-success');
        resultDiv.classList.add(data.success ? 'alert-success' : 'alert-danger');
        resultDiv.style.display = 'block';

        if (data.success) {
            const tbody = document.getElementById('contato-list');
            const newRow = document.createElement('tr');
            const nomeCell = document.createElement('td');
            const numeroCell = document.createElement('td');

            nomeCell.innerText = nome;
            numeroCell.innerText = numero;

            newRow.appendChild(nomeCell);
            newRow.appendChild(numeroCell);
            tbody.appendChild(newRow);
        }

    } catch (error) {
        console.error("Erro ao adicionar contato:", error);
    }
});

document.getElementById('buscar-numero-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('buscar-nome').value;

    try {
        const response = await fetch(`/buscar-numero/${nome}`);
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        if (data.success) {
            resultDiv.innerText = `Contato para ${nome}: ${data.numero}`;
            resultDiv.classList.add('alert-success');
            resultDiv.classList.remove('alert-danger');
        } else {
            resultDiv.innerText = data.message;
            resultDiv.classList.remove('alert-success');
            resultDiv.classList.add('alert-danger');
        }
        resultDiv.style.display = 'block';
    } catch (error) {
        console.error("Erro ao buscar numero:", error);
    }
});

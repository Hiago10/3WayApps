document.getElementById('adicionar-livro-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const autor = event.target.autor.value;

    try {
        const response = await fetch('/adicionar-livro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, autor })
        });
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        resultDiv.innerText = data.message;
        resultDiv.classList.remove('alert-danger', 'alert-success');
        resultDiv.classList.add(data.success ? 'alert-success' : 'alert-danger');
        resultDiv.style.display = 'block';

        if (data.success) {
            const tbody = document.getElementById('livro-list');
            const newRow = document.createElement('tr');
            const nomeLivro = document.createElement('td');
            const autorLivro = document.createElement('td');

            nomeLivro.innerText = nome;
            autorLivro.innerText = autor;

            newRow.appendChild(nomeLivro);
            newRow.appendChild(autorLivro);
            tbody.appendChild(newRow);
        }

    } catch (error) {
        console.error("Erro ao adicionar livro:", error);
    }
});

document.getElementById('buscar-autor-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('buscar-nome').value;

    try {
        const response = await fetch(`/buscar-autor/${nome}`);
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        if (data.success) {
            resultDiv.innerText = `O Autor do Livro ${nome}: ${data.autor}`;
            resultDiv.classList.add('alert-success');
            resultDiv.classList.remove('alert-danger');
        } else {
            resultDiv.innerText = data.message;
            resultDiv.classList.remove('alert-success');
            resultDiv.classList.add('alert-danger');
        }
        resultDiv.style.display = 'block';
    } catch (error) {
        console.error("Erro ao buscar autor:", error);
    }
});

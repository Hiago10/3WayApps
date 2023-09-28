const { pool } = require('../config/db');

async function adicionar(nome, diretor) {
    const [registros] = await pool.execute('INSERT INTO filmes (nome, diretor) VALUES (?, ?)', [nome, diretor]);
    return registros;
}

async function buscarDiretorPorNome(nome) {
    const [registros] = await pool.execute('SELECT diretor FROM filmes WHERE nome = ?', [nome]);
    return registros;
}

module.exports = { adicionar, buscarDiretorPorNome };

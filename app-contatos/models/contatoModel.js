const { pool } = require('../config/db');

async function adicionar(nome, numero) {
    const [registros] = await pool.execute('INSERT INTO contatos (nome, numero) VALUES (?, ?)', [nome, numero]);
    return registros;
}

async function buscarNumeroPorNome(nome) {
    const [registros] = await pool.execute('SELECT numero FROM contatos WHERE nome = ?', [nome]);
    return registros;
}

module.exports = { adicionar, buscarNumeroPorNome };

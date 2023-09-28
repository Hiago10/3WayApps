const { pool } = require('../config/db');

async function adicionar(nome, autor) {
    const [registros] = await pool.execute('INSERT INTO livros (nome, autor) VALUES (?, ?)', [nome, autor]);
    return registros;
}

async function buscarAutorPorNome(nome) {
    const [registros] = await pool.execute('SELECT autor FROM livros WHERE nome = ?', [nome]);
    return registros;
}

module.exports = { adicionar, buscarAutorPorNome };

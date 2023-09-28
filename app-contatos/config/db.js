const { createPool } = require('mysql2/promise');

const {
    MYSQL_HOST: HOST,
    MYSQL_USER: USER,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_DB: DB
} = process.env;

const pool = createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB
});

async function createTableIfNotExists() {
    return new Promise(async (resolve, reject) => {
        try {
            await pool.execute(`
                CREATE TABLE IF NOT EXISTS contatos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nome VARCHAR(255) NOT NULL,
                    numero VARCHAR(255) NOT NULL
                )
            `);
            console.log("Tabela 'contatos' está pronta ou já foi criada.");
            resolve();
        } catch (error) {
            console.error("Erro ao criar tabela 'contatos':", error.message);
            reject(error);
        }
    });
}

module.exports = { pool, createTableIfNotExists };

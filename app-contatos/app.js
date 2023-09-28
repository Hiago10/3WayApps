const express = require('express');
const contatoRoutes = require('./routes/contatoRoutes');
const { createTableIfNotExists } = require('./config/db');
const path = require('path'); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(contatoRoutes);

app.listen(PORT, async () => {
    console.log(`Servidor na porta: ${PORT}`);
    try {
        await createTableIfNotExists();
    } catch (error) {
        console.error("Erro ao inicializar a tabela:", error.message);

        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
});
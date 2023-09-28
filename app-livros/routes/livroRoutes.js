const express = require('express');
const path = require('path');
const router = express.Router();
const livroModel = require('../models/livroModel');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/adicionar-livro', async (req, res) => {
    try {
        const { nome, autor } = req.body;
        await livroModel.adicionar(nome, autor);
        res.json({ success: true, message: 'livro adicionado!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/buscar-autor/:nome', async (req, res) => {
    try {
        const nome = req.params.nome;
        const registros = await livroModel.buscarAutorPorNome(nome);

        if (registros.length > 0) {
            res.json({ success: true, autor: registros[0].autor });
        } else {
            res.status(404).json({ success: false, message: 'livro não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

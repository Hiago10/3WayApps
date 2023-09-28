const express = require('express');
const path = require('path');
const router = express.Router();
const contatoModel = require('../models/contatoModel');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/adicionar-contato', async (req, res) => {
    try {
        const { nome, numero } = req.body;
        await contatoModel.adicionar(nome, numero);
        res.json({ success: true, message: 'Contato adicionado!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/buscar-numero/:nome', async (req, res) => {
    try {
        const nome = req.params.nome;
        const registros = await contatoModel.buscarNumeroPorNome(nome);

        if (registros.length > 0) {
            res.json({ success: true, numero: registros[0].numero });
        } else {
            res.status(404).json({ success: false, message: 'Contato não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

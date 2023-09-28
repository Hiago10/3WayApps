const express = require('express');
const path = require('path');
const router = express.Router();
const filmeModel = require('../models/filmeModel');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/adicionar-filme', async (req, res) => {
    try {
        const { nome, diretor } = req.body;
        await filmeModel.adicionar(nome, diretor);
        res.json({ success: true, message: 'filme adicionado!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/buscar-diretor/:nome', async (req, res) => {
    try {
        const nome = req.params.nome;
        const registros = await filmeModel.buscarDiretorPorNome(nome);

        if (registros.length > 0) {
            res.json({ success: true, diretor: registros[0].diretor });
        } else {
            res.status(404).json({ success: false, message: 'filme não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

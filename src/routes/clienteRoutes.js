// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const ClienteController = require('../controllers/clienteController');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /clientes - Listar todos os clientes
router.get('/', ClienteController.listarTodos);

// GET /clientes/nome/:nome - Buscar clientes por nome
router.get('/nome/:nome', ClienteController.buscarPorNome);

// GET /clientes/:id - Buscar cliente específico por ID
router.get('/:id', ClienteController.buscarPorId);

// POST /clientes - Criar novo cliente
router.post('/', ClienteController.criar);

// PUT /clientes/:id - Atualizar cliente completo
router.put('/:id', ClienteController.atualizar);

// DELETE /clientes/:id - Deletar cliente
router.delete('/:id', ClienteController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
// ============================================================
// APP.JS - Arquivo Principal com dotenv (API de Clientes)
// ============================================================

// Carregar variáveis de ambiente ANTES de tudo
require('dotenv').config();

const express = require('express');
const app = express();

// Porta vem do .env, ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARES
// ============================================================

// Middleware para processar JSON no body das requisições
app.use(express.json());

// ============================================================
// ROTAS
// ============================================================

// Importar as rotas de clientes
const clienteRoutes = require('./src/routes/clienteRoutes');
app.use('/clientes', clienteRoutes);

// ============================================================
// ROTA RAIZ (Boas-vindas)
// ============================================================
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Clientes com PostgreSQL',
    versao: '1.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL'
  });
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
  console.log('📋 Rotas disponíveis:');
  console.log(`   GET    http://localhost:${PORT}/clientes`);
  console.log(`   GET    http://localhost:${PORT}/clientes/:id`);
  console.log(`   GET    http://localhost:${PORT}/clientes/nome/:nome`);
  console.log(`   POST   http://localhost:${PORT}/clientes`);
  console.log(`   PUT    http://localhost:${PORT}/clientes/:id`);
  console.log(`   DELETE http://localhost:${PORT}/clientes/:id`);
  console.log('='.repeat(50));
});
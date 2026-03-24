// ============================================================
// CONFIGURAÇÃO DO BANCO DE DADOS PostgreSQL COM DOTENV
// ============================================================

require('dotenv').config();
const { Pool } = require('pg');

// ============================================================
// CONFIGURAR O POOL DE CONEXÕES
// ============================================================
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,       // deve ser "api_clientes" no seu .env
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

// ============================================================
// TESTAR CONEXÃO
// ============================================================
pool.connect((erro, client, release) => {
  if (erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro.message);
    console.error('💡 Verifique suas credenciais no arquivo .env');
  } else {
    console.log('✅ Conectado ao PostgreSQL!');
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();
  }
});

// ============================================================
// CRIAR TABELA AUTOMATICAMENTE
// ============================================================
const criarTabela = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS clientes (
      id          SERIAL PRIMARY KEY,
      nome        VARCHAR(255)   NOT NULL,
      cpf         VARCHAR(14)    NOT NULL UNIQUE,
      telefone    VARCHAR(20)    NOT NULL,
      email       VARCHAR(255)   NOT NULL UNIQUE,
      datanasc    DATE           NOT NULL,
      rua         VARCHAR(255)   NOT NULL,
      numerocasa  VARCHAR(10)    NOT NULL,
      bairro      VARCHAR(100)   NOT NULL
    )
  `;
  
  try {
    await pool.query(sql);
    console.log('✅ Tabela clientes verificada/criada');
  } catch (erro) {
    console.error('❌ Erro ao criar tabela:', erro.message);
  }
};

criarTabela();

// ============================================================
// EXPORTAR O POOL
// ============================================================
module.exports = pool;
// Importar o pool de conexões do PostgreSQL
const pool = require('../config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todos os clientes do banco
// RETORNO: Promise com array de clientes
// ============================================================
async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM clientes ORDER BY id'
  );
  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca um cliente específico
// PARÂMETRO: id (número)
// RETORNO: Promise com o cliente ou undefined
// ============================================================
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM clientes WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: criar
// DESCRIÇÃO: Insere um novo cliente no banco
// PARÂMETRO: dados (objeto)
// RETORNO: Promise com o cliente criado (incluindo o ID)
// ============================================================
async function criar(dados) {
  const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } = dados;

  const sql = `
    INSERT INTO clientes (nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const result = await pool.query(sql, [
    nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro
  ]);

  return result.rows[0];
}

// ============================================================
// FUNÇÃO: atualizar
// DESCRIÇÃO: Atualiza todos os dados de um cliente
// PARÂMETROS: id, dados
// RETORNO: Promise com cliente atualizado ou null
// ============================================================
async function atualizar(id, dados) {
  const { nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro } = dados;

  const sql = `
    UPDATE clientes
    SET nome = $1, cpf = $2, telefone = $3, email = $4, datanasc = $5, rua = $6, numeroCasa = $7, bairro = $8
    WHERE id = $9
    RETURNING *
  `;

  const result = await pool.query(sql, [
    nome, cpf, telefone, email, datanasc, rua, numeroCasa, bairro, id
  ]);

  return result.rows[0] || null;
}

// ============================================================
// FUNÇÃO: deletar
// DESCRIÇÃO: Remove um cliente do banco
// PARÂMETRO: id (número)
// RETORNO: Promise com true/false
// ============================================================
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM clientes WHERE id = $1',
    [id]
  );
  return result.rowCount > 0;
}

// ============================================================
// FUNÇÃO: buscarPorNome
// DESCRIÇÃO: Filtra clientes pelo nome
// PARÂMETRO: nome (string)
// RETORNO: Promise com array de clientes
// ============================================================
async function buscarPorNome(nome) {
  const sql = 'SELECT * FROM clientes WHERE nome ILIKE $1';
  const result = await pool.query(sql, [`%${nome}%`]);
  return result.rows;
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorNome
};
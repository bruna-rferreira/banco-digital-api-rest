const express = require('express');
const rotas = express();
const {listarConta, criarConta, excluirConta, atualizarConta, mostrarSaldo, mostrarExtrato} = require('./controladores/contas')
const { depositar, sacar, transferir } = require('./controladores/transacoes')

rotas.get('/contas', listarConta); // Listar contas bancárias
rotas.post('/contas', criarConta); // Criar conta bancária 
rotas.put('/contas/:numeroConta/usuarios', atualizarConta); // Atualizar usuário
rotas.delete('/contas/:numeroConta', excluirConta); // Excluir conta bancária 
rotas.post('/transacoes/depositar', depositar); // Depositar valor na conta
rotas.post('/transacoes/sacar', sacar); // Sacar valores da conta
rotas.post('/transacoes/transferir', transferir); // Transferir valores entre contas
rotas.get('/contas/saldo', mostrarSaldo); // Mostrar saldo atual da conta
rotas.get('/contas/extrato', mostrarExtrato) // Mostrar extrato da conta

module.exports = rotas;
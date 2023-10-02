# API Banco Digital

## Sobre o projeto
Este projeto é resultado do Desafio do Módulo 2 do curso de Backend da Cubos Academy, no qual desenvolvi uma API REST de um banco digital. Foi desenvolvido com Javascript, Node.js e os pacotes Express.js e nodemon.

## Funcionalidades

- Listar contas bancárias
- Criar uma nova conta
- Fazer atualizações em uma conta existente
- Excluir uma conta
- Fazer depósitos
- Fazer saques
- Realizar transferências entre contas
- Visualizar saldo
- Ver o extrato bancário

## Execução do Projeto

Para executar este projeto, siga os passos abaixo:

1. Clone este repositório.
2. Instale as dependências necessárias com o comando: npm install.
3. Inicie a aplicação com: `npm run dev`.

## Endpoints da API
Aqui estão os endpoints disponíveis na API:

### Listar contas bancárias
- Método: GET
- Rota: /contas
- Parâmetros: senha_banco - Senha do banco para autenticação
- Descrição: Lista todas as contas bancárias existentes.

### Criar conta bancária
- Método: POST
- Rota: /contas
- Descrição: Cria uma conta bancária, gerando um número único de identificação.
  
### Atualizar usuário da conta bancária
- Método: PUT
- Rota: /contas/:numeroConta/usuario
- Descrição: Atualiza os dados do usuário de uma conta bancária específica.

### Excluir Conta
- Método: DELETE
- Rota: /contas/:numeroConta
- Descrição: Exclui uma conta bancária existente.

### Depositar
- Método: POST
- Rota: /transacoes/depositar
- Descrição: Realiza um depósito em uma conta válida e registra a transação.

### Sacar
- Método: POST
- Rota: /transacoes/sacar
- Descrição: Realiza um saque em uma conta bancária e registra a transação.

### Transferir
- Método: POST
- Rota: /transacoes/transferir
- Descrição: Permite a transferência de recursos entre contas bancárias e registra a transação.

### Saldo
- Método: GET
- Rota: /contas/saldo
- Parâmetros: numero_conta - Número da conta, senha - Senha do usuário
- Descrição: Retorna o saldo de uma conta bancária.

### Extrato
- Método: GET
- Rota: /contas/extrato
- Parâmetros: numero_conta - Número da conta, senha - Senha do usuário
- Descrição: Lista as transações realizadas em uma conta específica.

## Autora

[Bruna Rodrigues Ferreira](https://github.com/bruna-rferreira)

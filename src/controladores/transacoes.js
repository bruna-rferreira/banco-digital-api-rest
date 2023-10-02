const {contas, depositos, saques, transferencias} = require('../bancodedados');


// DEPOSITAR NA CONTA
const depositar = (req, res) => {
    const {numero_conta, valor} = req.body;

    // Validação se foi informado número da conta e valor 
    if (!numero_conta){
        return res.status(400).json({mensagem: 'O numero da conta deve ser informado.'});
    }
    if (!valor){
        return res.status(400).json({mensagem: 'O valor deve ser informado.'});
    }

    // Validação se o número da conta existe
    const contaExistente = contas.find(conta => conta.numero  === Number(numero_conta));

    if (!contaExistente) {
        return res.status(404).json({mensagem: 'Conta não encontrada!'});
    }

    // Validação se o valor informando é menor ou igual a 0 
    if (valor <= 0) {
        return res.status(404).json({mensagem: 'Não é permitido valores igual ou menor que zero'});
    }

    // Somando o valor do deposito da conta
    contaExistente.saldo += valor;

    // Registro do valores de deposito
    const dataDeposito = new Date ();
    const registroDeposito = {
        data: dataDeposito, 
        numero_conta,
        valor
    }

    depositos.push(registroDeposito); // registro de deposito
    return res.status(200).json(registroDeposito);
    
}

// SACAR VALOR DA CONTA
const sacar = (req, res) => {
    const {numero_conta, valor, senha} = req.body;
    
    // Validação se foi informado número da conta e valor 
    if (!numero_conta){
        return res.status(400).json({mensagem: 'O numero da conta deve ser informado.'});
    }
    if (!valor){
        return res.status(400).json({mensagem: 'O valor deve ser informado.'});
    }
    if (!senha){
        return res.status(400).json({mensagem: 'O da senha deve ser informado.'});
    }

    // Validação se o número da conta existe
    const contaExistente = contas.find(conta => conta.numero  === Number(numero_conta));

    if (!contaExistente) {
        return res.status(404).json({mensagem: 'Conta não encontrada!'});
    }

    // Validação de senha 
    if (contaExistente.usuario.senha !== senha) {
        return res.status(404).json({mensagem: 'Senha incorreta!'});
    }

    // Verificação se o valor do saldo é menor ou igual ao valor a ser sacado
    if (contaExistente.saldo < valor) {
        return res.status(404).json({mensagem: 'Saldo insuficiente!'});
    }

    // Subtraindo o valor de saque da conta
    contaExistente.saldo -= valor;

    const dataSaque = new Date ();
    const registroSaque = {
        data: dataSaque, 
        numero_conta,
        valor
    }

    saques.push(registroSaque); // registro de saque
    return res.status(200).json(registroSaque);
    
}

// TRANSFERIR VALORES ENTRE CONTAS 
const transferir = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    // Validação se foi informado número da conta e valor 
    if (!numero_conta_origem){
        return res.status(400).json({mensagem: 'O numero da conta deve ser informado.'});
    }
    if (!numero_conta_destino){
        return res.status(400).json({mensagem: 'O numero da conta deve ser informado.'});
    }
    if (!valor){
        return res.status(400).json({mensagem: 'O valor deve ser informado.'});
    }
    if (!senha){
        return res.status(400).json({mensagem: 'O da senha deve ser informado.'});
    }

    // Validação se o número da conta de origem existe
    const contaExistenteOrigem = contas.find(conta => conta.numero  === Number(numero_conta_origem));

    if (!contaExistenteOrigem) {
        return res.status(404).json({mensagem: 'Conta de origem não encontrada!'});
    }

     // Validação se o número da conta de destino existe
     const contaExistenteDestino = contas.find(conta => conta.numero  === Number(numero_conta_destino));

     if (!contaExistenteDestino) {
         return res.status(404).json({mensagem: 'Conta de destino não encontrada!'});
     }

    // Validação de senha da conta de origem
     if (contaExistenteOrigem.usuario.senha !== senha) {
        return res.status(404).json({mensagem: 'Senha da conta de origem incorreta!'});
    }

    // Verificação se o valor do saldo é menor ou igual ao valor a ser sacado
    if (contaExistenteOrigem.saldo < valor) {
        return res.status(404).json({mensagem: 'Saldo da conta de origem insuficiente!'});
    }

    // Subtraindo valor da conta de origem
    contaExistenteOrigem.saldo -= valor;
    // Somando valor na conta de destino
    contaExistenteDestino.saldo += valor;

    const dataTransferencia = new Date ();
    const registroTransferencia = {
        data: dataTransferencia, 
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registroTransferencia); // Registro de saque da conta de Origem
    return res.status(200).json(registroTransferencia);
}

module.exports = {
    depositar,
    sacar,
    transferir
}
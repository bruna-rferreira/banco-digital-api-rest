const {contas, depositos, saques, transferencias} = require('../bancodedados');

let numeroProximaContaCriada = 1;


// LISTAR CONTAS
const listarConta = (req, res) => {
    return res.json(contas);
}

//  CRIAR CONTA
const criarConta = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    const novaConta = req.body;
    const saldo = 0;

    // validação campos obrigatórios 
    if (!nome){
        return res.status(400).json({mensagem: 'O nome deve ser informado.'});
    }
    if (!cpf){
        return res.status(400).json({mensagem: 'O CPF deve ser informado.'});
    }
    if (!data_nascimento){
        return res.status(400).json({mensagem: 'A data de nascimento deve ser informado.'});
    }
    if (!telefone){
        return res.status(400).json({mensagem: 'O telefone deve ser informado.'});
    }
    if (!email){
        return res.status(400).json({mensagem: 'O email deve ser informado.'});
    }
    if (!senha){
        return res.status(400).json({mensagem: 'A senha deve ser informado.'});
    }

    // validação de CPF e email únicos 
    for (let i = 0; i < contas.length; i++) {
        if ((novaConta.cpf === contas[i].usuario.cpf) || (novaConta.email === contas[i].usuario.email)) {
            return res.status(400).json({ message: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }
    }

    const novaContaCadastrar = {
        numero: numeroProximaContaCriada,
        saldo,
        usuario: novaConta
    }

    contas.push(novaContaCadastrar);

    numeroProximaContaCriada++

    return res.status(201).send();

}

// ATUALIZAR CONTA

const atualizarConta = (req, res) => {
    const {numeroConta} = req.params;
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    const novosDadosConta = req.body;

    // Validção todos os campos obrigatórios
    if (!nome){
        return res.status(400).json({mensagem: 'O nome deve ser informado.'});
    }
    if (!cpf){
        return res.status(400).json({mensagem: 'O CPF deve ser informado.'});
    }
    if (!data_nascimento){
        return res.status(400).json({mensagem: 'A data de nascimento deve ser informado.'});
    }
    if (!telefone){
        return res.status(400).json({mensagem: 'O telefone deve ser informado.'});
    }
    if (!email){
        return res.status(400).json({mensagem: 'O email deve ser informado.'});
    }
    if (!senha){
        return res.status(400).json({mensagem: 'A senha deve ser informado.'});
    }

    // Validação do número da conta passado
    const contaExistente = contas.find(conta => conta.numero  === Number(numero_conta));

    if (!contaExistente) {
        return res.status(404).json({mensagem: 'Conta não encontrada!'});
    }

    // Verificação se CPF e Email já existem em outra conta
    for (let i = 0; i < contas.length; i++) {
        if ((novosDadosConta.cpf === contas[i].usuario.cpf) || (novosDadosConta.email === contas[i].usuario.email)) {
            return res.status(400).json({ message: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }
    }

    // Atualização dos dados
    contaExistente.usuario.nome = nome;
    contaExistente.usuario.cpf = cpf;
    contaExistente.usuario.data_nascimento = data_nascimento;
    contaExistente.usuario.telefone = telefone;
    contaExistente.usuario.email = email;
    contaExistente.usuario.senha = senha;

    return res.json({mensagem: "Conta atualizada!"})
}

// EXCLUIR CONTA

const excluirConta = (req, res) => {
    const numeroConta = Number(req.params.numeroConta);

    //Validação se o número informado é válido
    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: "O número da conta não é um número válido" });
      }

    // Validação se o número da conta é existente
    const indiceContaExclusao = contas.findIndex(conta => conta.numero === numeroConta);

    if (indiceContaExclusao < 0) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    // Validação para verificar se o saldo da conta é 0
    const contaASerExcluida = contas[indiceContaExclusao];

    if (contaASerExcluida.saldo !== 0) {
      return res.status(400).json({
        mensagem: "A conta só pode ser removida se o saldo for zero!",
      });
    }

    contas.splice(indiceContaExclusao, 1)[0];

    return res.status(200).json({ mensagem: "Conta excluída com sucesso." });
}

// MOSTRAR SALDO DA CONTA 
const mostrarSaldo = (req, res) => {
    const {numero_conta, senha} = req.query;

    // Validção todos os campos obrigatórios
    if (!numero_conta){
        return res.status(400).json({mensagem: 'O numero da conta deve ser informado.'});
    }
    if (!senha){
        return res.status(400).json({mensagem: 'A senha da conta deve ser informado.'});
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

    return res.status(200).json(`Saldo: ${contaExistente.saldo}`);
}

// EXTRATO DA CONTA
const mostrarExtrato = (req, res) => {
    const {numero_conta, senha} = req.query;

    // Validção todos os campos obrigatórios
    if (!numero_conta){
        return res.status(400).json({mensagem: 'O numero da conta deve ser informado.'});
    }
    if (!senha){
        return res.status(400).json({mensagem: 'A senha da conta deve ser informado.'});
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


    const extratoSaque = saques.filter((saque) => {
        return saque.numero_conta === numero_conta;

    })

    const extratoDeposito = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;

    })

    const extratoTransferenciaEnviada = transferencias.filter((transferenciaEnviada) => {
        return transferenciaEnviada.numero_conta_origem === numero_conta;

    })

    const extratoTransferenciaRecebida = transferencias.filter((transferenciaRecebida) => {
        return transferenciaRecebida.numero_conta_destino === numero_conta;

    })

    const extratoCompleto = {
        saques: extratoSaque,
        depositos: extratoDeposito,
        transferenciasEnviadas: extratoTransferenciaEnviada,
        transferenciasRecebidas: extratoTransferenciaRecebida
    };

    res.status(200).json(extratoCompleto);
}

module.exports = {
    listarConta,
    criarConta,
    atualizarConta,
    excluirConta,
    mostrarSaldo,
    mostrarExtrato
}


/* Queria colocar as validações dentro dos intermediários porém quando fui tentar fazer o código parou de funcionar, preferi deixar assim e entregar o desafio
 mas em paralelo estou tentando melhorar o código */
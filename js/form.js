var botaoAdicionar = document.querySelector("#adicionar-encomenda");

botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    //Captura o formulário
    var form = document.querySelector("#form-adiciona");
    
    //Captura as informações da encomenda
    var encomenda = obtemEncomenda(form);
    // Valida os campos preenchidos
    var validacao = validaEncomenda(encomenda);

    if (validacao.length > 0) {
        //Exibe os erros de preenchimento do formulario 
        exibeMensagensErro(validacao);
        return;
    }
    else{
        adicionaEncomendaNaTabela(encomenda);
    }
    //Insere a nova encomenda a tabela
    
    //Captura a tabela de encomendas
    var tabela = document.querySelector("#tabela-clientes");

    //Prepara e insere a nova linha na tabela
    // tabela.appendChild(montaTr(obtemEncomenda(form)));

    //Limpa formulario 
    form.reset();
    document.querySelector("#mensagem-erro");

})

function adicionaEncomendaNaTabela(encomenda){
    var encomendaTr = montaTr(encomenda);
    var tabela = document.querySelector("#tabela-clientes");
    var resultado = document.querySelector("#result");
    resultadoPercent.textContent = CalculaPorcentagem();
    tabela.appendChild(encomendaTr);
    //Resultados do calculo
    resultado.textContent = Calcula();
    console.log(resultado);
    //Porcentagem
    resultadoPercent.textContent = CalculaPorcentagem();
}

//Captura os dados da encomenda
function obtemEncomenda(form) {

    var encomenda = {
        nome: form.nome.value,
        qtde: form.qtdeIns.value,
        Embalagem: form.qtdeEmb.value,
        unitario: form.unitario.value,
    }
    return encomenda;
    
}

function montaTr(encomenda) {
    //Cria a nova linha da tabela
    var encomendaTr = document.createElement("tr");
    //Monta a nova linha
    encomendaTr.appendChild(montaTd(encomenda.nome,false));
    encomendaTr.appendChild(montaTd(encomenda.qtde,false));
    encomendaTr.appendChild(montaTd(encomenda.Embalagem,false));
    encomendaTr.appendChild(montaTd(formataValor(encomenda.unitario),false));
    encomendaTr.appendChild(montaTd(calculaTotal(encomenda.qtde,encomenda.Embalagem,encomenda.unitario),true));
    console.log("executado");
    console.log(encomendaTr);
    return encomendaTr;
}

function montaTd(dados,id) {
  
    var td = document.createElement("td");
    td.textContent = dados;
    //limpa a erros
    var ul = document.querySelector("#mensagens-erro")
    ul.innerHTML = "";
    
    if (id == true){
        td.id = 'Valor-Total';
    }
    return td;
}

// funcao para validar os dados preenchidos no formulario 
function validaEncomenda(encomenda) {
    var erros = [];

    if (!validaQtde(encomenda.qtde)) {
        erros.push("A quantidade é invalida.");
    }

    if (!validaUnitario(encomenda.unitario)) {
        erros.push("O valor unitário é invalido ");
    }
    if(!validaEmbalagem(encomenda.Embalagem,encomenda.qtde)){
        erros.push("O valor da embalagem está errado ");
    }

    return erros;
}

// Função para exibir os erros de preenchimento do formulario 
function exibeMensagensErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    //limpa a ul
    ul.innerHTML = "";
    if (isNaN(erros)) {

        erros.forEach(function (erro) {
            var li = document.createElement("li");
            li.textContent = erro;
            ul.appendChild(li);
        });
    }
}

  
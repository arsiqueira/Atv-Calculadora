
function Calcula() {
    var tabela = document.querySelectorAll("#Valor-Total");
    
    if (tabela.length > 0) {
    var soma = 0;


        for (var i = 0; i < tabela.length; i++) {
            var elemento = tabela[i];
            var texto = TrataValores(elemento.innerText);
            soma += texto;
        }
        console.log(parseInt(Arrendondar(soma)));
        return parseInt(Arrendondar(soma)); 
    }

}
function CalculaPorcentagem(){
    var percent = document.querySelector("#form-percent");
    var porcentagem = (parseInt(percent.porcentagem.value))/100;
    var calculo = Calcula(); 
    console.log("seu calculo foi: ",calculo);
    console.log("Sua porcentagem foi: ",porcentagem);
    console.log("Calculo: ",(calculo * porcentagem) + calculo);
    porcentagem = Arrendondar(((porcentagem) * calculo)+calculo);
    return porcentagem;
}
function TrataValores(valor) {

    // Remover o símbolo de R$ e as vírgulas
    var valorSemSimbolo = valor.replace('R$', '').replace('.','');
    console.log(valorSemSimbolo);
    // Converter para inteiro
    var numero = parseInt(valorSemSimbolo);
    return numero;
}

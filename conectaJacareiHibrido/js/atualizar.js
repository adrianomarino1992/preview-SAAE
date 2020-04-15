

var img_voltar = $('#img_voltar');
img_voltar.on('click', () => {
    window.location = "menu.html";
})

var img_more = $('#ajuda');
img_more.on('click', () => {
    $('#menu_ajuda').slideToggle();
})



$('#btn_cadastrar').on('click', () => {
    
    var nome = $('#nome').val().toString();
    var cpf = $('#cpf').val().toString();
    var senha = $('#senha').val().toString();
    var email = $('#email').val().toString();
    var celular = $('#celular').val().toString();
    var nascimento = $('#nascimento').val().toString();
    var cep = $('#cep').val().toString();
    var bairro = $('#bairro').val().toString();
    var rua = $('#rua').val().toString();
    var numero = $('#numero').val().toString();
    var complemento = $('#complemento').val().toString();


    window.location = "triggerAtualizar?nome:" + nome + ";cpf:" + cpf + ";senha:" + senha + ";email:" + email + ";celular:"
        + celular + ";nascimento:" + nascimento + ";cep:" + cep + ";bairro:" + bairro + ";rua:" + rua + ";numero:" + numero + ";complemento:" + complemento + ";fim";


});


function inicializarAtualizar(nome, cpf, senha, email, celular, nascimento, cep, bairro, rua, numero, complemento) {
    $('#nome').val(nome);
    $('#cpf').val(cpf);
    $('#senha').val(senha);
    $('#email').val(email);
    $('#celular').val(celular);
    $('#nascimento').val(nascimento);
    $('#cep').val(cep);
    $('#bairro').val(bairro);
    $('#rua').val(rua);
    $('#numero').val(numero);
    $('#complemento').val(complemento);
}

var wasStarted = 0;

$(document).ready(() => {

    if (wasStarted % 2 == 0) {       

        window.location = "iniciarPaginaAtualizar?";

        wasStarted++;
    }
    
});

//function alerta(texto) {
//    $('#senha').val(texto);
//}
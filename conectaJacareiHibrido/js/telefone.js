$(document).ready(() => {

    window.location = "triggerTelefones?";
})

var ul_corpo = $('#ul_corpo');
var numeros = [];

function addTelefones(nome,numero) {

    if (jQuery.inArray(numero, numeros) == -1) {
        ul_corpo.append("<li onclick='TelefoneSelecionado(event)'><h2>" + nome + "</h2><h3 style='color:black;' >" + numero + "</h3></li>");
        numeros.push(numero);
   }
}

var img_more = $('#ajuda');
img_more.on('click', () => {
    $('#menu_ajuda').slideToggle();
})


var img_voltar = $('#img_voltar');
img_voltar.on('click', () => {
    window.location = "menu.html";
})


function TelefoneSelecionado(event) {
    var telClicked = $(event.target);
    var numero = $($($(telClicked).parent()).find('h3')).text();
    numero = numero.replace('-', '');
    window.location = "triggerTelefoneSelecionado?numero:"+numero+";fim";
}

var protocoloP = $('#protocolo');
var statusP = $('#status');
var fotoP = $('#foto');
var enderecoP = $('#endereco');
var categoriaP = $('#categoria');
var subcategoriaP = $('#subcategoria');
var descricaoP = $('#descricao');
var btn_deletar = $('#img_deletar');
var situacao;
var btn_img_finalizar = $('#img_finalizar');
var btn_img_deletar = $('#img_deletar');
var alertDialog = $('#alertDialog');

var img_more = $('#ajuda');
img_more.on('click', () => {
    $('#menu_ajuda').slideToggle();
})


$(document).ready(() => {
    window.location = "triggerViewDenunciaOpened?";
})

function openViewOcorrencia(protocolo, status, foto, endereco, categoria, subcategoria, descricao) {

    $(protocoloP).text(protocolo);
    $(statusP).text(status);
    $(fotoP).attr('src', 'data:image/jpeg;base64, ' + foto);
    $('#img_zoom').attr('src', 'data:image/jpeg;base64, ' + foto);
    $(enderecoP).text(endereco);
    $(categoriaP).text(categoria);
    $(subcategoriaP).text(subcategoria);
    $(descricaoP).text(descricao);
    situacao = status;
    if (situacao == "RECEBIDO" || situacao == "VISUALIZADO") {

        removeFinalizarOption();

    } else {
        removeDeletarOption();
    }


}


var img_voltar = $('#img_voltar');
img_voltar.on('click', () => {
    window.location = "denunciahistorico.html";
})
var triggerDeletarOcorrenciaConfirm = 0;
btn_deletar.on('click', () => {

    if ($(alertDialog).css('display') == "none") {
        alertDialog.fadeIn();
    } else {
        alertDialog.fadeOut();
    }



    
})



var img_foto = $('#foto'); // IMG FOTO
var div_fotoZoom = $('#div_zoom'); // DIV ZOOM
var img_fotoZoom = $('#img_zoom'); // IMG ZOOM

var imgZoom = () => {

    if (div_fotoZoom.css('display') === 'none') {
        div_fotoZoom.css({ 'display': 'flex' });
    }
    else {
        div_fotoZoom.css({ 'display': 'none' });
    }
};

img_foto.on('click', () => {
    if ($('#foto').attr('src') != "img/foto.png") {
        imgZoom();
    }

});

img_fotoZoom.on('click', () => {
    imgZoom();
});

$('#alertSim').on('click', () => {
    deletarOcorrencia();
})

$('#alertNao').on('click', () => {
    alertDialog.fadeOut();
})

var deletarClicked = 0;
function deletarOcorrencia() {
    
    if (deletarClicked % 2 == 0) {
        window.location = "triggerDeletarDenuncia?";
        deletarClicked++;
    }
}
function closeDialog() {
    alertHide();
}

function removeDeletarOption() {
    btn_img_deletar.css('display', 'none');
}
function removeFinalizarOption() {
    btn_img_finalizar.css('display', 'none');
}
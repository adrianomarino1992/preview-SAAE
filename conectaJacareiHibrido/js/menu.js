var btn_atualizar = $('#li_recuperar');
var menuOpened = 0;
var btn_telefones = $('#img_telefone');
var btn_img_denuncia = $('#img_denuncia');

$('#img_ocorrencia').on('click', () => {
    window.location = "ocorrencia.html";
});
btn_img_denuncia.on('click', () => {
    window.location = "denuncia.html";
})

var img_servicos = $('#img_servicos');
img_servicos.on('click', () => {
    window.location = "servicos.html";
})

var logo = $('#logo');

logo.on('click', () => {
    window.location = "triggerOpenSite?";
});

$(document).ready(() => {
    if (menuOpened === 0) {
        window.location = "triggerOpenMenu?";
        menuOpened++;
    }
});

function CallToast(mensagem, tempo) {
    toastToggle(mensagem, tempo);
}
var img_more = $('#img_more');
img_more.on('click', () => {
    $('#menu_list').slideToggle();
})

btn_atualizar.on('click', () => {
    window.location = "atualizar.html";
})

btn_telefones.on('click', () => {
    window.location = "telefone.html";
})
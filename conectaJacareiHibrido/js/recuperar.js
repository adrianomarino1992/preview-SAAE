var btn_recuperar = $('#btn_cadastrar');
var btn_voltar = $('#voltar');

btn_recuperar.on('click', () => {
    var cpf = $('#ipt_cpf_index').val();
    var email = $('#ipt_email_recuperar').val();

    window.location = "triggerRecuperarSenha?cpf:" + cpf + ";email:" + email + ";fim";
});

btn_voltar.on('click', () => {
    window.location = "index.html";
})

var img_more = $('#ajuda');
img_more.on('click', () => {
    $('#menu_ajuda').slideToggle();
})
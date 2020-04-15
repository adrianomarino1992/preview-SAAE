var logo = $('#logo');
var txt_mostrar_senha = $('#txt_mostrar_senha');
var img_mostrar_senha = $('#img_mostrar_senha');


logo.on('click', () => {
    window.location = "triggerOpenSite?";
});

var recuperar = $('#recuperar');
recuperar.on('click', () => {
    window.location = "recuperar.html";
})

$('#btn_entrar').on('click', () => {
    var cpf = $('#ipt_cpf_index').val().toString();
    var senha = $('#ipt_senha_index').val().toString();
   
    window.location = "triggerLogin?cpf:" + cpf + ";senha:" + senha + ";fim";

});


$('#btn_cadastrar').on('click', () => {
    window.location = "cadastrar.html";
});

// $.getJSON(encodeURI(`/terminal/query/postgres?linha=select * from faleconosco`),(data)=>{
//     alert(data[0].assunto);
// })


var img_more = $('#ajuda');
img_more.on('click', () => {
    $('#menu_ajuda').slideToggle();
})


txt_mostrar_senha.on('click', () => {    

    if (img_mostrar_senha.attr('src') == "img/mostrarSenha.png") {
        img_mostrar_senha.attr('src', 'img/esconderSenha.png');
        $('#ipt_senha_index').attr('type', 'text');
        txt_mostrar_senha.text("Esconder Senha");
    } else {
        img_mostrar_senha.attr('src', 'img/mostrarSenha.png');
        $('#ipt_senha_index').attr('type', 'password');
        txt_mostrar_senha.text("Mostrar Senha");
    }
    
})

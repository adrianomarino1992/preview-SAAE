// VARIAVEIS GLOBAIS ============================================================================ START
var openCat = 0;
var openSub = 0;
var categoria = "Iluminação Pública";
var subcategoria = "Ativação De Chave Magnética";
var li_permissoes = $('#li_permissoes');
var div = $('#menu_permissions');
var logo = $('#logo');
var img_foto = $('#foto'); // IMG FOTO
var div_fotoZoom = $('#div_zoom'); // DIV ZOOM
var img_fotoZoom = $('#img_zoom'); // IMG ZOOM


logo.on('click', () => {
    window.location = "triggerOpenSite?";
});

var ajuda_next = $('#ajuda_next');
var li_ajuda = $('#li_ajuda');


function CloseAjuda() {
    $('#menu_ajuda').css('display', 'none');
    $('#menu_ajuda').empty();
    $('#menu_ajuda').html('<h1 id="tituloPermissions">Como Usar : </h1>'+
       ' <p> Inicialmente iremos escolher a categoria da Ocorrência, isso determinará para onde essa ocorrência será encaminhada. </p>'+
      '  <p>            Após, determinar uma subcategoria, escrever uma breve descrição sobre, e por fim iremos tirar uma foto do problema.<br><br>'+
        '        Nesse momento, o proprio Conecta Jacarei irá obter as coordenadas do dispositivo.        </p>'+


              '  <img src="img/next.png" id="ajuda_next" onclick="Next()">');
}
function Next() {
    $('#menu_ajuda').empty();
    $('#menu_ajuda').html('<p> Para Camera : </p><img src="img/camera.png">  ' +
        '<p>Para vizualizar no mapa : </p> <img src="img/mapa.png">   ' +
        '<p>Voltar para tela de descrição :  </p><img src="img/descricao.png" >    ' +
        '<p> Para Salvar : </p><img src="img/salvar.png" ><br><img src="img/fechar.png" onclick="CloseAjuda()">');

}

// VARIAVEIS GLOBAIS ============================================================================ END
$(document).ready(() => {

    var ul = $('#ul_subcategorias');
    ul.empty();
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Ativação De Chave Magnética</h3></li>");
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Instalação de Kit de Iluminação Pública</h3></li>");
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Luminária Quebrada</h3></li>");
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Lâmpada Acesa Durante o Dia</h3></li>");
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Lâmpada Apagada</h3></li>");
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Lâmpada Piscando</h3></li>");
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Mais De Uma Lâmpada Apagada Na Mesma Rua</h3></li>");
    ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Praça com Lâmpadas Apagadas</h3></li>");
    $('#valor_subcategoria').text("Ativação De Chave Magnética");



    window.location = "triggerOcorrenciaPageOpened?"; 
})

li_ajuda.on('click', () => {
    $('#menu_ajuda').css('display', 'flex');
})

var btn_historico = $('#li_historico');

btn_historico.on('click', ()=> {
    window.location = "ocorrenciahistorico.html";
})

li_permissoes.on('click', () => {

    
    $('#menu_list').slideToggle();

    setTimeout(() => { OpenPermissionsList(0, 0, 0); }, 1000);


})

var img_more = $('#img_more');
img_more.on('click', () => {
    if ($('#menu_permissions').css('display') != 'flex') {
        $('#menu_list').slideToggle();
    }
})


var img_voltar = $('#img_voltar');
img_voltar.on('click', () => {
    window.location = "menu.html";
})

$('#nav_camera').on('click', () => {
    var popup = $('#popup');
    popup.css('display', 'flex');
    window.location = "triggerCamera?";
});
function addFotoAndEnd(base64Str, endereco) {
    $('#foto').attr('src', 'data:image/png;base64, ' + base64Str);
    $(img_fotoZoom).attr('src', 'data:image/png;base64, ' + base64Str);
    $('#endereco').text("Endereço : " + endereco);
}


$('#open_categoria').on('click', () => {
    if (openCat % 2 == 0) {
        open_categorias();
        if (openSub % 2 != 0) {
            close_subcategoria();
        }
    } else {
        close_categorias();
    }

})

$('#open_subcategoria').on('click', () => {
    if (openSub % 2 == 0) {
        open_subcategoria();
        if (openCat % 2 != 0) {
            close_categorias();
        }
    } else {
        close_subcategoria();
    }

})

function close_categorias() {
    $('#div_categoria').css('display', 'none');
    openCat++;
}
function open_categorias() {
    $('#div_categoria').css('display', 'flex');
    openCat++;
}
function open_subcategoria() {
    $('#div_subcategoria').css('display', 'flex');
    openSub++;
}
function close_subcategoria() {
    $('#div_subcategoria').css('display', 'none');
    openSub++;
}


$('#ul_categorias li').on('click', (event) => {
    var clickedElement = $(event.currentTarget);
    var texto_categoria = $(clickedElement).find('h3').text();
    close_categorias();
    categoria = texto_categoria;
    $('#valor_categoria').text(texto_categoria);
    if (categoria == "Iluminação Pública") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Ativação De Chave Magnética</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Instalação de Kit de Iluminação Pública</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Luminária Quebrada</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Lâmpada Acesa Durante o Dia</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Lâmpada Apagada</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Lâmpada Piscando</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Mais De Uma Lâmpada Apagada Na Mesma Rua</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Praça com Lâmpadas Apagadas</h3></li>");
        $('#valor_subcategoria').text("Ativação De Chave Magnética");

    }
    if (categoria == "SAAE") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex' onclick='onSubCategoriaSelecionada(event)'><h3>Limpeza de boca Lobo</h3></li>");
        ul.append("<li class='content_flex' onclick='onSubCategoriaSelecionada(event)'><h3>Serviço de Drenagem e Limpeza de Galeria</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Vazamento</h3></li>");
        $('#valor_subcategoria').text("Bueiro Vazando");

    }
    if (categoria == "Ônibus") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Horário de Ônibus</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Intinerários</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Denúncia de Ônibus Lotado</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Denúncia de Ônibus Atrasado</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Ponto de Ônibus Danificado</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Limpeza de Ponto de Ônibus</h3></li>");
        $('#valor_subcategoria').text("Onibus Quebrado");
    }
    if (categoria == "Meio Ambiente") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Capina e Limpeza de Área Pública</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Limpeza de Córregos</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção de Praças</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Poda de Árvore</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Remoção de Animais Mortos</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Varrição</h3></li>");
        $('#valor_subcategoria').text("Bueiro Vazando");
    }

    if (categoria == "Manutenção de Vias Públicas") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Concerto de Tampa e Boca de Lobo</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção de calçadas</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Tapa Buraco</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção de Bloquete</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Desnível de Tampa em Via Pública</h3></li>");
        $('#valor_subcategoria').text("Buraco Grande");
    }
    if (categoria == "Mobilidade Urbana") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção Semafórica</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção de Pinturas de Solo</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção de Placas</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Pinturas de Guias</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção de Vias Públicas</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Solicitação de Lombadas e Lombofaixas</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Manutenção em Calçadas</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Solicitação de Rampa de acesso em Via Pública</h3></li>");
        $('#valor_subcategoria').text("Guia baixa");
    }
    if (categoria == "Proteção Animal") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Animais de Grande Porte em Via Pública</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Animal Abandonado</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Remoção de Animal Morto</h3></li>");
        $('#valor_subcategoria').text("Mals tratos");
    }
    if (categoria == "Ouvidoria") {
        var ul = $('#ul_subcategorias');
        ul.empty();
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Denúncia</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Reclamações</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Sugestões</h3></li>");
        ul.append("<li class='content_flex'onclick='onSubCategoriaSelecionada(event)'><h3>Elogios</h3></li>");
        $('#valor_subcategoria').text("Denúncia");

    }

})

function onSubCategoriaSelecionada(event) {
    var clickedElement = $(event.currentTarget);
    var texto_Subcategoria = $(clickedElement).find('h3').text();
    $('#valor_subcategoria').text(texto_Subcategoria);
    subcategoria = texto_Subcategoria;
    close_subcategoria();
}

var TriggerSalvarClicked = 0;

$('#nav_salvar').on('click', () => {

   
    if (TriggerSalvarClicked % 2 == 0)
    {
        var descricao = $('#descricao').val();
        window.location = "triggerSalvarOperacao?Ocorrencia=categoria:" + categoria + ";subcategoria:" + subcategoria + ";descricao:" + descricao + ";fim";
        TriggerSalvarClicked++;
    }
})


var dialogOpened = 0;
function functionDialog() {
    if (dialogOpened % 2 == 0) {
        alertShow("<h3>Ocorrencia cadastrada com sucesso !</h3>", "<p>Obrigado</p>", "<button onclick='backToMenu()'>OK</button>", null, null);
        dialogOpened++;
    }
}

function backToMenu() {
    alertHide();
    window.location = "menu.html";
    
}

// ROOT
var section_content = $('#ocorrencia'); // CONTENT CONTAINER 
var section_map = $('#map'); // MAP CONTAINER
var nav_map = $('#nav_mapa'); // NAV MAP
var nav_descricao = $('#nav_descricao'); // NAV DESCRIPTION

// FUNCTION TO SHOW AND HIDE MAP SECTION
var mapToggle = () => {
    if (section_map.css('display') === 'none') {
        if (map.getTarget() === '') {
            section_map.show();
            initMap();
            section_content.hide();
        }
        else {
            section_map.show();
            section_content.hide();
        }
    }
    container.style.display = 'block';
};

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

// SHOW AND HIDE MAP SECTION EVENT
nav_map.on('click', () => {
    mapToggle();
});

// FUNCTION TO SHOW AND HIDE CONTENT SECTION
var contentToggle = () => {
    if (section_content.css('display') === 'none') {
        section_map.hide();
        section_content.show();
    }
};

// SHOW AND HIDE CONTENT SECTION EVENT
nav_descricao.on('click', () => {
    contentToggle();
});

function OpenPermissionsList(camera, gps, memoria) {
    
    div.empty();
    div.css('display', 'flex');
    div.append('<h1 id="tituloPermissions">Permissições :</h1>');
    if (camera == 0) {
        div.append('<buttom class="permissionsButtom" onclick="callCameraPermission()">Camera</buttom>');

    }
    if (gps == 0) {
        div.append('<buttom class="permissionsButtom" onclick="callGPSPermission()">Localização </buttom>');

    }
    if (memoria == 0) {
        div.append('<buttom class="permissionsButtom" onclick="callMemoriaPermission()">Memoria </buttom>');
    }
    div.append('<img src="img/fechar.png" id="fecharPermissions" onclick="fecharPermission()">');
}
function fecharPermission() {
    div.css('display', 'none');
}

function callCameraPermission() {
    window.location = "triggerCallCameraPermission?";
}
function callGPSPermission() {
    window.location = "triggerCallGPSPermission?";
}
function callMemoriaPermission() {
    window.location = "triggerCallMemoriaPermission?";
}
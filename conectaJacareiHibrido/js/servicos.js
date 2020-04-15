var allVisibleLayers = { layers: [] };
var enderecoString; 
var pointEndereco; 


var view = new ol.View({
    projection: 'EPSG:3857', // REFERENCE SYSTEM: SPHERICAL MERCATOR - UNIT METRIC AND DATUM WGS84
    center: [-5117762.53253, -2667844.79835], // VIEW CENTER => [X, Y]
    zoom: 11, // INITIAL ZOOM
    extent: [-5142639.01572, -2687818.25181, -5092886.04933, -2647871.34490], // VIEW EXTENT [MINX, MINY, MAXX, MAXY]
    maxZoom: 17, // ZOOM IN
    minZoom: 1 // ZOOM OUT
});

var map = new ol.Map({
    target: '', // MAP RENDER TARGET
    view: view, // MAP VIEW
    layers: [ // LAYERS
        new ol.layer.Tile({
            visible: true,
            preload: Infinity,
            source: new ol.source.BingMaps({
                key: 'AgDol3nJb3nKPr3wQlsLqzif5uWDKPymbNTDQAkFxiHlZf7GjiL7Da5Qg4EFqIn_',
                imagerySet: 'AerialWithLabels'
            })
        })
    ]
    
});



function localNewPoint(longitude, latitude, telefone, endereco, cpf, descricao) {


   


    var geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857'
            }
        },
        'features': [{
            'type': 'Feature',            
            'geometry': {
                'type': 'Point',
                'coordinates': [longitude, latitude]
            },
            'properties': {
                'telefone': telefone,
                'endereco': endereco,
                'cpf': cpf,
                'descricao': descricao
            }
        }]
    };


    let vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
    });

    let vector_layer = new ol.layer.Vector({
        source: vectorSource
       
    });


    var obj = { 'camada': vector_layer, 'nome': `${cpf}` };
    if (allVisibleLayers.layers.indexOf(obj) == -1) {

        allVisibleLayers.layers.push(obj);
    }


    map.addLayer(vector_layer);
};


var atualTela = 'cliente';

var nav_cliente = $('#nav_cliente');
nav_cliente.on('click',()=>{
    $('#autonomo').css('display','none');
    $('#cliente').fadeIn();
    $('#map').css('display','none');
    atualTela = 'cliente';
    $('#popUpServico').css('display', 'none');
})
var nav_worker = $('#nav_worker');
nav_worker.on('click',()=>{
    $('#popUpServico').css('display', 'none');
    if (enderecoString == null && pointEndereco == null) {

        
        window.location = "triggerGetEnderecoServico?";
    } else {
        openAutonomoTela('Será preenchido automaticamente');
    }
    

})

function openAutonomoTela(endereco,celular) {
    $('#autonomo_endereco').val(endereco);
    $('#telefone_autonomo').val(celular);
    $('#cliente').css('display', 'none');
    $('#autonomo').fadeIn();
    $('#map').css('display', 'none');
    atualTela = 'worker';
}

var nav_mapa = $('#nav_mapa');
nav_mapa.on('click', () => {

    $('#cliente').css('display','none');
    $('#autonomo').css('display','none');
    $('#map').fadeIn();
    map.setTarget('map');
})

function openMappopUp(telefone, descricao) {
   
    $('#popUpServico').css('display', 'none');
    $('#popUpServico').empty();

    $('#popUpServico').append(`<h2 class="popUpH2">TELEFONE COMERCIAL:</h2>
    <input type="text" value="${telefone}" class="inputPopup" style="height: 30px;" disabled>
    <h2 class="popUpH2">DESCRIÇÃO:</h2>
                    <textarea class="inputPopup" disabled>
                    ${descricao}
                    </textarea>
                    <h2 class="popUpH2" style="text-decoration: underline;" onclick="ligarCsharp('${telefone}')">ENTRAR EN CONTATO</h2>`);

    $('#popUpServico').fadeIn();
}
function ligarCsharp(telefone) {
   
    window.location = "triggerLigarCsharp?telefone:" + telefone + ";fim";
}

function addAutonomoCard(prof,tel,end) {
    $('#autonomo_result').append(` <div style="border: 1px solid black; padding: 10px;" onclick="ligarCsharp('${tel}')">
        <h2>PROFISSIONAL:</h2>
        <input type="text" value="${prof}" style="width: 95%" disabled>
<h2>TELEFONE:</h2>
        <input type="text" value="${tel}" style="width: 95%" disabled>
            <h2>ENDEREÇO : </h2>
            <textarea name="" id="" cols="30" rows="10" disabled>
                ${end}
                        </textarea>
                    </div>`);


   
}


function getFeatureId(pixel) {
    let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });

    if (feature) {
        
        openMappopUp(feature.N.telefone, feature.N.descricao);
    } else {

        $('#popUpServico').css('display', 'none');
    }
};







// ON click EVENT - MAP
map.on('click', function (evt) {
    getFeatureId(evt.pixel);
});
var nav_salvar= $('#nav_salvar');
nav_salvar.on('click', () => {
   

   

    if (atualTela == 'cliente') {
        var profissao = $('#profissao_cliente').val();
        var prox = $('#prox_cliente').val();
        window.location = "triggerBuscarAutonomo?profissao:" + profissao + ";prox:" + prox + ";fim";
        if (allVisibleLayers.layers.length >= 1) {
            for (var i = 0; i < allVisibleLayers.layers.length; i++) {
                map.removeLayer(allVisibleLayers.layers[i].camada);
            }
        }
    } else if (atualTela == 'worker') {
        var profissao = $('#profissao_autonomo').val();
        var descricao = $('#descricao_autonomo').val();
        var tel = $('#telefone_autonomo').val();
        window.location = "triggerSalvarAutonomo?profissao:" + profissao + ";descricao:" + descricao + ";telefono:" + tel + ";fim";
    } else {
        alert('worker_cadastro');
    }
    
    
  
})



var li_permissoes = $('#li_permissoes');
var div = $('#menu_permissions');


var logo = $('#logo');
// $(document).ready(() => {
//     window.location = "triggerDenunciaPageOpened?";
// })

var ajuda_next = $('#ajuda_next');
var li_ajuda = $('#li_ajuda');

li_ajuda.on('click', () => {
    $('#menu_ajuda').css('display', 'flex');
})

function CloseAjuda() {
    $('#menu_ajuda').css('display', 'none');
    $('#menu_ajuda').empty();
    $('#menu_ajuda').html('<h1 id="tituloPermissions">Como Usar : </h1>' +
        ' <p> Inicialmente iremos escolher a categoria da denuncia, isso determinará para onde essa denuncia será encaminhada. </p>' +
        '  <p>            Apos, determinar uma subcategoria, escrever uma breve descrição sobre, e por fim iremos tirar uma foto do problema.<br><br>' +
        '        Nesse momento, o proprio Conecta Jacarei irá obter as coordenadas do dispositivo.        </p>' +


        '  <img src="img/next.png" id="ajuda_next" onclick="Next()">');
}
function Next() {
    $('#menu_ajuda').empty();
    $('#menu_ajuda').html('<p> Para Camera : </p><img src="img/camera.png">  ' +
        '<p>Para vizualizar no mapa : </p> <img src="img/mapa.png">   ' +
        '<p>Voltar para tela de descriçõeso :  </p><img src="img/descricao.png" >    ' +
        '<p> Para Salvar : </p><img src="img/salvar.png" ><br><img src="img/fechar.png" onclick="CloseAjuda()">');

}



logo.on('click', () => {
    window.location = "triggerOpenSite?";
});

li_permissoes.on('click', () => {


    $('#menu_list').slideToggle();

    setTimeout(() => { OpenPermissionsList(0, 0, 0); }, 1000);


})



var img_more = $('#img_more');
img_more.on('click', () => {
    $('#menu_list').slideToggle();
})

var img_voltar = $('#img_voltar');
img_voltar.on('click', () => {
    window.location = "menu.html";
})


function addFotoAndEnd(base64Str, endereco) {
    $('#foto').attr('src', 'data:image/png;base64, ' + base64Str);
    $(img_fotoZoom).attr('src', 'data:image/png;base64, ' + base64Str);
    $('#endereco').text("Endere�o : " + endereco);
}









$('#nav_salvar').on('click', () => {

  
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

function OpenPermissionsList(camera, gps, memoria) {

    div.empty();
    div.css('display', 'flex');
    div.append('<h1 id="tituloPermissions">Permissi��es :</h1>');
    if (camera == 0) {
        div.append('<buttom class="permissionsButtom" onclick="callCameraPermission()">Camera</buttom>');

    }
    if (gps == 0) {
        div.append('<buttom class="permissionsButtom" onclick="callGPSPermission()">Localiza��o </buttom>');

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



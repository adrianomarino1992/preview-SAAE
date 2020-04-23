// autor: Adriano Marino Balera adriano.marino1992@gmail.com
// Feito no Estagio Jacareí/Fatec 2018/2019


// tabelas para criar em abiente de dev : 
// arquivos_features(tabela:text,gid:integer,arquivo:text,descricao:text);
// tb_funcionarios(nome:text,matricula:text,senha:text,email:text);
// faleconosco(assunto:text,texto:text;email:text;fone:text;arquivo:text,protocolo:text,status:text);

/* variaveis globais */

var allVisibleLayers = { layers: [] };
var layersLegenda = [];
var DoubleLayers = [];
var styleFeatureSelected;
var fotoAtual;
var allCampos2Features = [];
var toolbox_buffer = false;
var toolbox_editarAttr = false;
var editarAttrFeature;
var editarAttrCampos = [];
var perimetroToolActived = false;
var areaToolActived = false;
var minZoom = 4;
var adminMOde = false;
var featuresModified;
var rotularToolActived = false;
var feature2Rotular;
var allPopUpsOpened = [];
var buscarInteracionOpened = false;
var buscarInteraction;
var desenharInteracionOpened = false;
var desenharInteraction;
var medirInteracionOpened = false;
var medirInteraction;
const host = ``;
var add_arquivoToolActived = false;
var acessar_arquivoToolActived = false;
var cidadao;
var agente;
var numeroDeMsg = 0;


/* variaveis globais */









/* mapa */


$(document).on('mousemove', (event) => {
    if ($("#beta_theme").css('display') == 'none') {
        $("#beta_theme").fadeIn();
        $("#beta_theme").css({ 'top': event.clientY + 10, 'left': event.clientX + 20 });

    } else {

        $("#beta_theme").css({ 'top': event.clientY + 10, 'left': event.clientX + 20 });
        $("#beta_theme").fadeOut();
    }
})



function newImg(src) {
    let img = document.createElement('img');
    img.src = src;
    img.style.backgroundRepeat = 'no-repeat';
    img.style.backgroundPosition = 'center center';
    img.style.width = '19.08px';
    img.style.height = '19.08px';
    return img;
};


function setAllToolsNull() {
    toolbox_buffer = false;
    toolbox_editarAttr = false;
    editarAttrFeature = null;
    editarAttrCampos = [];
    perimetroToolActived = false;
    areaToolActived = false;
    rotularToolActived = false;
    add_arquivoToolActived = false;
    acessar_arquivoToolActived = false;
    $('#acessar_arquivoTools').fadeOut();
    $('#toolboxTools').fadeOut();
    $('#bufferTools').fadeOut();
    $('#rotularTools').fadeOut();
    $('#perimetroToolTools').fadeOut();
    $('#areaToolTools').fadeOut();
    $('#editarAttrTools').fadeOut();
    $('#editarTools').fadeOut();
    $('#StatsTools').fadeOut();
    $('#inputVector').fadeOut();
    $('#add_arquivoTools').fadeOut();
    $(btnEditarLayer).css('border', 'none');
    $(btnToolbox).css('border', 'none');
}

// var olFullscreen = new ol.control.FullScreen({
//     label: newImg('./img/fullscreen.png'), // IMG BUTTON OFF
//     labelActive: newImg('./img/fechar.png'), // IMG BUTTON ON
//     tipLabel: 'Tela Cheia' // TIP
// });


var olRotate = new ol.control.Rotate({
    label: newImg('./img/north.png'), // IMG BUTTON
    autoHide: false, // AUTO HIDE OFF
    tipLabel: 'Rotacionar' // TIP
});


var olScale = new ol.control.ScaleLine();

function newCustomControl(classe, elements) { // PARAMETERS CLASS NAME AND ARRAY OF ELEMENTS
    let newElement = document.createElement('div'); // CREATES A NEW DIV ELEMENT
    newElement.className = `${classe} ol-unselectable ol-control`; // DEFINE THE ELEMENT CLASS

    for (let i = 0; i < elements.length; i++) { // FOR EACH ELEMENT INTO THE ARRAY
        newElement.appendChild(elements[i]);
    }

    var newControl = new ol.control.Control({
        element: newElement
    });

    return newControl;
}


var btnPosition = document.createElement('button');
btnPosition.appendChild(newImg('./img/export.png'));
var customPosition = newCustomControl('custom_position', [btnPosition]);


var btnLegenda = document.createElement('button');
btnLegenda.appendChild(newImg('./img/camadasativas.png'));
var customLegenda = newCustomControl('custom_legenda', [btnLegenda]);

var btnMedir = document.createElement('button');
btnMedir.appendChild(newImg('./img/measure.png'));
var customArea = newCustomControl('custom_area', [btnMedir]);

var btnBuscar = document.createElement('button');
btnBuscar.appendChild(newImg('./img/search.png'));
var customBuscar = newCustomControl('custom_buscar', [btnBuscar]);

var btnRaster = document.createElement('button');
btnRaster.appendChild(newImg('./img/basemap.svg'));
var customRaster = newCustomControl('custom_Raster', [btnRaster]);

var btnGrade = document.createElement('button');
btnGrade.appendChild(newImg('./img/grade.png'));
var customGrade = newCustomControl('custom_Grade', [btnGrade]);


var btnVector = document.createElement('button');
btnVector.appendChild(newImg('./img/addvector.png'));
var customVector = newCustomControl('custom_Vector', [btnVector]);

var btnStats = document.createElement('button');
btnStats.appendChild(newImg('./img/stats.png'));
var customStats = newCustomControl('custom_Stats', [btnStats]);

var btnBaixar = document.createElement('button');
btnBaixar.appendChild(newImg('./img/baixar_black.png'));
var customBaixar = newCustomControl('custom_Baixar', [btnBaixar]);

var btnStyle = document.createElement('button');
btnStyle.appendChild(newImg('./img/color.png'));
var customStyle = newCustomControl('custom_Style', [btnStyle]);

var btnToolbox = document.createElement('button');
btnToolbox.appendChild(newImg('./img/tools.png'));
var customToolbox = newCustomControl('custom_Toolbox', [btnToolbox]);

var btnEditarLayer = document.createElement('button');
btnEditarLayer.appendChild(newImg('./img/editar.png'));
var customEditarLayer = newCustomControl('custom_EditarLayer', [btnEditarLayer]);

var btnAuxiliar = document.createElement('button');
btnAuxiliar.appendChild(newImg('./img/auxiliar.png'));
var customAuxiliar = newCustomControl('custom_auxiliar', [btnAuxiliar]);

var map = new ol.Map({
    layers: [

    ],
    controls: ol.control.defaults({ rotate: false }).extend([

        olRotate,

        customPosition,
        customLegenda,
        customArea,
        customBuscar,
        customRaster,
        customGrade,
        customVector,
        customStats,
        customBaixar,
        customStyle,
        customToolbox,
        customEditarLayer,
        customAuxiliar

    ]),
    target: 'map',
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [-45.96, -23.3],

        zoom: 4,
        minZoom: minZoom,
        maxZoom: 19

    })
});

basemapssss = new ol.layer.Image({
    source: new ol.source.ImageArcGISRest({
        ratio: 1,
        params: {},
        url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +
            'Specialty/ESRI_StateCityHighway_USA/MapServer'
    })
});
map.addLayer(basemapssss);

function newVectorStyle(fill, stroke, width) {
    let style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: fill
        }),
        stroke: new ol.style.Stroke({
            width: width,
            color: stroke
        }),
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: fill
            }),
            stroke: new ol.style.Stroke({
                width: width,
                color: stroke
            }),
            radius: 7
        })
    });
    return style;
};



function createLabels(style, cor, contorno, largura, campo) {
    var text = new ol.style.Text({
        text: function(feature) { return feature.get(campo) },
        fill: new ol.style.Fill({ color: cor }),
        stroke: new ol.style.Stroke({ color: contorno, width: largura }),
        offsetX: -20,
        offsetY: 20
    })
    style.setText(text);
}






var btnDesenhar = document.createElement('button');
btnDesenhar.appendChild(newImg('./img/create.png'));
var customDesenhar = newCustomControl('custom_desenhar', [btnDesenhar]);
map.addControl(customDesenhar);


/* mapa */





















/* menu principal */



var div_base_cartografica = $('#div_base_cartografica');
div_base_cartografica.on('click', () => {
    $('#basecartografica_data').fadeOut();
})


var camadas_btn = $('#camadas_btn');

var filtros_btn = $('#filtros_btn');

var buscar_btn = $('#buscar_btn');


$(camadas_btn).css('background-color', "#6f6e6e36");

camadas_btn.on('click', () => {
    $(camadas_btn).css('background-color', "#6f6e6e36");
    $(filtros_btn).css('background-color', "#7b7b7b00");
    $(buscar_btn).css('background-color', "#7b7b7b00");
    $('#div_layers').fadeIn();
    $('#divFiltrardados').fadeOut();
    $('#divBuscar').fadeOut();
});

$('#div_base_cartografica').on('click', () => {
    $('#div_camadas_sub_folder').css('display') == "none" ?
        $('#div_camadas_sub_folder').fadeIn() :
        $('#div_camadas_sub_folder').fadeOut();

})


var base_shp = $('#base_shp');
base_shp.on('click', () => {

    $('#div_camadas_sub_folder_base_shp').css('display') == "none" ?
        $('#div_camadas_sub_folder_base_shp').fadeIn() :
        $('#div_camadas_sub_folder_base_shp').fadeOut();
})

$('#secretaria_SMA').on('click', () => {

    $('#div_SMA_sub_folder').css('display') == "none" ?
        $('#div_SMA_sub_folder').fadeIn() :
        $('#div_SMA_sub_folder').fadeOut();
})

var dados_SMA_Abastecimento_shp = $('#dados_SMA_Abastecimento_shp');
dados_SMA_Abastecimento_shp.on('click', () => {
    $('#div_camadas_sub_folder_SMA_abastecimento').css('display') == "none" ?
        $('#div_camadas_sub_folder_SMA_abastecimento').fadeIn() :
        $('#div_camadas_sub_folder_SMA_abastecimento').fadeOut();
})
var dados_SMA_App_shp = $('#dados_SMA_App_shp');
dados_SMA_App_shp.on('click', () => {
    $('#div_camadas_sub_folder_SMA_app').css('display') == "none" ?
        $('#div_camadas_sub_folder_SMA_app').fadeIn() :
        $('#div_camadas_sub_folder_SMA_app').fadeOut();
})
var dados_SMA_Uso_shp = $('#dados_SMA_Uso_shp');
dados_SMA_Uso_shp.on('click', () => {
    $('#div_camadas_sub_folder_SMA_Uso').css('display') == "none" ?
        $('#div_camadas_sub_folder_SMA_Uso').fadeIn() :
        $('#div_camadas_sub_folder_SMA_Uso').fadeOut();
})
var dados_SMA_Infraestrutura_shp = $('#dados_SMA_Infraestrutura_shp');
dados_SMA_Infraestrutura_shp.on('click', () => {
    $('#div_camadas_sub_folder_SMA_Infraestrutura').css('display') == "none" ?
        $('#div_camadas_sub_folder_SMA_Infraestrutura').fadeIn() :
        $('#div_camadas_sub_folder_SMA_Infraestrutura').fadeOut();
})


$('#secretaria_GO').on('click', () => {

    $('#div_GO_sub_folder').css('display') == "none" ?
        $('#div_GO_sub_folder').fadeIn() :
        $('#div_GO_sub_folder').fadeOut();
})


$('#secretaria_Fiscalizacao').on('click', () => {

    $('#div_Fiscalizacao_sub_folder').css('display') == "none" ?
        $('#div_Fiscalizacao_sub_folder').fadeIn() :
        $('#div_Fiscalizacao_sub_folder').fadeOut();
})

$('#dados_fiscalizacao_sma').on('click', () => {
    $('#div_camadas_sub_folder_SMA').css('display') == "none" ?
        $('#div_camadas_sub_folder_SMA').fadeIn() :
        $('#div_camadas_sub_folder_SMA').fadeOut();
})

$('#dados_fiscalizacao_sg').on('click', () => {
    $('#div_camadas_sub_folder_SG').css('display') == "none" ?
        $('#div_camadas_sub_folder_SG').fadeIn() :
        $('#div_camadas_sub_folder_SG').fadeOut();
})

var divFiltrardados_h2 = $('#divFiltrardados_h2 h2');
for (var btn of divFiltrardados_h2) {
    $(btn).on('click', (event) => {
        var cat = event.currentTarget;
        if ($(cat).text() == "Rede de Água") {
            $('#divFiltrardados_h2_Base_cartografica').fadeIn();
            $('#divFiltrardados_h2_fiscalizacao').fadeOut();
            $('#divFiltrardados_h2_Base_SMA').fadeOut();
            $('#divFiltrardados_h2_Base_GOV').fadeOut();
        } else if ($(cat).text() == "Rede de Esgoto") {
            $('#divFiltrardados_h2_Base_cartografica').fadeOut();
            $('#divFiltrardados_h2_fiscalizacao').fadeOut();
            $('#divFiltrardados_h2_Base_SMA').fadeIn();
            $('#divFiltrardados_h2_Base_GOV').fadeOut();
        } else if ($(cat).text() == "Cadastro Básico") {
            $('#divFiltrardados_h2_Base_cartografica').fadeOut();
            $('#divFiltrardados_h2_fiscalizacao').fadeOut();
            $('#divFiltrardados_h2_Base_SMA').fadeOut();
            $('#divFiltrardados_h2_Base_GOV').fadeIn();
        }
    })
}



filtros_btn.on('click', () => {
    $(filtros_btn).css('background-color', "#6f6e6e36");
    $(camadas_btn).css('background-color', "#7b7b7b00");
    $(buscar_btn).css('background-color', "#7b7b7b00");
    $('#div_layers').fadeOut();
    $('#divFiltrardados').fadeIn();

    $('#divBuscar').fadeOut();

});

var divFiltrardados_h2_Base_cartografica_buttom = $('#divFiltrardados_h2_Base_cartografica_buttom');

divFiltrardados_h2_Base_cartografica_buttom.on('click', () => {
    var divFiltrardados_h2_Base_cartografica_sel_data = $('#divFiltrardados_h2_Base_cartografica_sel_data');
    AddlayerFromFolders($(divFiltrardados_h2_Base_cartografica_sel_data).val(), $('#divFiltrardados_h2_Base_cartografica_sel_data option:selected').text());
})

var btn_filtrar_sma = $('#btn_filtrar_sma');
btn_filtrar_sma.on('click', () => {
    var dado = $('#divFiltrardados_h2_Base_SMA_sel_data');
    AddlayerFromFolders($(dado).val(), $('#divFiltrardados_h2_Base_SMA_sel_data option:selected').text());
})

var btn_filtrar_go = $('#btn_filtrar_go');
btn_filtrar_go.on('click', () => {
    var dado = $('#divFiltrardados_h2_Base_GOV_sel_data');
    AddlayerFromFolders($(dado).val(), $('#divFiltrardados_h2_Base_GOV_sel_data option:selected').text());
})

buscar_btn.on('click', () => {
    $(buscar_btn).css('background-color', "#6f6e6e36");
    $(filtros_btn).css('background-color', "#7b7b7b00");
    $(camadas_btn).css('background-color', "#7b7b7b00");
    $('#divBuscar').fadeIn();
    $('#divFiltrardados').fadeOut();
    $('#div_layers').fadeOut();
});



var all_div_layers_btns = $('.foldersOpened h2');
for (var btn of all_div_layers_btns) {
    $(btn).on('click', (event) => {
        var btn = event.currentTarget;
        // console.log($(btn).text());
        AddlayerFromFolders(btn.id, $(btn).text());

    })
}

function AddlayerFromFolders(id, nome) {
    console.log(id);
    if (id.trim() == 'tbDenuncia' || id.trim() == 'tbOcorrencia') {
        var url = `${host}/pastas/dados/sqlserver?arquivo=${id}`;
        var url = encodeURI(url);
        var abort;
        openLoader();
        var query = $.getJSON(url, (data) => {

            //  console.log(data);
            if (data.erro) {
                alert('Falha na comunicação com servidor');
            } else {
                if (id.trim() == "tbDenuncia") {
                    console.log(data);
                    var denunciaSource = new ol.source.Vector({});
                    var denunciaLayer = new ol.layer.Vector({
                        source: denunciaSource
                    });
                    for (var i = 0; i < data.length; i++) {
                        var feature = createFeatureFromGeoJsonSemFoto(data[i], 1);
                        //console.log(feature[0]);
                        feature[0].setProperties({ arquivo: 'Denuncias' });
                        denunciaSource.addFeatures(feature);
                    }
                    var obj = { 'camada': denunciaLayer, 'nome': `Todas Denuncias   ` };
                    if (allVisibleLayers.layers.indexOf(obj) == -1) {

                        allVisibleLayers.layers.push(obj);
                        map.addLayer(denunciaLayer);
                    }
                } else {
                    console.log(data);
                    var ocorrenciaSource = new ol.source.Vector({});
                    var ocorrenciaLayer = new ol.layer.Vector({
                        source: ocorrenciaSource
                    });
                    for (var i = 0; i < data.length; i++) {
                        var feature = createFeatureFromGeoJsonSemFoto(data[i], 2);
                        feature[0].setProperties({ arquivo: 'Ocorrencias' });
                        ocorrenciaSource.addFeatures(feature);
                    }
                    var obj = { 'camada': ocorrenciaLayer, 'nome': `Todas Ocorrencias` };
                    if (allVisibleLayers.layers.indexOf(obj) == -1) {

                        allVisibleLayers.layers.push(obj);
                        map.addLayer(ocorrenciaLayer);
                    }
                }

            }

            clearTimeout(abort);
            setTimeout(() => {
                // $(btnLegenda).click();
                closeLoader();
            }, 100);
            //  $(btnLegenda).click();
        })
        abort = setTimeout(() => {
            query.abort();
            closeLoader();
            alert('Tempo de espera expirado, verifique sua conexão !');
        }, 10000)

    } else {


        var url = `${host}/pastas/dados?arquivo=${id}`;
        var url = encodeURI(url);
        var pode = true;
        var abort;
        var copiaNumber;


        for (var i = 0; i < allVisibleLayers.layers.length; i++) {
            if (nome == allVisibleLayers.layers[i].nome) {
                nome = nome.trim();
                nome = nome + "_Copia1";
                for (var i = 0; i < allVisibleLayers.layers.length; i++) {
                    if (nome == allVisibleLayers.layers[i].nome) {
                        nome = nome.trim();
                        nome = nome.substring(0, nome.length - 1) + "2";
                        for (var i = 0; i < allVisibleLayers.layers.length; i++) {
                            if (nome == allVisibleLayers.layers[i].nome) {
                                nome = nome.trim();
                                nome = "none";
                            }

                        }
                    }

                }
            }

        }
        if (nome == "none") {
            alert('Lamento, Já existem 3 copias desse dado !');
            closeLoader();
        } else {
            openLoader();
            var query = $.getJSON(url, (data) => {
                //  console.log(data);
                if (data.erro) {
                    alert('Falha na comunicação com servidor');
                } else {
                    createFeaturesFromJSON(data, id, nome);
                    // var view = new ol.View({
                    //     projection: 'EPSG:4326',
                    //     center: [-46.05, -23.3],

                    //     zoom: 11,
                    //     minZoom: 4,
                    //     maxZoom: 19

                    // })
                    // map.setView(view);
                }

                clearTimeout(abort);
                setTimeout(() => {
                    // $(btnLegenda).click();
                    closeLoader();
                }, 100);
                //  $(btnLegenda).click();
            })
            abort = setTimeout(() => {
                query.abort();
                closeLoader();
                alert('Tempo de espera expirado, verifique sua conexão !');
            }, 10000)
        }

    }

    function BlockView() {
        var blockView = new ol.View({
            projection: 'EPSG:4326',
            center: [-45.96, -23.3],

            zoom: 19,
            minZoom: 19,
            maxZoom: 19

        })
        map.setView(blockView);
    }

    function UnBlockView() {
        var blockView = new ol.View({
            projection: 'EPSG:4326',
            center: [-45.96, -23.3],

            zoom: 14,
            minZoom: 5,
            maxZoom: 19

        })
        map.setView(blockView);
    }
}



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    // else {
    //     x.innerHTML = "Geolocation is not supported by this browser.";
    // }
}


function showPosition(position) {
    addPointToCoordinate(position.coords.longitude, position.coords.latitude);
}


function addPointToCoordinate(longitude, latitude) {
    var x = longitude * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;

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
            'properties': {
                'name': 'User',
                'X': x,
                'Y': y
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [x, y]
            }
        }]
    };
    var vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
    });
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    map.addLayer(vectorLayer);

    map.getView().animate({
        center: [x, y],
        zoom: 18
    });
};


var IluminacaoPublica = [
    'Ativação De Chave magnética',
    'Instalação de Kit de Iluminação Pública',
    'Luminária Quebrada',
    'Lâmpada Acesa Durante o Dia',
    'Lâmpada Apagada',
    'Lâmpada Piscando',
    'Mais De Uma Lâmpada Apagada Na Mesma Rua',
    'Praça com Lâmpadas Apagadas',
    'Todas'
];

var ManutencaoDeViasPublicas = [
    'Concerto de Tampa e Boca de Lobo',
    'Desnível de Tampa em Via Pública',
    'Manutenção de Bloquete</option>',
    'Manutenção de calçadas</option>',
    'Tapa Buraco',
    'Todas'
];

var MeioAmbiente = [
    'Capina e Limpeza de Área Pública',
    'Limpeza de Córregos',
    'Manutenção de Praças',
    'Manutenção de calçadas',
    'Poda de Árvore',
    'Remoção de Animais Mortos',
    'Varrição',
    'Todas'
];

var MobilidadeUrbana = [
    'Manutenção de Pinturas de Solo',
    'Manutenção de Placas',
    'Manutenção de Vias Públicas',
    'Manutenção em calçadas',
    'Manutenção Semafórica',
    'Pinturas de Guias',
    'Solicitação de Lombadas e Lombofaixas',
    'Solicitação de Rampa de acesso em Via Pública',
    'Todas'
];

var Onibus = [
    'Denúncia de Ônibus Atrasado',
    'Denúncia de Ônibus Lotado',
    'Horário de Ônibus',
    'Intinerários',
    'Limpeza de Ponto de Ônibus',
    'Ponto de Ônibus Danificado',
    'Todas'
];

var Ouvidoria = [
    'Denúncia',
    'Elogios',
    'Reclamações',
    'Sugestões',
    'Todas'
];

var ProtecaoAnimal = [
    'Animais de Grande Porte em Via Pública',
    'Animal Abandonado',
    'Remoção de Animal Morto',
    'Todas'
];

var SAAE = [
    'Limpeza de boca Lobo',
    'Serviço de Drenagem e Limpeza de Galeria',
    'Vazamento',
    'Todas'
];


var Limpeza_Publica = [
    "Descarte de lixo nas vias",
    "Deficiencia de varredura",
    "Deficeiencia de coleta",
    "Mato crescendo nas guias",
    "Animal de pequeno porte morto"
];
var Coleta_de_Residuos = [
    "Coleta de residuo",
    "Coleta de residuo hospitalar",
    "Coleta de residuo reciclavel"

];
var Meio_Ambiente = [
    "Poluiçao atmosferica",
    "Lançamento de residuos em curso d´gua",
    "Incomodo gerado por industrias"
];
var Protecao_Animal = [
    "Mals tratos",
    "Animal abandonado",
    "Quer doar"

];


var gov_categorias = [
    "Iluminacao Pública",
    "Manutenção De Vias Públicas",
    "Mobilidade Urbana",
    "Ônibus",
    "Ouvidoria",
    "Proteção Animal",
    "SAAE",

]

var sma_categorias = [
    "Limpeza Publica",
    "Coleta de Residuos",
    "Meio Ambiente",
    "Proteção Animal"

]



var cat_sel = $('#cat_sel');
var cat_sel_secretaria = "SMA";

cat_sel.on('change', () => {
    var secretaria = $(cat_sel).val();
    if (secretaria == "SMA") {
        addSMAcats();
        carregarSubSel(Limpeza_Publica);
        cat_sel_secretaria = "SMA";

    } else {
        addGOVcats();
        carregarSubSel(IluminacaoPublica);
        cat_sel_secretaria = "GOV";
    }
})


function addSMAcats() {
    $('#divFiltrardadosFiscalizacaoOcorrencia_cat_sel').empty();
    for (var cat of sma_categorias) {
        $('#divFiltrardadosFiscalizacaoOcorrencia_cat_sel').append(`<option value='${cat}'>${cat}</option>`);
    }
}

function addGOVcats() {
    $('#divFiltrardadosFiscalizacaoOcorrencia_cat_sel').empty();
    for (var cat of gov_categorias) {
        $('#divFiltrardadosFiscalizacaoOcorrencia_cat_sel').append(`<option value='${cat}'>${cat}</option>`);
    }
}

function carregarSubSel(obj) {
    $('#divFiltrardadosFiscalizacaoOcorrencia_subcat_sel').empty();
    for (var sub_cat of obj) {
        $('#divFiltrardadosFiscalizacaoOcorrencia_subcat_sel').append(`<option value="${sub_cat}">${sub_cat}</option>`);
    }

}
addSMAcats();
carregarSubSel(Limpeza_Publica);
var divFiltrardadosFiscalizacaoOcorrencia_cat_sel = $('#divFiltrardadosFiscalizacaoOcorrencia_cat_sel');
divFiltrardadosFiscalizacaoOcorrencia_cat_sel.on('change', () => {
    var cat = $(divFiltrardadosFiscalizacaoOcorrencia_cat_sel).val();
    if (cat_sel_secretaria == "SMA") {

        //   console.log(cat);
        switch (cat) {
            case sma_categorias[0]:
                carregarSubSel(Limpeza_Publica);
                break;
            case sma_categorias[1]:
                carregarSubSel(Coleta_de_Residuos);
                break;
            case sma_categorias[2]:
                carregarSubSel(Meio_Ambiente);
                break;
            case sma_categorias[3]:
                carregarSubSel(Protecao_Animal);
                break;
        }
    } else {
        //   console.log(cat);
        switch (cat) {
            case gov_categorias[0]:
                carregarSubSel(IluminacaoPublica);
                break;
            case gov_categorias[1]:
                carregarSubSel(ManutencaoDeViasPublicas);
                break;
            case gov_categorias[2]:
                carregarSubSel(MobilidadeUrbana);
                break;
            case gov_categorias[3]:
                carregarSubSel(Onibus);
                break;
            case gov_categorias[4]:
                carregarSubSel(Ouvidoria);
                break;
            case gov_categorias[5]:
                carregarSubSel(ProtecaoAnimal);
                break;
            case gov_categorias[6]:
                carregarSubSel(SAAE);
                break;
        }
    }
})



var divFiltrardadosFiscalizacaoOcorrencia_exec = $('#divFiltrardadosFiscalizacaoOcorrencia_exec');
divFiltrardadosFiscalizacaoOcorrencia_exec.on('click', () => {
    var categoria = $('#divFiltrardadosFiscalizacaoOcorrencia_cat_sel').val();
    var subcategoria = $('#divFiltrardadosFiscalizacaoOcorrencia_subcat_sel').val();
    var status = $('#divFiltrardadosFiscalizacaoOcorrencia_status_sel').val();
    var url = `${host}/query/fiscalizacao?secretaria='Governo'&categoria=${categoria}&subcategoria=${subcategoria}&status=${status}`;
    var url = encodeURI(url);
    var abort;
    openLoader();
    var query = $.getJSON(url, (data) => {
        closeLoader();
        clearTimeout(abort);
        if (data.erro) {
            console.log(data.erro);
        }
        if (data.length == 0) {
            alert('Nenhum registro encontrado');
        }
        if (data.length > 0) {
            var source = new ol.source.Vector();

            var layer = new ol.layer.Vector({
                source: source,
                zIndex: 2
            })
            map.addLayer(layer);
            // var modify = new ol.interaction.Modify({ source: source });
            // map.addInteraction(modify);
            // snap = new ol.interaction.Snap({ source: source });
            // map.addInteraction(snap);
            var obj = { 'camada': layer, 'nome': `Categoria : ${categoria}, Subcategoria : ${subcategoria}` };


            allVisibleLayers.layers.push(obj);


            for (var f of data) {
                var feature = createFeatureFromGeoJson(f, 2);
                layer.getSource().addFeatures(feature);
            }

        }
    })
    abort = setTimeout(() => {
        query.abort();
        closeLoader();
        alert('Tempo de espera expirado, verifique sua conexão !');
    }, 10000)

})


var buscar_protocolo_btn = $('#buscar_protocolo_btn');

buscar_protocolo_btn.on('click', () => {
    var protocolo_secretaria = $('#protocolo_secretaria').val();
    var protocolo = $('#buscar_protocolo').val();
    var tb;
    var url;
    if (protocolo_secretaria == "SMA") {
        tb = 1;
        url = `${host}/consulta/tabular?secretaria=Meio_Ambiente&consulta=protocolo&protocolo=${protocolo}`;
    } else {
        tb = 2;
        url = `${host}/consulta/tabular?secretaria=Governo&consulta=protocolo&protocolo=${protocolo}`;
    }
    $('#buscar_result').empty();


    url = encodeURI(url);
    openLoader();
    var abort;

    var query = $.getJSON(url, (data) => {
        clearTimeout(abort);
        closeLoader();
        if (data.length > 0) {
            var f = data[0];
            for (var keys in f) {

                if (keys != "fotoDenuncia" && keys != "fotoOcorrencia") {
                    $('#buscar_result').append(` <h2 class="cat_teme">${keys} : </h2>
                        <input type="text" class="input" disabled value="${f[keys]}">`);
                } else if (keys == "fotoDenuncia" || keys == "fotoOcorrencia") {
                    $('#buscar_result').append(`<h2 class="cat_teme">${keys} : </h2><div id="marker" draggable=true>
                    <img src="" id="fotoAtual">
                </div>`)
                    $('#fotoAtual').attr('src', `data:image/png;base64, ${f[keys]}`);


                    //   var marker = new ol.Overlay({
                    //     position: [f.lng,f.lat],
                    //     positioning: 'center-center',
                    //     element: document.getElementById('marker'),
                    //     stopEvent: false
                    //   });
                    //   map.addOverlay(marker);
                }
            }

            var feature = createFeatureFromGeoJson(f, tb);
            // console.log(feature);
            var source = new ol.source.Vector({});

            var layer = new ol.layer.Vector({
                source: source,
                zIndex: 2
            })
            map.addLayer(layer);
            layer.getSource().addFeatures(feature);
            var obj = { 'camada': layer, 'nome': `Resultado Busca : ${protocolo}` };
            if (allVisibleLayers.layers.indexOf(obj) == -1) {

                allVisibleLayers.layers.push(obj);
            }
        }
    })
    abort = setTimeout(() => {
        query.abort();
        closeLoader();
        alert('Tempo de espera expirado, verifique sua conexão !');
    }, 15000)



})


var buscar_tipo = $('#buscar_tipo');
buscar_tipo.on('change', () => {
    var tipo = $(buscar_tipo).val();
    if (tipo == "protocolo") {
        $('#mapa_meta_ortofoto').fadeOut();
        $('#divBuscar_metadado').css('display', 'none');
        $('#divBuscar_protocolo').fadeIn();
        $('#buscar_result').css('display', 'block');
        $('#divBuscar_arquivos').css('display', 'none');


    } else if (tipo == "metadado") {
        $('#divBuscar_metadado').fadeIn();
        $('#divBuscar_protocolo').css('display', 'none');
        $('#buscar_result').css('display', 'none');
        $('#divBuscar_arquivos').css('display', 'none');

    } else {
        $('#mapa_meta_ortofoto').fadeOut();
        $('#divBuscar_protocolo').css('display', 'none');
        $('#divBuscar_metadado').css('display', 'none');
        $('#buscar_result').css('display', 'none');
        $('#divBuscar_arquivos').fadeIn();

        var url = `${host}/fontededados/contemfiles`;
        url = encodeURI(url);
        var abort;
        openLoader();
        var query = $.getJSON(url, (data) => {
            var select = $('#arquivo_categoria');
            select.empty();
            if (data.erro) {
                console.log(data.erro);
            } else {
                if (data.length == 0) {
                    select.append(`<option value="sem_dados">0 arquivos encontrados</option>`);
                } else {
                    for (var row of data) {
                        select.append(`<option value="${row.tabela}">${row.tabela}(${row.count})</option>`);
                    }
                }


            }
            clearTimeout(abort);
            closeLoader();
        })
        abort = setTimeout(() => {
            query.abort();
            closeLoader();
            alert('Tempo de espera expirado, verifique sua conexão !');
        }, 10000)
    }
})

var metadado_cat = $('#metadado_categoria');
metadado_cat.on('change', () => {

    if ($('#metadado_categoria').val() == "ortofotos") {

        $('#ortofoto_ano').empty();
        $('#ortofoto_ano').append(`<h2 class="cat_teme">Ano : </h2>`)
        $('#ortofoto_ano').append(`<select name="" id="metadado_categoria_ano" class="sel_teme_white">
        <option value="1998">1998</option>
        <option value="2003">2003</option>
        <option value="2007">2007</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>

    </select>`)
    } else {
        $('#ortofoto_ano').empty();
        $('#mapa_meta_ortofoto').fadeOut();
    }
})

var buscar_meta_btn = $('#buscar_meta_btn');
buscar_meta_btn.on('click', () => {
    setAllToolsNull();
    $('#meta_search_result').empty();
    var categoria = $('#metadado_categoria').val();
    if (categoria == "ortofotos") {
        $('#callAcessarOrtofoto').click();
    } else {
        $('#mapa_meta_ortofoto').fadeOut();
        var url = `${host}/listarAllFiles?pasta=${categoria}`;
        url = encodeURI(url);
        var abort;
        openLoader();
        var query = $.getJSON(url, (data) => {
            closeLoader();
            clearTimeout(abort);
            for (var file of data.files) {
                $('#meta_search_result').append(`<p><a class="download" target="_blank" href="${host}/download?diretorio=${file.nome}&pasta=${categoria}">${file.nome}</a></p>`);

            }

        })
        abort = setTimeout(() => {
            query.abort();
            closeLoader();
            alert('Tempo de espera expirado, verifique sua conexão !');
        }, 10000)

    }


})
$('#popup').on('dblclick', () => {
    $('#popup').fadeOut();
})

var selected_style = newVectorStyle('rgba(47, 108, 241, 1)', 'rgb(0, 0, 255)', 2);
var situacaoOcorrencia;
var pt_clone = null;

function getFeatureId(pixel) {



    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {

        $('#popup').empty();
        $('#popup').fadeIn();

        var f = feature.N;
        $('#popup').append(`<img src="img/fechar_vermelho.png" style="position: absolute;top: 1px;right: 1px;width: 20px;cursor: pointer;" onclick="closePopUpfromx()">`);
        $('#popup').append(`<h2 class="cat_teme" style="text-align: center;font-size : 18px;">${f.arquivo}</h2>`);
        for (var keys in f) {


            if (keys != "fotoDenuncia" && keys != "fotoOcorrencia" && keys != "geometry") {
                $('#popup').append(` <h2 class="cat_teme">${keys} : </h2>
                        <input type="text" class="input" disabled value="${f[keys]}">`);
            } else if (keys == "fotoDenuncia" || keys == "fotoOcorrencia") {
                $('#popup').append(`<h2 class="cat_teme">${keys} : </h2><div id="marker">
                <img src="data:image/png;base64, ${f[keys]}" id="fotoAtual">
            </div>`)



                //   var marker = new ol.Overlay({
                //     position: [f.lng,f.lat],
                //     positioning: 'center-center',
                //     element: document.getElementById('marker'),
                //     stopEvent: false
                //   });
                //   map.addOverlay(marker);
            }

        }

    });

}

function closePopUpfromx() {
    $('#popup').fadeOut();
}



$(document).on('click', '#novaSituacaoOcorrencia', () => {
    $("#novaSituacaoOcorrencia option[value='" + situacaoOcorrencia + "']").attr('selected', 'selected');

})

var div_foto = $('#div_foto');
div_foto.on('click', () => {
    if (fotoAtual != null) {
        if ($('#fotoExpandir').attr('src') == "img/expandirBlack.png") {
            $('#fotoGrande').fadeIn();
            $('#fotoGrande').empty();
            $('#fotoGrande').append(`<img src="data:image/png;base64, ${fotoAtual}" id="fotoGrande_img">`);
            $('#fotoExpandir').attr('src', 'img/fechar_vermelho.png');
        } else {
            $('#fotoGrande').fadeOut();

            $('#fotoExpandir').attr('src', 'img/expandirBlack.png');
        }
    }

})

var contBuffers = 1;

function bufferTool(pixel) {

    var tamanho_buffer = $('#tamanho_buffer').val();
    var tamanho_buffer_real = tamanho_buffer * 0.00000900900900900901;
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {

        // console.log(tamanho_buffer);
        var WKT = new ol.format.WKT();
        var WKTgeom = WKT.writeGeometry(feature.getGeometry());
        // console.log(WKTgeom.length);
        var url = `${host}/buffer`;

        openLoader();
        var abortAjax;
        var ajaxBuffer = $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ geom: WKTgeom, buffer: tamanho_buffer_real }),
            success: function(data) {
                var geom = data[0].geom;
                var featureFromWKT = WKT.readFeature(geom);
                // console.log(featureFromWKT);
                var source = new ol.source.Vector({});
                var layer = new ol.layer.Vector({
                    source: source,
                    zIndex: 2
                })
                source.addFeature(featureFromWKT);
                map.addLayer(layer);
                var obj = { 'camada': layer, 'nome': `Buffer_${contBuffers}_${tamanho_buffer}` };
                if (allVisibleLayers.layers.indexOf(obj) == -1) {

                    allVisibleLayers.layers.push(obj);
                }
                contBuffers++;
                closeLoader();
                clearTimeout(abortAjax);

            }
        })
        abortAjax = setTimeout(() => {
            ajaxBuffer.abort();
            closeLoader();
            alert('Tempo de conecção expirou, tente um buffer menor !');
        }, 15000);

        // $.getJSON(encodeURI(url),(data)=>{
        //     console.log(data);
        // })

    })
}



function editarAttr(pixel) {
    map.forEachFeatureAtPixel(pixel, function(feature) {
        if (feature) {
            editarAttrFeature = feature;
            editarAttrCampos = [];
            var f = feature.N;
            if (f) {
                $('#editarAttrTools_campos').empty();
                for (var keys in f) {


                    if (keys != "fotoDenuncia" && keys != "fotoOcorrencia" && keys != "geometry" && keys != "geom" && keys != "arquivo" && keys != "id") {
                        $('#editarAttrTools_campos').append(` <h2 class="cat_teme">${keys} : </h2>
                            <input type="text" class="input" value="${f[keys]}" id="AttrEditar_${keys}">`);
                        var obj = { campo: keys }
                        editarAttrCampos.push(obj);
                    }

                }
                $('#editarAttrTools').fadeIn();
            }
        }
    })
}

var editarAttrTools_aplicar = $('#editarAttrTools_aplicar');
editarAttrTools_aplicar.on('click', () => {
    $(btnToolbox).css('border', 'none');
    if (adminMOde == true) {
        var r = confirm(`Voce tem certeza desta operação ? `);
        if (r == true) {
            $('#updateAttrsAsAdmin').click();
        }


    } else {


        for (var row of editarAttrCampos) {
            var val = $(`#AttrEditar_${row.campo.trim()}`).val();
            if (val * 0 == 0) {
                var js = `editarAttrFeature.setProperties({${row.campo}:${val}});`;
                eval(js);

            } else {
                var js = `editarAttrFeature.setProperties({${row.campo}:'${val}'});`;
                eval(js);

            }



            $('#editarAttrTools').fadeOut();
            toolbox_editarAttr = false;

        }

    }
})

function getPerimetroToolActived(pixel) {
    map.forEachFeatureAtPixel(pixel, function(feature) {
        var casasdenicmais = $('#perimetroTool_casas_decimais').val();
        if (casasdenicmais == null && casasdenicmais < 0) {
            casasdenicmais = 1;
        }
        $('#toGetPerimeter').empty();
        var geom = feature.getGeometry();
        var length = ol.Sphere.getLength(geom);
        var output;
        length = length * 111000;
        if (length > 1000) {

            output = (length / 1000).toFixed(casasdenicmais) +
                ' ' + 'km';
        } else {
            output = length.toFixed(casasdenicmais) +
                ' ' + 'm';
        }
        $('#toGetPerimeter').append(`<h2 class="cat_teme">Perimetro : ${output} </h2>  `);

    })
}

var perimetroTool_aplicar = $('#perimetroTool_aplicar');
perimetroTool_aplicar.on('click', () => {
    perimetroToolActived = false;
    $('#perimetroToolTools').fadeOut();
    $(btnToolbox).css('border', 'none');
})


function getAreaToolActived(pixel) {
    map.forEachFeatureAtPixel(pixel, function(feature) {
        var casasdenicmais = $('#areaTool_casas_decimais').val();
        if (casasdenicmais == null && casasdenicmais < 0) {
            casasdenicmais = 1;
        }
        $('#toGetarea').empty();
        var geom = feature.getGeometry();
        var area = ol.Sphere.getArea(geom);
        var output;
        area = area * 12321000000;
        if (area > 1000) {
            output = (area / 1000).toFixed(casasdenicmais) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (area).toFixed(casasdenicmais) +
                ' ' + 'm<sup>2</sup>';
        }

        $('#toGetarea').append(`<h2 class="cat_teme">Area : ${output} </h2>  `);


    })


}

function getRotuloToolActived(pixel) {
    map.forEachFeatureAtPixel(pixel, function(feature) {
        var feature = feature;
        $('#rotularTools_layers_campos').empty();
        for (var keys in feature.N) {
            $('#rotularTools_layers_campos').append(`<option value="${keys}">${keys}</option>`);

        }
        feature2Rotular = feature;

    })

}

var areaTool_aplicar = $('#areaTool_aplicar');
areaTool_aplicar.on('click', () => {
    areaToolActived = false;
    $('#areaToolTools').fadeOut();
    $(btnToolbox).css('border', 'none');
})
var desenharActived = false;
map.on('click', function(evt) {

    if (toolbox_buffer == true) {
        bufferTool(evt.pixel);

    } else if (toolbox_editarAttr == true) {
        $('#editarAttrTools').css('display', 'none');
        editarAttr(evt.pixel);
    } else if (perimetroToolActived == true) {
        getPerimetroToolActived(evt.pixel);

    } else if (areaToolActived == true) {
        getAreaToolActived(evt.pixel);
    } else if (rotularToolActived == true) {
        getRotuloToolActived(evt.pixel);

    } else if (add_arquivoToolActived == true) {
        add_fileToolActived(evt.pixel, evt.coordinate);

    } else if (acessar_arquivoToolActived == true) {
        acessar_fileToolActived(evt.pixel);

    } else {
        if (buscarInteracionOpened == false && desenharInteracionOpened == false && medirInteracionOpened == false) {
            $('#popup').css('display', 'none');
            getFeatureId(evt.pixel);
        }
    }


});



// var createCamadasWmsBd_sma = function (title, layer, zIndex, visible) { // FUNÇÃO PARA CRIAR AS CAMADAS WMS
//     var camadaWms = new ol.layer.Tile({ // NOVO LAYER TILE
//         title: title, // TÍTULO DA CAMADA 
//         source: new ol.source.TileWMS({ // FONTE DA CAMADA
//             url: 'http://10.68.54.16:8080/geoserver/bd_sma/wms', // URL
//             params: { // PARÂMETROS
//                 LAYERS: 'bd_sma:' + layer, // CAMADA
//                 TILED: true // TILE
//             },
//             serverType: 'geoserver', // TIPO DO SERVIÇO
//             crossOrigin: "anonymous" // ORIGEM
//         }),
//         zIndex: zIndex, // ÍNDICE Z DA CAMADA
//         visible: visible // VISIBILIDADE DA CAMADA
//     });
//     return camadaWms; // RETORNA O LAYER TILE
// };


var exec_sma_dados = $('#exec_sma_dados');

exec_sma_dados.on('click', () => {


    var layer_sma = $('#cat_sel_dados').val();
    if (DoubleLayers.indexOf(layer_sma) == -1) {
        openLoader();
        for (var i = 0; i < sma_dados_categorias.length; i++) {
            if (layer_sma == sma_dados_categorias[i]) {
                objectCamadasWmsSma[i].setVisible(true);
                var obj = { 'camada': objectCamadasWmsSma[i], 'nome': layer_sma };
                allVisibleLayers.layers.push(obj);
                map.addLayer(objectCamadasWmsSma[i]);
            }
        }
        setTimeout(() => {
            closeLoader();
        }, 2000);
        DoubleLayers.push(layer_sma);
    } else {
        console.log('Ja existe esse Layer');
    }
})

function LayerAddRemove(layer) {
    // console.log(layer);
}
var nav_map = $('#nav_map');

nav_map.on('click', () => {



    $('#layer').css('display', 'none');
    $('#info').css('display', 'none');
    $('#div_filtro_s_ma').css('display', 'none');
    $('#div_filtro_s_ma_dados').css('display', 'none');

    if (allVisibleLayers.layers.length > 0) {

        for (var i = 0; i < allVisibleLayers.layers.length; i++) {
            if (layersLegenda.indexOf(allVisibleLayers.layers[i].nome) == -1) {
                $('#map_layers').append(`<label class="control control-checkbox">
                    ${allVisibleLayers.layers[i].nome}
            <input type="checkbox" checked="checked" class="LayerChecked" name="${allVisibleLayers.layers[i].nome}" />
            <div class="control_indicator"></div>
        </label>`);
                layersLegenda.push(allVisibleLayers.layers[i].nome);
            }
        }
    }
})

$(btnToolbox).on('click', () => {
    setAllToolsNull();
    removeBuscarInteraction();
    removeDesenharInteraction();
    removeMedirInteracion();
    if ($('#toolboxTools').css('display') == 'none') {
        $('#toolboxTools').fadeIn();
        removeBuscarInteraction();
        removeDesenharInteraction();
        removeMedirInteracion();
        $(btnToolbox).css('border', '1px solid #51fa02');



    } else {
        $('#toolboxTools').fadeOut();
        $(btnToolbox).css('border', 'none');
    }

})

var toolbox_tools_buttom = $('#toolbox_tools_buttom');

toolbox_tools_buttom.on('click', () => {
    var tool = $('#toolbox_tools').val();
    if (tool == "buffer") {
        $('#toolboxTools').css('display', 'none');
        $('#bufferTools').fadeIn();
        toolbox_buffer = true;

    } else if (tool == "editarAttr") {
        $('#toolboxTools').css('display', 'none');

        toolbox_editarAttr = true;
    } else if (tool == "perimetroTool") {
        perimetroToolActived = true;
        $('#toolboxTools').css('display', 'none');
        $('#perimetroToolTools').fadeIn();
    } else if (tool == "areaTool") {
        areaToolActived = true;
        $('#toolboxTools').css('display', 'none');
        $('#areaToolTools').fadeIn();
    } else if (tool == "rotular") {
        rotularToolActived = true;
        $('#rotularTools_layers_campos').empty();
        $('#toolboxTools').css('display', 'none');
        $('#rotularTools').fadeIn();
        $('#rotularTools_layers').empty();
        $('#toolboxTools').css('display', 'none');


    } else if (tool == "add_arquivo") {
        add_arquivoToolActived = true;
        $('#toolboxTools').css('display', 'none');


    } else if (tool == "acessar_arquivo") {
        acessar_arquivoToolActived = true;
        $('#toolboxTools').css('display', 'none');



    }
})





var rotularTools_aplicar = $('#rotularTools_aplicar');
rotularTools_aplicar.on('click', () => {
    var campo = $('#rotularTools_layers_campos').val();

    var f = feature2Rotular;
    //console.log(f);

    var js = `var texto = f.N.${campo};`;
    eval(js);
    // console.log(texto);
    if (f.getStyle() == null) {
        var style = newVectorStyle('#2929293d', '#10c7e7d2', 2);
        f.setStyle(style);

    }
    var colorFeature = f.getStyle().Xa.b;
    var contorno = f.getStyle().Ya.a;
    var largura = f.getStyle().Ya.c;

    var newStyleLabel = newVectorStyle(colorFeature, contorno, largura);
    newStyleLabel.setText(new ol.style.Text({
        text: `${campo} : ${texto}`,
        font: '28px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: 'black' }),
        stroke: new ol.style.Stroke({ color: 'white', width: 2 }),
        offsetX: -20,
        offsetY: 20,
        zIndex: 30


    }))
    f.setStyle(newStyleLabel);

    $('#rotularTools').fadeOut();
    setAllToolsNull();

})


var bufferTools_aplicar = $('#bufferTools_aplicar');
bufferTools_aplicar.on('click', () => {
    $('#bufferTools').fadeOut();
    $(btnToolbox).css('border', 'none');
    toolbox_buffer = false;
})
var editedCamada;
$(btnEditarLayer).on('click', () => {
    editedCamada = null;
    if ($('#editarTools').css('display') == 'none') {
        $(btnEditarLayer).css('border', '1px solid #51fa02');
        $('#editarTools').fadeIn();
        $('#editar_layers').empty();
        removeMedirInteracion();

        if (allVisibleLayers.layers.length > 0) {

            for (var i = 0; i < allVisibleLayers.layers.length; i++) {
                $('#editar_layers').append(`<option value='${allVisibleLayers.layers[i].nome}'>${allVisibleLayers.layers[i].nome}</option>`);
            }
        }
    } else {
        $('#editarTools').fadeOut();
        $(btnEditarLayer).css('border', 'none');
    }
})
var editarTools_aplicar = $('#editarTools_aplicar');
editarTools_aplicar.on('click', () => {
    var layer = $('#editar_layers').val();
    var camada;
    $(btnEditarLayer).css('border', 'none');


    for (var i = 0; i < allVisibleLayers.layers.length; i++) {
        if (layer == allVisibleLayers.layers[i].nome) {

            camada = allVisibleLayers.layers[i].camada;
            editedCamada = camada;

        }
    }
    var thisSource = camada.getSource();
    var modify = new ol.interaction.Modify({ source: thisSource });
    map.addInteraction(modify);
    snap = new ol.interaction.Snap({ source: thisSource });
    map.addInteraction(snap);
    $('#editarTools').fadeOut();

    modify.on('modifyend', function(e) {
        var features = e.features.getArray();
        //  console.log(features.length);
        for (var i = 0; i < features.length; i++) {
            var rev = features[i].getRevision();
            if (rev > 1) {
                featuresModified = features[i];
            }
        }
    });
    if (adminMOde == true) {

        $('#EditarAdminSalvar_div').fadeIn();
    }
})


$(btnLegenda).on('click', () => {

    if (allVisibleLayers.layers.length > 0) {

        for (var i = 0; i < allVisibleLayers.layers.length; i++) {
            if (layersLegenda.indexOf(allVisibleLayers.layers[i].nome) == -1) {
                $('#map_layers').append(`<label class="control control-checkbox">
                    ${allVisibleLayers.layers[i].nome}
            <input type="checkbox" checked="checked" class="LayerChecked" name="${allVisibleLayers.layers[i].nome}" />
            <div class="control_indicator">
            
            </div>
        </label>`);
                layersLegenda.push(allVisibleLayers.layers[i].nome);
            }
        }
    }

    if ($('#map_layers').css('display') == "none") {


        // allPopUpsOpened.push($('#map_layers').attr('id'));
        $(btnLegenda).css('border', '1px solid #51fa02');
        $('#map_layers').fadeIn();
    } else {
        $(btnLegenda).css('border', 'none');
        $('#map_layers').fadeOut();




    }

});



$(document).on("click", ".LayerChecked", function(event) {
    var input = event.currentTarget;
    var layer = input.name;
    var layerVisibility = input.checked;
    for (var i = 0; i < allVisibleLayers.layers.length; i++) {
        if (layer == allVisibleLayers.layers[i].nome) {
            if (layer == "Medições") {
                removeMedirInteracion();
                if (layerVisibility == false) {
                    map.removeLayer(allVisibleLayers.layers[i].camada);
                    $('.tooltip-static').fadeOut();
                } else {
                    map.addLayer(allVisibleLayers.layers[i].camada);
                    $('.tooltip-static').fadeIn();
                }
            } else {
                if (layerVisibility == false) {
                    map.removeLayer(allVisibleLayers.layers[i].camada);
                } else {
                    map.addLayer(allVisibleLayers.layers[i].camada);
                }
            }
        }
    }
    var LayersLegenda = $('.LayerChecked');
    var allDisabled = true;

    setTimeout(() => {
        for (var j = 0; j > LayersLegenda.length; j++) {
            if (layersLegenda[j].checked == true) {
                allDisabled = false;
            }
        }

        if (allDisabled == true) {
            // selectedsLayer.getSource().removeFeature(pt_clone);
            // pt_clone = null;
            $('#info_div').empty();
            $('#info_div').append(`<h2 class="flex_box">INFORMAÇÕES:</h2>`);
            $('#popup').fadeOut();
            $('#popup').empty();

        }
    }, 50);

});

var dragableElement;
var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
var PossibleDraggableElements = ['inputVector', 'inputRaster', 'StatsTools', 'buscarTools',
    'MeasuringTool', 'editarTools', 'editarAttrTools', 'areaToolTools',
    'perimetroToolTools', 'rotularTools', 'toolboxTools', 'styleTools',
    'popup', 'map_layers', 'desenharVector', 'fullMenu', 'gradeTools', 'bufferTools',
    'createCamps', 'add_arquivoTools', 'acessar_arquivoTools', 'cadastroTela', 'mapa_meta_ortofoto', 'mapaAuxiliar',
    'coordinates'
];

for (var element of PossibleDraggableElements) {
    var js = `$('#${element}').on('dragstart', (event)=>{
       // console.log('start');
        dragableElement = document.getElementById('${element}');
        pos3 = event.clientX;
        pos4 = event.clientY;
        
    
     });
     $('#${element}').on('dragend', ()=>{
        
        ondragEnd(event);
    
     });`;
    eval(js);
}


function ondragEnd(evt) {
    pos1 = pos3 - evt.clientX;
    pos2 = pos4 - evt.clientY;
    pos3 = evt.clientX;
    pos4 = evt.clientY;

    dragableElement.style.top = (dragableElement.offsetTop - pos2) + "px";
    dragableElement.style.left = (dragableElement.offsetLeft - pos1) + "px";


}

var sourceMedir = new ol.source.Vector();
var medirstyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(12, 243, 23, 0.205)'
    }),
    stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
    }),
    image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
            color: '#ffcc33'
        })
    }),

})
var vectorMedir = new ol.layer.Vector({
    source: sourceMedir,
    style: medirstyle,
    zIndex: 30
});

map.addLayer(vectorMedir);



/**
 * Currently drawn feature.
 * @type {ol.Feature}
 */
var sketch;


/**
 * The help tooltip element.
 * @type {Element}
 */
var helpTooltipElement;


/**
 * Overlay to show the help messages.
 * @type {ol.Overlay}
 */
var helpTooltip;


/**
 * The measure tooltip element.
 * @type {Element}
 */
var measureTooltipElement;


/**
 * Overlay to show the measurement.
 * @type {ol.Overlay}
 */
var measureTooltip;


/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
var continuePolygonMsg = 'Click para continuar a medir';


/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = 'Click para continuar a medir';


/**
 * Handle pointer move.
 * @param {ol.MapBrowserEvent} evt The event.
 */
var pointerMoveHandler = function(evt) {
    if (evt.dragging) {
        return;
    }
    /** @type {string} */
    var helpMsg = 'Click para começar a medir ';

    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
};



var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later

/**
 * Format length output.
 * @param {ol.geom.LineString} line The line.
 * @return {string} The formatted length.
 */
var formatLength = function(line) {

    var length = ol.Sphere.getLength(line);
    var output;
    length = length * 111000;
    if (length > 1000) {
        output = Math.round(length / 1000) +
            ' ' + 'km';
    } else {
        output = Math.round(length) +
            ' ' + 'm';
    }
    return output;
};

/**
 * Format area output.
 * @param {ol.geom.Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function(polygon) {
    var area = ol.Sphere.getArea(polygon);
    var output;
    area = area * 12321000000;
    if (area > 1000) {
        output = Math.round(area / 1000) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;

};

function addInteraction() {
    var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
    medirInteraction = new ol.interaction.Draw({
        source: sourceMedir,
        type: type,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(243, 66, 12, 0.245)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    map.addInteraction(medirInteraction);

    createMeasureTooltip();

    createHelpTooltip();
    var rotuloArea;
    var listener;
    medirInteraction.on('drawstart',
        function(evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    rotuloArea = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    rotuloArea = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    medirInteraction.on('drawend',
        function() {
            measureTooltipElement.className = 'tooltip tooltip-static';
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            ol.Observable.unByKey(listener);

        }, this);

}


function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);

}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);

}


/**
 * Let user change the geometry type.
 */
typeSelect.onchange = function() {
    map.removeInteraction(medirInteraction);
    addInteraction();
};



desenharActived = false;
$(btnMedir).on('click', () => {
    removeBuscarInteraction();
    removeDesenharInteraction();
    setAllToolsNull();
    $(btnToolbox).css('border', 'none');
    map.removeInteraction(desenhar);
    map.on('pointermove', pointerMoveHandler);
    map.getViewport().addEventListener('mouseout', function() {
        helpTooltipElement.classList.add('hidden');
    });
    if (allVisibleLayers.layers.indexOf(obj) == -1) {
        var obj = { 'camada': vectorMedir, 'nome': 'Medições' };
        allVisibleLayers.layers.push(obj);
    }

    if (medirInteracionOpened == false) {
        medirInteracionOpened = true;
        addInteraction();
        map.addOverlay(measureTooltip);
        map.addOverlay(helpTooltip);
        $('#MeasuringTool').fadeIn();
        $(btnMedir).css('border', '1px solid #51fa02');

    } else {
        removeMedirInteracion();
    }
})

function removeMedirInteracion() {
    medirInteracionOpened = false;
    map.removeInteraction(medirInteraction);
    map.removeOverlay(measureTooltip);
    map.removeOverlay(helpTooltip);
    $('#MeasuringTool').fadeOut();
    $(btnMedir).css('border', 'none');
}


var sourcedesenhar = new ol.source.Vector();

var vectorDesenhar = new ol.layer.Vector({
    source: sourcedesenhar,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(51, 139, 255,0.3)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgb(6, 68, 148)',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    }),
    zIndex: 2
});

map.addLayer(vectorDesenhar);
var desenhar_style = newVectorStyle('rgba(47, 108, 241, 0.548)', 'rgb(0, 0, 255)', 4);
var desenhar = new ol.interaction.Draw({
    type: 'Polygon',
    source: vectorDesenhar.getSource(),
    style: desenhar_style,
    freehand: true
});


var DrawActived = false;

var mapHadDesenharInteraction = false;
var desenharOpen2save = false;
var allLayersDesenhados = [];

function removeDesenharInteraction() {
    desenharInteracionOpened = false;
    map.removeInteraction(desenharInteraction);
    $(btnDesenhar).css('border', 'none');
    $('#desenharVector').fadeOut();
    mapHadDesenharInteraction = false;
    btnDesenhar.children[0].src = "./img/create.png";
    desenharOpen2save = false;
}

$(btnDesenhar).on('click', () => {

    if (desenharOpen2save == true) {
        removeDesenharInteraction();
    } else {


        if (desenharInteracionOpened == false) {
            $('#desenharVector').fadeIn();
            $(btnDesenhar).css('border', '1px solid #51fa02');
            allCampos2Features = [];
            desenharInteracionOpened = true;
            removeBuscarInteraction();
            removeMedirInteracion();
        } else {
            $('#desenharVector').fadeOut();
            $(btnDesenhar).css('border', 'none');
            desenharInteracionOpened = false;
        }
    }
})

var tipo_desenhar = $('#tipo_desenhar');
tipo_desenhar.on('change', () => {
    if ($(tipo_desenhar).val() == "LineString") {
        $('#tituloCor').css('display', 'none');
        $('#cor_layer_desenhar').css('display', 'none');

    } else {
        $('#tituloCor').css('display', 'block');
        $('#cor_layer_desenhar').css('display', 'block');
    }
})

var desenhar_vector_buttom = $('#desenhar_vector_buttom');
var desenhadaFeature;
desenhar_vector_buttom.on('click', () => {

    refleshLegenda();
    if (mapHadDesenharInteraction == true) {
        map.removeInteraction(desenharInteraction);
        mapHadDesenharInteraction = false;
    }
    var tipo = $(tipo_desenhar).val();
    var modo_desenhar = $('#modo_desenhar').val();
    var cor_layer_desenhar = $('#cor_layer_desenhar').val();
    var cont_layer_desenhar = $('#cont_layer_desenhar').val();
    var largura_linha_desenhar = $('#largura_linha_desenhar').val();
    var nomeLayer_desenhar = $('#nomeLayer_desenhar').val();


    var layerDesenharName = `layer_${nomeLayer_desenhar}`;
    var sourcerDesenharLayer = `source_${nomeLayer_desenhar}`;
    var nomePermitido;
    for (var i in allLayersDesenhados) {
        if (allLayersDesenhados[i] == nomeLayer_desenhar) {
            nomePermitido = false;
        } else {
            nomePermitido = true;
        }
    }
    if (nomeLayer_desenhar.trim() == "" || nomePermitido == false) {
        alert('Nome do layer invalido.Por favor, digite outro.');

    } else {

        if (tipo == "Polygon") {
            cor_layer_desenhar = cor_layer_desenhar + "3d";
        }

        eval(`

    var sourcerDesenharLayer = new ol.source.Vector();

    var layerDesenharName = new ol.layer.Vector({
        source: sourcerDesenharLayer,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: cor_layer_desenhar
            }),
            stroke: new ol.style.Stroke({
                color: cont_layer_desenhar,
                width: largura_linha_desenhar
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: cor_layer_desenhar
                })
            })
        }),
        zIndex:2
    });
    map.addLayer(layerDesenharName);
    var obj = { "camada": layerDesenharName, "nome": nomeLayer_desenhar };
        allVisibleLayers.layers.push(obj);
`);


        var freehand;
        if (modo_desenhar == "livre") {
            freehand = true;
        } else {
            freehand = false;
        }


        var desenhar_style = newVectorStyle(cor_layer_desenhar, cont_layer_desenhar, largura_linha_desenhar);
        desenharInteraction = new ol.interaction.Draw({
            type: tipo,
            source: sourcerDesenharLayer,
            style: desenhar_style,
            freehand: freehand
        });

        map.addInteraction(desenharInteraction);
        mapHadDesenharInteraction = true;
        $('#desenharVector').fadeOut();
        desenharInteracionOpened = true;
        btnDesenhar.children[0].src = "./img/save.png";
        $(btnDesenhar).css('border', '1px solid #51fa02');
        desenharOpen2save = true;
        allLayersDesenhados.push(nomeLayer_desenhar);

    }
    desenharInteraction.on('drawend', (event) => {
        desenhadaFeature = event.feature;

        var createCamps = $('#createCamps_campos');
        createCamps.empty();

        if (allCampos2Features.length > 0) {
            for (var i = 0; i < allCampos2Features.length; i++) {

                createCamps.append(`<h2 class="cat_teme">${allCampos2Features[i].campo}</h2>
                <input type="${allCampos2Features[i].tipo}" id="${allCampos2Features[i].campo}" placeholder="valor..." class="sel_teme_white" style="color:gray;">`);
            }

            map.on('click', (event) => {
                var x = event.pixel[0];
                var y = event.pixel[1];
                $('#createCamps').css({ 'top': y, 'left': x });

            })

            $('#createCamps').fadeIn();
            $('#createCampsBack').fadeIn();

        }

    })



    $('#nomeLayer_desenhar').val("");
    $('#nomedocampo').val("");

})
var createCamps_buttom = $('#createCamps_buttom');
createCamps_buttom.on('click', () => {
    $('#allCampos').empty();
    for (var i = 0; i < allCampos2Features.length; i++) {
        var attr = $(`#${allCampos2Features[i].campo}`).val();
        var campo = allCampos2Features[i].campo;

        var exec = `desenhadaFeature.setProperties({${campo}:'${attr}'});`;
        eval(exec);
        $('#createCamps').fadeOut();
        $('#createCampsBack').fadeOut();


    }
})

var campos_vector_buttom = $('#campos_vector_buttom');
campos_vector_buttom.on('click', () => {
    var nomedocampo = $('#nomedocampo').val().trim();
    var TipoCampo = $('#TipoCampo').val();
    if (nomedocampo != " " || nomedocampo != "") {
        if (allCampos2Features.length > 1) {
            var campos = [];
            for (var i = 0; i < allCampos2Features.length; i++) {
                campos.push(allCampos2Features[i].campo);
            }

            if (campos.indexOf(nomedocampo) != -1) {
                alert('Este campo ja existe !');
            } else {
                var obj = { campo: nomedocampo, tipo: TipoCampo };

                allCampos2Features.push(obj);
                $('#allCampos').append(`<h2 class="cat_teme">${nomedocampo} : ${TipoCampo}</h2>`);
            }

        } else {
            var obj = { campo: nomedocampo, tipo: TipoCampo };
            allCampos2Features.push(obj);
            $('#allCampos').append(`<h2 class="cat_teme">${nomedocampo} : ${TipoCampo}</h2>`);
        }



    }


})


var sourceBuscar = new ol.source.Vector();

var vectorBuscar = new ol.layer.Vector({
    source: sourceBuscar,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(235, 127, 39,0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(235, 127, 39,0.7)',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: 'rgba(235, 127, 39,0.7)'
            })
        })
    }),
    zIndex: 31
});

map.addLayer(vectorBuscar);

var buscar_style = newVectorStyle('rgba(235, 127, 39,0.2)', 'rgba(235, 127, 39,0.7)', 4);
buscarInteraction = new ol.interaction.Draw({
    type: 'Polygon',
    source: vectorBuscar.getSource(),
    style: buscar_style,
    freehand: false
});
var buscarTools = $('#buscarTools');
var BuscarActived = false;
$(btnBuscar).on('click', () => {
    setAllToolsNull();
    $(btnStats).css('border', 'none');
    $(btnBuscar).css('border', '1px solid #51fa02');

    if (buscarInteracionOpened == false) {
        buscarTools.fadeIn();
        $(btnBuscar).css('border', '1px solid #51fa02');
        map.addInteraction(buscarInteraction);

        buscarInteracionOpened = true;
        removeDesenharInteraction();
        removeMedirInteracion();

    } else {
        removeBuscarInteraction();

    }

})


function removeBuscarInteraction() {
    $(buscarTools).fadeOut();
    map.removeInteraction(buscarInteraction);
    buscarInteracionOpened = false;
    $(btnBuscar).css('border', 'none');
}



var busca_desenhar_cat_sel = $('#busca_desenhar_cat_sel');

busca_desenhar_cat_sel.on('change', () => {
    if ($(busca_desenhar_cat_sel).val() == "Meio_Ambiente") {
        $('#busca_desenhar_sel').empty();
        var optionSMA = `<option value="Limpeza Publica">Limpeza Publica</option>
<option value="Coleta de Residuos">Coleta de Residuos</option>
<option value="Meio Ambiente">Meio Ambiente</option>
<option value="Proteção Animal">Proteção Animal</option>                
<option value="Todas">Todas</option>`;
        $('#busca_desenhar_sel').append(optionSMA);

    } else {
        $('#busca_desenhar_sel').empty();
        var optionSG = `<option value="Iluminacao Pública">Iluminação Pública</option>
<option value="Manutenção De Vias Públicas">Manutenção De Vias Publicas</option>
<option value="Mobilidade Urbana">Mobilidade Urbana</option>
<option value="Ônibus">Ônibus</option>
<option value="Ouvidoria">Ouvidoria</option>
<option value="Proteção Animal">Proteção Animal</option>
<option value="SAAE">SAAE</option>
<option value="Todas">Todas</option>`;
        $('#busca_desenhar_sel').append(optionSG);
    }
})


var buscar_buttom = $('#buscar_buttom');
buscar_buttom.on('click', () => {

    var secretaria = $('#busca_desenhar_cat_sel').val();
    var categoria = $('#busca_desenhar_sel').val();
    var WKT = new ol.format.WKT();
    var features = vectorBuscar.getSource().getFeatures();

    if (features.length > 0) {
        for (var i = 0; i < features.length; i++) {
            var geom = features[i].getGeometry();
            var geom2WKT = WKT.writeGeometry(geom);
            var url = `http://10.68.54.169:443/intersects?geom='${geom2WKT}'&secretaria='${secretaria}'&categoria='${categoria}'`;
            url = encodeURI(url);
            //  console.log(url);
            openLoader();
            var abort;
            var query = $.getJSON(url, function(data) {
                if (data.length > 1) {
                    alert(`Resultado da busca : ${data.length} registros.`);
                } else {
                    alert(`Nenhum registro encontrado para esta pesquisa.`);
                }
                closeLoader();
                clearTimeout(abort);

                try {

                    if (secretaria == "Meio_Ambiente") {
                        for (var i = 0; i < data.length; i++) {
                            var feature = createFeatureFromGeoJson(data[i], 1);
                            //   console.log(feature);
                            LayerResultBuscar.getSource().addFeatures(feature);
                        }
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var feature = createFeatureFromGeoJson(data[i], 2);
                            //console.log(feature);
                            LayerResultBuscar.getSource().addFeatures(feature);
                        }
                    }
                } catch {
                    console.log('ops, algo deu errado !');
                }
            })
            abort = setTimeout(() => {
                query.abort();
                closeLoader();
                alert('Tempo de espera expirado, verifique sua conexão !');
            }, 10000)
        }
    }
    for (var i in features) {
        vectorBuscar.getSource().removeFeature(features[i]);
    }
    var obj = { 'camada': LayerResultBuscar, 'nome': 'Resultado Busca' };
    if (allVisibleLayers.layers.indexOf(obj) == -1) {

        allVisibleLayers.layers.push(obj);
    }
    setTimeout(() => {
        removeBuscarInteraction();
        buscarInteracionOpened = false;
    }, 100);


})

var vectorResultBuscar = new ol.source.Vector({});

var LayerResultBuscar = new ol.layer.Vector({
    source: vectorResultBuscar,
    style: newVectorStyle("5f2727e3", "#eb0808e3", 3),
    zIndex: 32


});



map.addLayer(LayerResultBuscar);
map.removeLayer(vectorBuscar);
map.addLayer(vectorBuscar);

function createFeatureFromGeoJson(ocorrencia, tb) {
    var geojsonObject;
    var lat, lng;
    if (ocorrencia.lat) {
        lat = ocorrencia.lat;
        lng = ocorrencia.lng;
    } else {
        lat = ocorrencia.Lat;
        lng = ocorrencia.Lng;
    }
    if (tb == 1) {
        geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326'
                }
            },
            'features': [{
                'type': 'Feature',
                'properties': {
                    'protocolo': ocorrencia.protocolo,
                    'idCidadao': ocorrencia.idCidadao,
                    'categoria': ocorrencia.categoria,
                    'subcategoria': ocorrencia.subcategoria,
                    'descricaoDenuncia': ocorrencia.descricaoDenuncia,
                    'situacaoDenuncia': ocorrencia.situacaoDenuncia,
                    'dataDenuncia': ocorrencia.dataDenuncia,
                    'endereco': ocorrencia.endereco,
                    'fotoDenuncia': ocorrencia.fotoDenuncia,
                    'arquivo': 'Denuncias'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lng, lat]
                }
            }]
        };
    } else {
        geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326'
                }
            },
            'features': [{
                'type': 'Feature',
                'properties': {
                    'protocolo': ocorrencia.protocolo,
                    'idCidadao': ocorrencia.idCidadao,
                    'categoria': ocorrencia.categoria,
                    'subcategoria': ocorrencia.subcategoria,
                    'descricaoOcorrencia': ocorrencia.descricaoOcorrencia,
                    'situacaoOcorrencia': ocorrencia.situacaoOcorrencia,
                    'dataOcorrencia': ocorrencia.dataOcorrencia,
                    'endereco': ocorrencia.endereco,
                    'fotoOcorrencia': ocorrencia.fotoOcorrencia,
                    'arquivo': 'Ocorrencias'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lng, lat]
                }
            }]
        };
    }
    var feature = new ol.format.GeoJSON().readFeatures(geojsonObject);

    return feature;

}


function createFeaturesFromJSON(json, tb, nome) {

    var source = new ol.source.Vector({});
    var layer = new ol.layer.Vector({
        source: source,
        style: newVectorStyle('#2929293d', '#10c7e7d2', 2),
        zIndex: 2
    })
    var WKT = new ol.format.WKT();

    for (var f of json) {
        var featureFromText = WKT.readFeature(f.geometry);
        for (var keys in f) {
            if (keys != "geom" && keys != "geometry") {
                // console.log(featureFromText);
                try {
                    var js = `featureFromText.setProperties({${keys}:'${f[keys]}'});`;
                    eval(js);
                } catch {

                }

            }

        }
        featureFromText.setProperties({ arquivo: tb });
        //console.log(featureFromText);
        source.addFeature(featureFromText);

    }


    var obj = { 'camada': layer, 'nome': nome, 'tb': tb };

    // var feature = layer.getSource().getFeatures();
    // var geometry = feature[0].getGeometry();
    // var extent = geometry.getExtent();
    // console.log(extent);
    // map.setExtent(extent);

    allVisibleLayers.layers.push(obj);
    map.addLayer(layer);



}


function createFeatureFromGeoJsonSemFoto(ocorrencia, tb) {
    var geojsonObject;
    var lat, lng;
    if (ocorrencia.lat) {
        lat = ocorrencia.lat;
        lng = ocorrencia.lng;
    } else {
        lat = ocorrencia.Lat;
        lng = ocorrencia.Lng;
    }
    if (tb == 1) {
        geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326'
                }
            },
            'features': [{
                'type': 'Feature',
                'properties': {
                    'protocolo': ocorrencia.protocolo,
                    'idCidadao': ocorrencia.idCidadao,
                    'categoria': ocorrencia.categoria,
                    'subcategoria': ocorrencia.subcategoria,
                    'descricaoDenuncia': ocorrencia.descricaoDenuncia,
                    'situacaoDenuncia': ocorrencia.situacaoDenuncia,
                    'dataDenuncia': ocorrencia.dataDenuncia,
                    'endereco': ocorrencia.endereco


                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lng, lat]
                }
            }]
        };
    } else {
        geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:4326'
                }
            },
            'features': [{
                'type': 'Feature',
                'properties': {
                    'protocolo': ocorrencia.protocolo,
                    'idCidadao': ocorrencia.idCidadao,
                    'categoria': ocorrencia.categoria,
                    'subcategoria': ocorrencia.subcategoria,
                    'descricaoOcorrencia': ocorrencia.descricaoOcorrencia,
                    'situacaoOcorrencia': ocorrencia.situacaoOcorrencia,
                    'dataOcorrencia': ocorrencia.dataOcorrencia,
                    'endereco': ocorrencia.endereco

                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lng, lat]
                }
            }]
        };
    }
    var feature = new ol.format.GeoJSON().readFeatures(geojsonObject);
    return feature;

}





function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var loader = $('#loaderBack');
async function openLoader() {
    loader.fadeIn();
    $(loader).on('mousemove', (event) => {

        $("#carregando").css({ 'top': event.clientY + 10, 'left': event.clientX + 20, 'display': 'block' });

    })







    $(`#carregando`).empty();
    $(`#carregando`).append(`Carregando`);




}

function closeLoader() {
    loader.fadeOut();
    $("#carregando").fadeOut();

}


function addImage2Map(file, titulo, xmax, ymax, xmin, ymin) {

    var layer = new ol.layer.Image({
        opacity: 1,
        title: titulo,

        source: new ol.source.ImageStatic({
            url: file,

            projection: 'EPSG:4326',

            imageExtent: [xmax, ymax, xmin, ymin]
        })
    });

    map.addLayer(layer);

}
var Agd;
var labels = ['LayersLabel', 'MapaBaseLabel', 'GradeLabel', 'AddGeoJSONLabel', 'EstatisticasLabel',
    'buscarLabel', 'criarLabel', 'downloadLabel', 'medirLabel', 'exportarLabel', 'estiloLabel',
    'ferramentasLabel', 'editarLabel', 'consoleLabel', 'admLabel', 'menu_btn',
    'ajuda_btn'
];

function makeLabelsBlack() {

    for (var l of labels) {
        var js = `$('#${l}').css('color','#262525bf');`;
        eval(js);

    }
}

function makeLabelsWhite() {
    for (var l of labels) {
        var js = `$('#${l}').css('color','white');`;
        eval(js);
    }
}


var inputRaster = $('#inputRaster');
$(btnRaster).on('click', () => {
    if ($(inputRaster).css('display') == 'none') {
        $(btnRaster).css('border', '1px solid #51fa02');
        inputRaster.fadeIn();
    } else {
        inputRaster.fadeOut();
        $(btnRaster).css('border', 'none');
    }

});

var basemap;
var basemapInit = new ol.layer.Tile({
    visible: true,
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: 'AgDol3nJb3nKPr3wQlsLqzif5uWDKPymbNTDQAkFxiHlZf7GjiL7Da5Qg4EFqIn_',
        imagerySet: 'AerialWithLabels'
    })
});
map.addLayer(basemapInit);


$(raster_buttom).on('click', () => {
    var fundo = $('#imagem_fundo').val();
    if (fundo == "OSM") {
        try {
            basemap = new ol.layer.Tile({
                source: new ol.source.OSM(),
                zIndex: 1
            })
            map.addLayer(basemap);
        } catch {
            console.log('erro no basemap');
        }

    }
    if (fundo == "Road" || fundo == "RoadOnDemand" || fundo == "OSM") {
        makeLabelsBlack();
    } else {
        makeLabelsWhite();
    }
    basemap = new ol.layer.Tile({
        visible: true,
        preload: Infinity,
        source: new ol.source.BingMaps({
            key: 'AgDol3nJb3nKPr3wQlsLqzif5uWDKPymbNTDQAkFxiHlZf7GjiL7Da5Qg4EFqIn_',
            imagerySet: fundo
        })
    });
    map.addLayer(basemap);
    map.removeLayer(basemapInit);

    $('#inputRaster').fadeOut();
    $(btnRaster).css('border', 'none');


})

var rasterImg;

function setGrade(bool) {
    if (bool == 1) {
        graticule.setMap(map);
    } else {
        graticule.setMap(null);
    }
}

var style_aplicar_grade_buttom = $('#style_aplicar_grade_buttom');
style_aplicar_grade_buttom.on('click', () => {
    var cor = $('#cor_layer_style_grade').val();
    var largura = $('#largura_linha_style_grade').val();
    var estilo = $('#largura_linha_type_grade').val();

    createGrade(cor, largura, estilo);
})
var graticule;

function createGrade(cor, largura, estilo) {
    if (graticule != null) {
        graticule.setMap(null);
    }
    if (largura != 0) {
        if (estilo == "solida") {
            estilo = [0.5, 0];
        } else {
            estilo = [0.5, 4];
        }
        graticule = new ol.Graticule({
            // the style to use for the lines, optional.
            strokeStyle: new ol.style.Stroke({
                color: cor,
                width: largura,
                lineDash: estilo
            }),
            showLabels: true
        });

        graticule.setMap(map);
    }

}
createGrade('rgba(248, 96, 8, 0.979)', 2, "ponto");
$(btnGrade).on('click', () => {

    if ($('#gradeTools').css('display') == "none") {
        $('#gradeTools').fadeIn();
        $(btnGrade).css('border', '1px solid #51fa02');

    } else {
        $('#gradeTools').fadeOut();
        $(btnGrade).css('border', 'none');
    }



})

$(btnVector).on('click', () => {
    var inputVector = $('#inputVector');
    if ($(inputVector).css('display') == 'none') {
        $(btnVector).css('border', '1px solid #51fa02');
        $(btnStats).css('border', 'none');

        inputVector.fadeIn();
        $('#StatsTools').css('display', 'none');

    } else {
        inputVector.fadeOut();
        $(btnVector).css('border', 'none');

    }
})


var vectorImg;

document.getElementById('input_img_vector').onchange = function(evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function() {
            vectorImg = fr.result;
        }
        fr.readAsText(files[0]);
    }

    // Not supported
    else {
        alert('Ops, algo deu errado !');
    }
}






var vector_buttom = $('#vector_buttom');
$(vector_buttom).on('click', (event) => {
    var cor = $('#cor_vet_oc_geojson').val();
    var contorno = $('#cont_vet_oc_geojson').val();

    cor = cor + "3d";
    var largura = $('#largura_linha_geojson').val();
    try {
        var features = new ol.format.GeoJSON().readFeatures(vectorImg);
        var vectorSource = new ol.source.Vector({});
        var style = newVectorStyle(cor, contorno, largura);

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: style,
            zIndex: 2

        });



        vectorLayer.getSource().addFeatures(features);

        var nome = $('#nomeLayer_vector').val();
        map.addLayer(vectorLayer);

        var obj = { "camada": vectorLayer, "nome": nome };
        allVisibleLayers.layers.push(obj);
    } catch {
        alert('Ops, algo errado com o seu GeoJSON !');
    }

})

$(btnStats).on('click', () => {
    var StatsTools = $('#StatsTools');
    if ($(StatsTools).css('display') == 'none') {
        $(btnStats).css('border', '1px solid #51fa02');
        $('#inputVector').fadeOut();
        $(btnVector).css('border', 'none');
        removeBuscarInteraction();


        StatsTools.fadeIn();
    } else {
        StatsTools.fadeOut();
        $(btnStats).css('border', 'none');

    }
})

var statsdesenhar_cat_sel = $('#statsdesenhar_cat_sel');

$(statsdesenhar_cat_sel).on('change', (event) => {
    var secretaria = event.target.value;

    if (secretaria == "Governo") {

        var subcat = $('#statsdesenhar_sel_consulta');
        $(subcat).empty();
        $(subcat).append(` <option value="Quantidade de Denuncias">Quantidade de Ocorrencias</option>
       <option value="Denuncia resolvidas">Ocorrencias resolvidas</option>
       <option value="Denuncias mais frequentes">Categorias mais frequentes</option>
         `);
    } else {
        var subcat = $('#statsdesenhar_sel_consulta');
        $(subcat).empty();
        $(subcat).append(` <option value="Quantidade de Denuncias">Quantidade de Denuncias</option>
    <option value="Denuncia resolvidas">Denuncia resolvidas</option>
    <option value="Denuncias mais frequentes">Categorias mais frequentes</option>
     `);
    }
})

var stats_buttom = $('#stats_buttom');
$(stats_buttom).on('click', () => {
    var secretaria = $('#statsdesenhar_cat_sel').val();
    var consulta = $('#statsdesenhar_sel_consulta').val();
    var abort;
    var urlConsulta = `http://10.68.54.169:443/consulta/tabular?secretaria=${secretaria}&consulta=${consulta}`;
    urlConsulta = encodeURI(urlConsulta);
    openLoader();
    var query = $.getJSON(urlConsulta, (data) => {
        $('#resultado').fadeIn();
        //console.log(data);
        if (data.length > 0) {
            $('#resultado').empty();
            var colunas = [];


            $.each(data[0], function(key, value) {
                colunas.push(key);

            });

            var htmlColunas = `<tr>`;
            for (var i of colunas) {
                htmlColunas += `<th>${i}</th>`;
            }
            htmlColunas += `</tr>`;
            $('#resultado').append(htmlColunas);

            for (var i of data) {
                var registro = `<tr>`;
                for (var j of colunas) {
                    // console.log(j);

                    registro += `<td>${i[j]}</td>`
                }
                registro += `</tr>`;
                $('#resultado').append(registro);
            }

        } else {
            alert('Não existes dados no banco ainda ... ');
        }
        clearTimeout(abort);
        closeLoader();
    })
    abort = setTimeout(() => {
        query.abort();
        closeLoader();
        alert('Tempo de conecção expirou !');
    }, 10000)

})

var input_user = $('#input_user');
input_user.on('change', () => {

    if ($(input_user).val() == "funcionario") {
        $('#mat').text('Matricula :');
        $('#user').attr('placeholder', 'Digite sua matricula');
    } else {
        $('#mat').text('CPF');
        $('#user').attr('placeholder', 'Digite seu CPF');
    }
})

let users = [{
    user: "natasha.kredensir",
    pass: "nk123456"
}, {
    user: "adm",
    pass: "adm654321"
}];

var exec_LogIn = $('#exec_LogIn');
exec_LogIn.on('click', () => {


    openLoader();
    let user = {
        user: $('#user').val(),
        pass: $('#senha').val()
    }


    setTimeout(() => {
        if (user.user == "adm" && user.pass == "adm654321") {
            closeLoader();
            $('#primeiraDiv').fadeOut();
        } else {
            closeLoader();
            alert("Usuario e/ou senha incorretos");
        }
    }, 2000);


})



$(btnBaixar).on('click', () => {
    $(btnBaixar).css('border', '1px solid #51fa02');

    setTimeout(() => {
        var r = confirm(`Voce tem certeza que quer baixar todas as camdas que estão no Mapa ?`);
        refleshLegenda();
        if (r == true) {
            var t = prompt('Qual formato deseja ? [.html,.geojson]', '.geojson');
            var exportHtmlJSON = [];
            var allvisiblesJSON = $('.LayerChecked');
            for (var i of allvisiblesJSON) {
                if (i.checked == true) {
                    for (var j of allVisibleLayers.layers) {
                        if (i.name == j.nome) {

                            exportHtmlJSON.push(j);
                            if (t.trim() == '.geojson') {
                                exportGeoJSON(j);
                            }


                        }
                    }
                }
            }
            if (t.trim() == '.html') {
                exportHTML(exportHtmlJSON);
            }

            //console.log(exportHtmlJSON);
        }
        setTimeout(() => {
            $(btnBaixar).css('border', 'none');
        }, 100)
    }, 100);
})

function exportHTML(array) {
    var htmlLayers = "";
    var html = `<!DOCTYPE html>
<html>

<head>
    <title>Mapa</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <style>
        #Layers {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #eeeeeeb0;
            border: 1px solid #d3d2d2;
            width: 200px;
            height: 200px;
            overflow: auto;
            padding: 2px;

        }
    </style>
</head>

<body>
    <div id="map" class="map"></div>
    <div id="Layers">
        
    </div>
    <script>
        var allVisibleLayers = { layers: [] };



        function newVectorStyle(fill, stroke, width) {
            let style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: fill
                }),
                stroke: new ol.style.Stroke({
                    width: width,
                    color: stroke
                }),
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: fill
                    }),
                    stroke: new ol.style.Stroke({
                        width: width,
                        color: stroke
                    }),
                    radius: 7
                })
            });
            return style;
        };
      

          
          
    
            var map = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                    
                ],
                target: 'map',
                controls: ol.control.defaults({
                    attributionOptions: {
                        collapsible: false
                    }
                }),
                view: new ol.View({
            projection: 'EPSG:4326',
            center: [-45.96, -23.3],
    
            zoom: 10,           
            maxZoom: 19
    
        })
    });
    

  

`;
    //console.log(array);
    var jsonArray = { layers: [] };
    for (var layer of array) {
        var colorFeature;
        var contorno;
        var largura;
        var features = layer.camada.getSource().getFeatures();
        if (features[0].getStyle() != null) {
            colorFeature = features[0].getStyle().Xa.b;
            contorno = features[0].getStyle().Ya.a;
            largura = features[0].getStyle().Ya.c;
        } else {
            colorFeature = '#d3d2d29d';
            contorno = '#f70606';
            largura = 2;
        }


        if (features.length > 0) {
            var GJSON = new ol.format.GeoJSON();
            var newGeoJSON = {
                "type": "FeatureCollection",
                "name": "conectaJacarei",
                "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                "features": []
            }
            for (var i of features) {
                var featuresJSON = GJSON.writeFeatureObject(i);
                newGeoJSON.features.push(featuresJSON);

            }
            //console.log(JSON.stringify(newGeoJSON));
            htmlLayers = `${htmlLayers} var ${layer.nome.replace(/\-/g, '_')} = ${JSON.stringify(newGeoJSON)};

            var style${layer.nome.replace(/\-/g, '_')} = newVectorStyle('${colorFeature}','${contorno}',${largura});

            var vectorSource${layer.nome.replace(/\-/g, '_')} = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(${layer.nome.replace(/\-/g, '_')})
              });
        
              
        
              var vectorLayer${layer.nome.replace(/\-/g, '_')} = new ol.layer.Vector({
                source: vectorSource${layer.nome.replace(/\-/g, '_')},
                style : style${layer.nome.replace(/\-/g, '_')}
                
              });
              var obj = { 'camada': vectorLayer${layer.nome.replace(/\-/g, '_')}, 'nome': '${layer.nome.replace(/\-/g, '_')}' };
              allVisibleLayers.layers.push(obj);

              map.addLayer(vectorLayer${layer.nome.replace(/\-/g, '_')});
              
              

            `;

        }
    }
    html = `${html} 
    ${htmlLayers}

    $('#Layers').empty();
    for (var i = 0; i < allVisibleLayers.layers.length; i++) {
        $('#Layers').append('<input type="checkbox" class="camadas" name="'+allVisibleLayers.layers[i].nome+'" checked>'+allVisibleLayers.layers[i].nome);
    }
	
	  $('.camadas').on('click', (event) => {
            var input = event.currentTarget;
            var layer = input.name;
            var layerVisibility = input.checked;
            for (var i = 0; i < allVisibleLayers.layers.length; i++) {
                if (layer == allVisibleLayers.layers[i].nome) {

                    if (layerVisibility == false) {
                        map.removeLayer(allVisibleLayers.layers[i].camada);
                    } else {
                        map.addLayer(allVisibleLayers.layers[i].camada);
                    }

                }
            }
        })
        var graticule = new ol.Graticule({
            // the style to use for the lines, optional.
            strokeStyle: new ol.style.Stroke({
              color: 'rgba(255,120,0,0.9)',
              width: 2,
              lineDash: [0.5, 4]
            }),
            showLabels: true
          });
    
          graticule.setMap(map);
          

    </script>
</body>

</html>
    `;
    let link = document.createElement('a');
    link.setAttribute('download', `mapa.html`);
    link.href = makeTextFile(html);
    document.body.appendChild(link);

    window.requestAnimationFrame(function() {
        let event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });


    // var features = layer.camada.getSource().getFeatures();
    // if (features.length > 0) {
    //     var GJSON = new ol.format.GeoJSON();
    //     var newGeoJSON = {
    //         "type": "FeatureCollection",
    //         "name": "conectaJacarei",
    //         "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    //         "features": []
    //     }
    //     for (var i of features) {
    //         var featuresJSON = GJSON.writeFeatureObject(i);
    //         newGeoJSON.features.push(featuresJSON);

    //     }


    //     let link = document.createElement('a');
    //     link.setAttribute('download', `${layer.nome}.geojson`);
    //     link.href = makeTextFile(JSON.stringify(newGeoJSON));
    //     document.body.appendChild(link);

    //     window.requestAnimationFrame(function () {
    //         let event = new MouseEvent('click');
    //         link.dispatchEvent(event);
    //         document.body.removeChild(link);
    //     });
    // }
}


function exportGeoJSON(layer) {


    var features = layer.camada.getSource().getFeatures();
    if (features.length > 0) {
        var GJSON = new ol.format.GeoJSON();
        var newGeoJSON = {
            "type": "FeatureCollection",
            "name": "conectaJacarei",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": []
        }
        for (var i of features) {
            var featuresJSON = GJSON.writeFeatureObject(i);
            newGeoJSON.features.push(featuresJSON);

        }


        let link = document.createElement('a');
        link.setAttribute('download', `${layer.nome}.geojson`);
        link.href = makeTextFile(JSON.stringify(newGeoJSON));
        document.body.appendChild(link);

        window.requestAnimationFrame(function() {
            let event = new MouseEvent('click');
            link.dispatchEvent(event);
            document.body.removeChild(link);
        });
    }
}

let textFile = null,
    makeTextFile = function(text) {
        var data = new Blob([text], { type: 'text/plain' });
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    };

function refleshLegenda() {
    if (allVisibleLayers.layers.length > 0) {

        for (var i = 0; i < allVisibleLayers.layers.length; i++) {
            if (layersLegenda.indexOf(allVisibleLayers.layers[i].nome) == -1) {
                $('#map_layers').append(`<label class="control control-checkbox">
                        ${allVisibleLayers.layers[i].nome}
                <input type="checkbox" checked="checked" class="LayerChecked" name="${allVisibleLayers.layers[i].nome}" />
                <div class="control_indicator"></div>
            </label>`);
                layersLegenda.push(allVisibleLayers.layers[i].nome);
            }
        }
    }
}

var camada;
var campo_to_categorizar;

var layer = $('#layer_style');
$(layer).on('change', () => {
    if ($('#estilo_simples').css('display') == 'none') {
        $('#estilo_simples').fadeIn();
        $('#estilo_categoriazado').fadeOut();
        $('#valores_categoriazado').empty();
        $('#campos_categoriazado').empty();
    }

});
$(btnStyle).on('click', () => {
    $('#layer_style').empty();
    if ($('#styleTools').css('display') == "none") {
        $(btnStyle).css('border', '1px solid #51fa02');

        $(styleTools).fadeIn();
        $('#estilo_simples').fadeIn();
        $('#estilo_categoriazado').fadeOut();
    } else {
        $(styleTools).fadeOut();
        $(btnStyle).css('border', 'none');

    }
    for (var i = 0; i < allVisibleLayers.layers.length; i++) {
        $('#layer_style').append(`<option>${allVisibleLayers.layers[i].nome}</option>`);
    }
})

var tipo_de_estilo = $('#tipo_de_estilo');
tipo_de_estilo.on('change', () => {
    var val = $(tipo_de_estilo).val();
    if (val == "1") {
        $('#estilo_simples').fadeIn();
        $('#estilo_categoriazado').fadeOut();

    } else {
        $('#estilo_simples').fadeOut();
        $('#estilo_categoriazado').fadeIn();

        var layer = $('#layer_style').val();



        for (var i = 0; i < allVisibleLayers.layers.length; i++) {
            if (layer == allVisibleLayers.layers[i].nome) {

                camada = allVisibleLayers.layers[i].camada;

            }
        }
        var features = camada.getSource().getFeatures();
        // console.log(features);
        var fez = false;

        for (var f of features) {
            if (fez == false) {
                for (var keys in f.N) {
                    // $('#campos_categoriazado').append(`<option value='${keys}'>${keys}</option>`);
                    st = document.getElementById('campos_categoriazado');
                    var opt = document.createElement('option');
                    opt.value = keys;
                    opt.innerHTML = keys;
                    st.appendChild(opt);
                }
                fez = true;
            }
        }

    }
})

var campos_categorizados = $('#campos_categoriazado');
campos_categorizados.on('change', () => {
    var campo = $(campos_categorizados).val();
    campo_to_categorizar = campo;
    var features = camada.getSource().getFeatures();
    var allValues = [];
    for (var f of features) {
        for (var keys in f.N) {
            if (campo == keys) {
                if (allValues.indexOf(f.N[keys]) == -1) {
                    allValues.push(f.N[keys]);
                }

            }
        }
    }
    var valores_categoriazado = $('#valores_categoriazado');
    $(valores_categoriazado).empty();
    for (var val of allValues) {
        $(valores_categoriazado).append(`<option value='${val}'>${val}</option>`)
    }

})
var style_aplicar_buttom_categorizado = $('#style_aplicar_buttom_categorizado');
style_aplicar_buttom_categorizado.on('click', () => {
    var attr = $(valores_categoriazado).val();
    var cor = $('#cor_layer_style_categoriazado').val();
    var contorno = $('#con_layer_style_categoriazado').val();
    var linha = $('#largura_linha_style_categoriazado').val();
    var style = newVectorStyle(cor + "3d", contorno, linha);
    var features = camada.getSource().getFeatures();
    for (var f of features) {
        for (var keys in f.N) {
            if (campo_to_categorizar == keys) {
                if (f.N[keys] == attr) {
                    f.setStyle(style);
                }

            }
        }
    }

})

var style_aplicar_buttom = $('#style_aplicar_buttom');

style_aplicar_buttom.on('click', () => {
    var layer = $('#layer_style').val();
    var cor = $('#cor_layer_style').val();
    var contorno = $('#con_layer_style').val();
    var linha = $('#largura_linha_style').val();

    var style = newVectorStyle(cor + "3d", contorno, linha);
    //console.log(cor);
    for (var i = 0; i < allVisibleLayers.layers.length; i++) {
        if (layer == allVisibleLayers.layers[i].nome) {
            var features = allVisibleLayers.layers[i].camada.getSource().getFeatures();
            for (var f of features) {
                f.setStyle(style);
            }

        }
    }
})



$(btnPosition).click(function() {
    $(btnPosition).css('border', '1px solid #51fa02');
    setTimeout(() => {
        map.once('postcompose', function(event) {

            var canvas = event.context.canvas;
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
            } else {
                canvas.toBlob(function(blob) {
                    saveAs(blob, 'map.png');
                });
            }
            $(btnPosition).css('border', 'none');
        });
        map.renderSync();
    }, 100);



});

var btnMenu = document.createElement('button');
btnMenu.appendChild(newImg('./img/menu_black.png'));
var customMenu = newCustomControl('custom_Menu', [btnMenu]);
$(btnMenu).css('display', 'none');
map.addControl(customMenu);


var fullMenu = $('#fullMenu');
fullMenu.on('dblclick', () => {
    $(fullMenu).toggle("slide");
    $(btnMenu).fadeIn();
})
$(btnMenu).on('click', () => {
    $(fullMenu).toggle("slide");
    $(btnMenu).css('display', 'none');
})




var cadastrar_buttom = $('#cadastrar_buttom');
cadastrar_buttom.on('click', () => {
    //alert('Servidor em manutenção, tente novamente mais tarde !');
    var nome_cadastro = $('#nome_cadastro').val().trim();
    var cpf_cadastro = $('#cpf_cadastro').val().trim();
    var senha_cadastro = $('#senha_cadastro').val().trim();
    var email_cadastro = $('#email_cadastro').val().trim();
    var celular_cadastro = $('#celular_cadastro').val().trim();
    var nascimento_cadastro = $('#nascimento_cadastro').val().trim();
    var cep_cadastro = $('#cep_cadastro').val().trim();
    var bairro_cadastro = $('#bairro_cadastro').val().trim();
    var rua_cadastro = $('#rua_cadastro').val().trim();
    var numero_cadastro = $('#numero_cadastro').val().trim();
    var complemento_cadastro = $('#complemento_cadastro').val().trim();
    var realize = false;
    var numIpCad = 0;
    if (nome_cadastro != "") {
        if (cpf_cadastro != "") {
            if (senha_cadastro != "") {
                if (email_cadastro != "") {
                    if (celular_cadastro != "") {
                        if (nascimento_cadastro != "") {
                            if (cep_cadastro != "") {
                                if (bairro_cadastro != "") {
                                    if (rua_cadastro != "") {
                                        if (numero_cadastro != "") {
                                            if (complemento_cadastro != "") {
                                                realize = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    numIpCad = localStorage.getItem('numIpCad');
    if (numIpCad == null) {
        numIpCad = 0;
        localStorage.setItem('numIpCad', 0);
    }
    if (realize == true) {
        if (numIpCad < 5) {
            var url = `${host}/adiconar/cidadao?nome=${nome_cadastro}&cpf=${cpf_cadastro}&senha=${senha_cadastro}&email=${email_cadastro}&celular=${celular_cadastro}&nascimento=${nascimento_cadastro}&cep=${cep_cadastro}&bairro=${bairro_cadastro}&rua=${rua_cadastro}&numero=${numero_cadastro}&complemento=&${complemento_cadastro}`;
            url = encodeURI(url);
            var abort;
            openLoader();
            var query = $.getJSON(url, (data) => {
                if (data.sucesso) {
                    alert(data.sucesso);
                    var numCads = parseInt(numIpCad) + 1;
                    localStorage.setItem('numIpCad', numCads);
                } else {
                    alert(data.erro);
                }
                closeLoader();
                clearTimeout(abort);
            })
            abort = setTimeout(() => {
                closeLoader();
                alert('abortado');
                query.abort();
            }, 10000)
        } else {
            alert('Lamento, muito cadastro ja foram registro para este endereço IP !');
        }

    } else {
        alert('Informe todas a informações necessarias !');
    }


})


var fecharCadastro = $('#fecharCadastro');
fecharCadastro.on('click', () => {
    $('#cadastroTela').css('display', 'none');
    $('#logIn').fadeIn();
})
var clickAqui = $('#clickAqui');
clickAqui.on('click', () => {
    // alert('Servidor em manutenção, tente novamente mais tarde !');
    $('#logIn').css('display', 'none');
    $('#cadastroTela').fadeIn();
})

var clickAqui_recuperar = $('#clickAqui_recuperar');
clickAqui_recuperar.on('click', () => {
    var cpf = $('#user').val();

    var r = prompt(`Informe o CPF :`, cpf);
    cpf = r;
    if (cpf != null) {
        if (cpf.trim() != "") {
            var c = confirm(`Você irá redefinir a senha do cadastro relacionado ao cpf : ${cpf} ?`);
            if (c == true) {
                alert('SQLserver está fora do ar !');
                var url = `${host}/redefinir/senha?cpf=${cpf}`;
                url = encodeURI(url);
                console.log(url);
                var abort;
                var query = $.getJSON(url, (data) => {
                    console.log(data);
                    clearTimeout(abort);
                })
                abort = setTimeout(() => {

                    query.abort();
                }, 10000)
            } else {
                alert('oi');
            }
        } else {
            alert('Este cpf não existe no banco de dados');
        }
    } else {
        alert('Este cpf não existe no banco de dados');
    }



})



var fechariInfo = $('#fechariInfo');
fechariInfo.on('click', () => {
    $('#backInfo').fadeOut();
})
$('#fechariInfoMObile').on('click', () => {
    $(fechariInfo).click();
})
var btnHelp = $('#btnHelp');
btnHelp.on('click', () => {
    $('#backInfo').fadeIn();
    $('#Resp_div').css('display', 'none');
    $('#fechariResp').css('display', 'none');
})

var btn_add_file_info = $('#btn_add_file_info');
btn_add_file_info.on('click', () => {
    $('#Info_file').click();
})

var informa_div_btn = $('#informa_div_btn');
informa_div_btn.on('click', () => {
    if (numeroDeMsg < 3) {
        var assunto = $('#infoAssunto').val();

        var textarea = $('#faleConoscotext').val();

        var data = new FormData();
        var d = new Date();
        var filename = d.getTime();
        try {
            var email = cidadao.emaiCidadao;
            var fone = cidadao.telefone;
        } catch {
            var email = "null";
            var fone = "null";
        }
        var allfile = $('#Info_file')[0].files;

        $.each($('#Info_file')[0].files, function(i, file) {
            data.append('file-' + i, file);
        });
        var url;
        if (allfile.length == 0) {
            url = `/fale/conosco/semfile?email=${email}&telefone=${fone}&assunto=${assunto}&conteudo=${textarea}`;
        } else {
            url = `/fale/conosco/file?email=${email}&telefone=${fone}&assunto=${assunto}&conteudo=${textarea}&nome=${filename}`;
        }
        url = encodeURI(url);
        $.ajax({
            url: url,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function(data) {
                if (data.erro) {
                    alert(data.erro);
                } else {
                    alert(data.sucesso);
                }

            }
        });
        $('#backInfo').fadeOut();
        numeroDeMsg++;
    } else {
        alert('Limite de mensagens atingido, tente novamente mais tarde !');
    }
    $('#faleConoscotext').val(" ");
    $('#infoAssunto').val("");
})






function createLabeltoButtom(botao, label, left) {
    var js = `$(${botao}).on('mousemove',(evt)=>{
    $(${botao}).css('cursor','pointer');
    var label = $('#${label}');
    label.css('display','block');
    
    $(label).css('top',(evt.clientY-10)+"px");
    $(label).css('left',(evt.clientX-${left})+"px");

});
$(${botao}).on('mouseout',()=>{
    var label = $('#${label}');
    $(label).css('display','none');
    

});`;
    eval(js);
}
createLabeltoButtom('btnLegenda', 'LayersLabel', 160);
createLabeltoButtom('btnRaster', 'MapaBaseLabel', 110);
createLabeltoButtom('btnGrade', 'GradeLabel', 80);
createLabeltoButtom('btnVector', 'AddGeoJSONLabel', 180);
createLabeltoButtom('btnStats', 'EstatisticasLabel', 120);
createLabeltoButtom('btnBuscar', 'buscarLabel', 150);
createLabeltoButtom('btnDesenhar', 'criarLabel', 110);
createLabeltoButtom('btnBaixar', 'downloadLabel', 200);
createLabeltoButtom('btnMedir', 'medirLabel', 75);
createLabeltoButtom('btnPosition', 'exportarLabel', 175);
createLabeltoButtom('btnStyle', 'estiloLabel', 180);
createLabeltoButtom('btnToolbox', 'ferramentasLabel', 190);
createLabeltoButtom('btnEditarLayer', 'editarLabel', 150);
createLabeltoButtom('btnAuxiliar', 'auxiliar', 140);




$(btnMenu).on('mousemove', (evt) => {
    $(btnMenu).css('cursor', 'pointer');
    var label = $('#menu_btn');
    label.css('display', 'block');

    $(label).css('top', (evt.clientY - 10) + "px");
    $(label).css('left', (evt.clientX + 25) + "px");

});
$(btnMenu).on('mouseout', () => {
    var label = $('#menu_btn');
    $(label).css('display', 'none');


});

$(btnHelp).on('mousemove', (evt) => {
    $(btnHelp).css('cursor', 'pointer');
    var label = $('#ajuda_btn');
    label.css('display', 'block');

    $(label).css('top', (evt.clientY - 10) + "px");
    $(label).css('left', (evt.clientX + 25) + "px");

});
$(btnHelp).on('mouseout', () => {
    var label = $('#ajuda_btn');
    $(label).css('display', 'none');


});

$('#fundocolor').on('mousemove', (evt) => {
    $('#fundocolor').css('cursor', 'pointer');
    var label = $('#ajuda_color');
    label.css('display', 'block');

    $(label).css('top', (evt.clientY - 10) + "px");
    $(label).css('left', (evt.clientX + 65) + "px");

});
$('#fundocolor').on('mouseout', () => {
    var label = $('#ajuda_color');
    $(label).css('display', 'none');


});






var btn_fundo = $('#fundocolor');
btn_fundo.on('click', () => {
    $('#fundoColorinput').click();



})


$('#fundoColorinput').on('change', () => {
    let root = document.documentElement;
    let rootOL = document.documentElement;
    var color = $('#fundoColorinput').val();
    var x = parseFloat(prompt("Transparencia :  [0.1 - 1.0] ", "1.0"));

    var opacity = x;


    var rgbaCol = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + opacity + ')';
    root.style.setProperty('--fundo', rgbaCol);
    rootOL.style.setProperty('--fundo', rgbaCol);
})




var map_auxiliar;
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'cat_teme_coor',
    target: document.getElementById('container1'),
    undefinedHTML: 'Longitude, Latitude'
});

map.addControl(mousePositionControl);

$(btnAuxiliar).on('click', () => {

    if ($('#mapaAuxiliar').css('display') == 'none') {
        $(btnAuxiliar).css('border', '1px solid #51fa02');
        $('#mapaAuxiliar').empty();
        $('#mapaAuxiliar').fadeIn();
        map_auxiliar = new ol.Map({
            layers: [],
            target: 'mapaAuxiliar',
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [-45.96, -23.3],

                zoom: 15,
                minZoom: 10,
                maxZoom: 19

            })
        });
        var this_basemap = new ol.layer.Tile({
            visible: true,
            preload: Infinity,
            source: new ol.source.BingMaps({
                key: 'AgDol3nJb3nKPr3wQlsLqzif5uWDKPymbNTDQAkFxiHlZf7GjiL7Da5Qg4EFqIn_',
                imagerySet: "AerialWithLabels"
            })
        });

        var mapView = map.getLayerGroup();
        map_auxiliar.setLayerGroup(mapView);

        map_auxiliar.on('click', function(evt) {
            if (buscarInteracionOpened == false && desenharInteracionOpened == false && medirInteracionOpened == false) {
                $('#popup').css('display', 'none');
                getFeatureIdAuxiliar(evt.pixel);
            }
        })
        var graticule = new ol.Graticule({
            // the style to use for the lines, optional.
            strokeStyle: new ol.style.Stroke({
                color: 'rgba(255,120,0,0.9)',
                width: 2,
                lineDash: [0.5, 4]
            }),
            showLabels: true
        });

        graticule.setMap(map_auxiliar);


    } else {
        $(btnAuxiliar).css('border', 'none');
        $('#mapaAuxiliar').fadeOut();
    }

})







function getFeatureIdAuxiliar(pixel) {



    var feature = map_auxiliar.forEachFeatureAtPixel(pixel, function(feature) {

        $('#popup').empty();
        $('#popup').fadeIn();

        var f = feature.N;

        for (var keys in f) {


            if (keys != "fotoDenuncia" && keys != "fotoOcorrencia" && keys != "geometry") {
                $('#popup').append(` <h2 class="cat_teme">${keys} : </h2>
                        <input type="text" class="input" disabled value="${f[keys]}">`);
            } else if (keys == "fotoDenuncia" || keys == "fotoOcorrencia") {
                $('#popup').append(`<h2 class="cat_teme">${keys} : </h2><div id="marker">
                <img src="data:image/png;base64, ${f[keys]}" id="fotoAtual">
            </div>`)



                //   var marker = new ol.Overlay({
                //     position: [f.lng,f.lat],
                //     positioning: 'center-center',
                //     element: document.getElementById('marker'),
                //     stopEvent: false
                //   });
                //   map.addOverlay(marker);
            }

        }

    });

}

$('#fechariMetaFoto').on('click', () => {
    $('#mapa_meta_ortofoto').fadeOut();
})


$('#fechariInfoMObile').on('dblclick', () => {
    $('#fechariInfoMObile').fadeOut();
})
$('#Resp_div').on('dblclick', () => {
    $('#Resp_div').fadeOut();
})


$('#fechariInfoResp').on('click', () => {
    $('#Resp_div').fadeOut();
})






$('#container2').on('click', () => {
    var view = new ol.View({
        projection: 'EPSG:4326',
        center: [-46.05, -23.3],

        zoom: 11,
        minZoom: 4,
        maxZoom: 19

    })
    map.setView(view);
})





$('#user').on('keypress', (event) => {
    if (event.keyCode == 13) {
        $(exec_LogIn).click();
    }
})
$('#senha').on('keypress', (event) => {
    if (event.keyCode == 13) {
        $(exec_LogIn).click();
    }
})


$('#container2').click();
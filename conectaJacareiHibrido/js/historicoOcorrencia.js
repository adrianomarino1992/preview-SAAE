var ul_corpo = $('#ul_corpo');
var Ocorrencias = [0];

var protocolos = [0];

var img_voltar = $('#img_voltar');
img_voltar.on('click', () => {
    window.location = "ocorrencia.html";
})

function OcorrenciasToJson(json) {
    var obj = jQuery.parseJSON(json);

    $.each(obj, (i, item) => {
        if (jQuery.inArray(obj[i].protocolo, protocolos) == -1) {
            if (obj[i].situacaoOcorrencia == "RECEBIDO") {
                addOcorrencia(obj[i].protocolo, obj[i].categoria, obj[i].subcategoria, obj[i].situacaoOcorrencia, "#ffca64");
                protocolos.push(obj[i].protocolo);
            } else if (obj[i].situacaoOcorrencia == "VISUALIZADO") {
                addOcorrencia(obj[i].protocolo, obj[i].categoria, obj[i].subcategoria, obj[i].situacaoOcorrencia, "#c66a00");
                protocolos.push(obj[i].protocolo);
            } else if(obj[i].situacaoOcorrencia == "RESOLVIDO"){
                
                addOcorrencia(obj[i].protocolo, obj[i].categoria, obj[i].subcategoria, obj[i].situacaoOcorrencia, "#e1e2e1");
                protocolos.push(obj[i].protocolo);
            }
        }
    })


}




var wasStarted = 0;
$(document).ready(() => {

    if (wasStarted % 2 == 0) {       

        window.location = "triggerCarregarOcorrencias?";
        
        wasStarted++;
    }

})





function addOcorrencia(protocolo, categoria, subcategoria, situacao,cor) {
    if (jQuery.inArray(protocolo, Ocorrencias) == -1) {

        ul_corpo.append("<li onclick='ocorrenciaSelecionada(event)'><h2 style='color:black;background-color:"+cor+";'>Protocolo: " + protocolo + "</h2><h3>Categoria: " + categoria + "<br>Subcategoria: " + subcategoria + "<br>Status: " + situacao + "</h3></li>");
        Ocorrencias.push(protocolo);
    }
}

function limpaLista() {
    Ocorrencias = [0];
    ul_corpo.empty();
}

function ocorrenciaSelecionada(event) {
    const clickedElement = $(event.target);
    var protocolo = $($($(clickedElement).parent()).find('h2')).text();

    
    window.location = "triggerOpenViewOcorrencia?protocolo:" + protocolo + ";fim";  



}






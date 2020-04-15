// VIEW
var view = new ol.View({
    projection: 'EPSG:3857', // REFERENCE SYSTEM: SPHERICAL MERCATOR - UNIT METRIC AND DATUM WGS84
    center: [-5117762.53253, -2667844.79835], // VIEW CENTER => [X, Y]
    zoom: 11, // INITIAL ZOOM
    extent: [-5142639.01572, -2687818.25181, -5092886.04933, -2647871.34490], // VIEW EXTENT [MINX, MINY, MAXX, MAXY]
    maxZoom: 17, // ZOOM IN
    minZoom: 4 // ZOOM OUT
});

// FUNCTION TO CREATE IMG FOR BUTTONS
function newImg(src) { // PARAMETER IMG SOURCE
    let img = document.createElement('img');
    img.src = src;
    img.style.backgroundRepeat = 'no-repeat';
    img.style.backgroundPosition = 'center center';
    img.style.width = '25.08px';
    img.style.height = '25.08px';
    return img;
};

// CONTROL - FULLSCREEN 
var olFullscreen = new ol.control.FullScreen({
    label: newImg('./img/fullscreen.png'), // IMG BUTTON OFF
    labelActive: newImg('./img/fechar.png'), // IMG BUTTON ON
    tipLabel: 'Tela Cheia' // TIP
});

// CONTROL - ROTATE 
var olRotate = new ol.control.Rotate({
    label: newImg('./img/acima.png'), // IMG BUTTON
    autoHide: false, // AUTO HIDE OFF
    tipLabel: 'Rotacionar' // TIP
});

// CONTROL - SCALE 
var olScale = new ol.control.ScaleLine();

// CONTROL - EXTENT
var olExtent = new ol.control.ZoomToExtent({
    label: newImg('./img/extensao.png'), // IMG BUTTON
    tipLabel: 'Zoom para extensão', // TIP
    extent: [-5142639.01572, -2687818.25181, -5092886.04933, -2647871.34490] // EXTENT
});

// FUNCTION TO CREATE CUSTOM CONTROLS
// function newCustomControl(classe, elements) { // PARAMETERS CLASS NAME AND ARRAY OF ELEMENTS
//     let newElement = document.createElement('div'); // CREATES A NEW DIV ELEMENT
//     newElement.className = `${classe} ol-unselectable ol-control`; // DEFINE THE ELEMENT CLASS

//     for (let i = 0; i < elements.length; i++) { // FOR EACH ELEMENT INTO THE ARRAY
//         newElement.appendChild(elements[i]);
//     }

//     var newControl = new ol.control.Control({
//         element: newElement // CONTROL ELEMENT
//     });

//     return newControl; // RETURNS THE CUSTOM CONTROL
// }

// POPUP
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

// FUNCTION TO CLOSE POPUP
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

// MAP
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
    ],
    controls: ol.control.defaults({ rotate: false }).extend([
        olFullscreen,
        olRotate,
        olScale,
        olExtent
    ]),
    overlays: [overlay]
});

// FUNCTION TO SET MAP TARGET == INIT MAP
var initMap = () => {
    map.setTarget('map');
};

// FUNCTION TO CREATE A VECTOR STYLE
function newVectorStyle(fill, stroke, width) {
    let style = new ol.style.Style({ // NEW ol.style.Style
        fill: new ol.style.Fill({ // TO POLYGONS AND LINES
            color: fill
        }),
        stroke: new ol.style.Stroke({ // TO POLYGONS AND LINES
            width: width,
            color: stroke
        }),
        image: new ol.style.Circle({
            fill: new ol.style.Fill({ // TO POINTS
                color: fill
            }),
            stroke: new ol.style.Stroke({ // TO POINTS
                width: width,
                color: stroke
            }),
            radius: 7 // TO POINTS
        })
    });
    return style; // RETURNS THE VECTOR STYLE
};

// FUNCTION TO CREATE VECTOR LAYER
function newVectorLayer(title, style, zIndex, visible, url) {
    let vector_layer = new ol.layer.Vector({ // NEW ol.layer.Vector
        title: title,
        source: new ol.source.Vector({
            url: url,
            format: new ol.format.GeoJSON()
        }),
        style: style,
        zIndex: zIndex,
        visible: visible
    });
    return vector_layer; // RETURNS THE VECTOR LAYER
};

// FUNCTION TO CREATE VECTOR LAYER
function newPoint(style, longitude, latitude) {
    let x = longitude * 20037508.34 / 180;
    let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
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
            'properties': {},
            'geometry': {
                'type': 'Point',
                'coordinates': [x, y]
            }
        }]
    };

    let vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
    });

    let vector_layer = new ol.layer.Vector({
        source: vectorSource,
        style: style
    });

    return vector_layer;
};
var src;
// CREATE A NEW POINT 
var ponto_estilo = newVectorStyle('rgba(255, 153, 51, 0.3)', 'rgb(255, 153, 51)', 2);
function AddPoint(lat,lng,foto) {

var ponto = newPoint(ponto_estilo, lat,lng);
    map.addLayer(ponto);
    var coordinate = ponto.getSource().getFeatures();
    coordinate = coordinate[0].getGeometry().getCoordinates();
    src = foto;
    content.innerHTML = `<img src="${src}" height="170" width="170" alt="Foto" title="Foto">`;
    overlay.setPosition(coordinate);
    }

// INITIATL POPUP


// FUNCTION TO SHOW POPUP
function getFeatureId(pixel) {
    let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });

    if (feature !== undefined && feature.getGeometry().getType() === 'Point') {
        var coordinate = feature.getGeometry().getCoordinates();
        content.innerHTML = `<img src="${src}" height="170" width="170" alt="Foto" title="Foto">`;
        overlay.setPosition(coordinate);
    }
};

// ON click EVENT - MAP
map.on('click', function (evt) {
    getFeatureId(evt.pixel);
});
// ROOT
var web_window = $(window); // WINDOW 
var web_page = $('html, body'); // HTML AND BODY

var logo = $('#logo');

logo.on('click', () => {
    window.location = "triggerOpenSite?";
});

// LOADER
var div_loader = $('#loader');

// LOADER INTERACTION == NEED SPECIFIC IMPLEMENTATION
var loaderToggle = () => {
    if (web_page.css("overflow") === "hidden") {
        web_page.css({ "overflow": "initial" });
    }
    else {
        web_page.css({ "overflow": "hidden" });
    }

    div_loader.fadeToggle();
    div_loader.css({ "display": "flex" });
};

// TOAST MESSAGE
var divToast = $('#toast');
var divTxtToast = $('#toast_text');

// TOAST MESSAGE INTERACTION == NEED SPECIFIC IMPLEMENTATION
var toastToggle = (message, time) => {
    divTxtToast.empty();
    divTxtToast.append(message);

    divToast.fadeIn();

    setTimeout(() => {
        divToast.fadeOut();
    }, time);
};

var loaderOpened = 0;
function OpenLoader() {
    if (loaderOpened % 2 == 0) {
        OpenloaderToggle();
        
    }
    loaderOpened++;
}

var OpenloaderToggle = () => {
    

    div_loader.fadeIn();
    div_loader.css({ "display": "flex" });
};
var CloseloaderToggle = () => {
    

    div_loader.fadeOut();
    
};


// ALERT DIALOG
var divAlert = $('#alert');
var divAlertBackground = $('#alert_background');
var divTxtAlert = $('#alert_text');
var divBtnAlert = $('#alert_buttons');

// FUNÇÃO PARA MOSTRAR O ALERT DIALOG QUE É IMPLEMENTADO NOS ARQUIVOS JS DE CADA PÁGINA
var alertShow = (title, content, btnOk, btnYes, btnNo) => {
    web_page.css({ "overflow": "hidden" });

    divAlertBackground.height('auto');
    divTxtAlert.empty();
    divBtnAlert.empty();

    divTxtAlert.append(title + content);
    if (btnOk != null) divBtnAlert.append(btnOk); else divBtnAlert.append(btnYes + btnNo);

    divAlert.fadeToggle();
    divAlert.css({ "display": "flex" });
};

// FUNÇÃO PARA ESCONDER O ALERT DIALOG QUE É IMPLMENTADO NOS ARQUIVOS JS DE CADA PÁGINA
var alertHide = () => {
    web_page.css({ "overflow": "initial" });
    
    divAlert.fadeToggle();
};

// FLOAT BUTTON
var btn_float = $('#float');

// ON SCROLL FUNCTION
var floatOnScroll = () => {
    if (web_window.scrollTop() == 0) {
        btn_float.find('img').attr({
            'src': 'img/down.png',
            'title': 'Mover para o último',
            'alt': 'Mover para o último'
        });
    }
    else {
        btn_float.find('img').attr({
            'src': 'img/up.png',
            'title': 'Mover para o primeiro',
            'alt': 'Mover para o primeiro'
        });
    }
};

// FLOAT BUTTON SCROLL EVENT
web_window.on('scroll', () => { floatOnScroll(); });

// ON CLICK FUNCTION
var floatOnClick = () => {
    if (web_window.scrollTop() == 0) {
        web_page.animate({ scrollTop: document.body.offsetHeight }, "slow");
    }
    else {
        web_page.animate({ scrollTop: 0 }, "slow");
    }
};

// FLOAT BUTTON CLICK EVENT
btn_float.on('click', () => { floatOnClick(); });
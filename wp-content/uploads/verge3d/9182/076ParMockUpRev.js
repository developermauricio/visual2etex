'use strict';

/* __V3D_TEMPLATE__ - template-based file; delete this line to prevent this file from being updated */

window.addEventListener('load', function() {

var CONTAINER_ID = 'v3d-container';

(function() {

    var params = v3d.AppUtils.getPageParams();

    var PUZZLES_DIR = '/puzzles/';
    var logicURL = params.logic ? params.logic : '__LOGIC__visual_logic.js'.replace('__LOGIC__', '');
    var sceneURL = params.load ? params.load : '__URL__076ParMockUpRev.gltf'.replace('__URL__', '');
    if (!sceneURL) {
        console.log('No scene URL specified');
        return;
    }

    // some puzzles can benefit from cache
    v3d.Cache.enabled = true;

    if (v3d.AppUtils.isXML(logicURL)) {
        var logicURLJS = logicURL.match(/(.*)\.xml$/)[1] + '.js';
        new v3d.PuzzlesLoader().loadEditorWithLogic(PUZZLES_DIR, logicURLJS,
            function() {
                var initOptions = v3d.PL ? v3d.PL.execInitPuzzles({
                        container: CONTAINER_ID }).initOptions
                        : { useFullscreen: true };
                var appInstance = loadScene(sceneURL, initOptions);
                v3d.PE.viewportUseAppInstance(appInstance);
            }
        );
    } else if (v3d.AppUtils.isJS(logicURL)) {
        new v3d.PuzzlesLoader().loadLogic(logicURL, function() {
            var initOptions = v3d.PL ? v3d.PL.execInitPuzzles({
                    container: CONTAINER_ID }).initOptions
                    : { useFullscreen: true };
            loadScene(sceneURL, initOptions);
        });
    } else {
        loadScene(sceneURL, { useFullscreen: true });
    }
})();

function loadScene(sceneURL, initOptions) {

    initOptions = initOptions || {};

    var ctxSettings = {};
    if (initOptions.useBkgTransp) ctxSettings.alpha = true;
    if (initOptions.preserveDrawBuf) ctxSettings.preserveDrawingBuffer = true;

    var preloader = initOptions.useCustomPreloader
            ? createCustomPreloader(initOptions.preloaderProgressCb,
            initOptions.preloaderEndCb)
            : new v3d.SimplePreloader({ container: CONTAINER_ID });

    if (v3d.PE) {
        puzzlesEditorPreparePreloader(preloader);
    }

    var app = new v3d.App(CONTAINER_ID, ctxSettings, preloader);
    if (initOptions.useBkgTransp) {
        app.clearBkgOnLoad = true;
        app.renderer.setClearColor(0x000000, 0);
    }

    // namespace for communicating with code generated by Puzzles
    app.ExternalInterface = {};
    prepareExternalInterface(app);

    if (initOptions.preloaderStartCb) initOptions.preloaderStartCb();
    if (initOptions.useFullscreen) {
        initFullScreen();
    } else {
        var fsButton = document.getElementById('fullscreen_button');
        if (fsButton) fsButton.style.display = 'none';
    }

    sceneURL = initOptions.useCompAssets ? sceneURL + '.xz' : sceneURL;
    app.loadScene(sceneURL, function() {
        app.enableControls();
        app.run();

        if (v3d.PE) v3d.PE.updateAppInstance(app);
        if (v3d.PL) v3d.PL.init(app, initOptions);

        runCode(app);
    }, null, function() {
        console.log('Can\'t load the scene ' + sceneURL);
    });

    return app;
}

function createCustomPreloader(updateCb, finishCb) {
    function CustomPreloader() {
        v3d.Preloader.call(this);
    }

    CustomPreloader.prototype = Object.assign(Object.create(v3d.Preloader.prototype), {
        onUpdate: function(percentage) {
            v3d.Preloader.prototype.onUpdate.call(this, percentage);
            if (updateCb) updateCb(percentage);
        },
        onFinish: function() {
            v3d.Preloader.prototype.onFinish.call(this);
            if (finishCb) finishCb();
        }
    });

    return new CustomPreloader();
}

/**
 * Modify the app's preloader to track the loading process in the Puzzles Editor.
 */
function puzzlesEditorPreparePreloader(preloader) {
    // backward compatibility for loading new projects within the old Puzzles Editor
    if (v3d.PE.loadingUpdateCb !== undefined && v3d.PE.loadingFinishCb !== undefined) {
        var _onUpdate = preloader.onUpdate.bind(preloader);
        preloader.onUpdate = function(percentage) {
            _onUpdate(percentage);
            v3d.PE.loadingUpdateCb(percentage);
        }

        var _onFinish = preloader.onFinish.bind(preloader);
        preloader.onFinish = function() {
            _onFinish();
            v3d.PE.loadingFinishCb();
        }
    }
}

function initFullScreen() {

    var fsButton = document.getElementById('fullscreen_button');
    if (!fsButton) return;

    var container = document.getElementById(CONTAINER_ID);

    if (document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled)
        fsButton.style.display = 'inline';

    fsButton.addEventListener('click', function(event) {
        event.stopPropagation();
        if (document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement) {
            exitFullscreen();
        } else
            requestFullscreen(container);
    });

    function changeFullscreen() {
        if (document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement) {
            fsButton.classList.remove('fullscreen-open');
            fsButton.classList.add('fullscreen-close');
        } else {
            fsButton.classList.remove('fullscreen-close');
            fsButton.classList.add('fullscreen-open');
        }
    }

    document.addEventListener('webkitfullscreenchange', changeFullscreen);
    document.addEventListener('mozfullscreenchange', changeFullscreen);
    document.addEventListener('msfullscreenchange', changeFullscreen);
    document.addEventListener('fullscreenchange', changeFullscreen);

    function requestFullscreen(elem) {
        if (elem.requestFullscreen)
            elem.requestFullscreen();
        else if (elem.mozRequestFullScreen)
            elem.mozRequestFullScreen();
        else if (elem.webkitRequestFullscreen)
            elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen)
            elem.msRequestFullscreen();
    }

    function exitFullscreen() {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.msExitFullscreen)
            document.msExitFullscreen();
    }
}

function prepareExternalInterface(app) {
    // register functions in the app.ExternalInterface to call them from Puzzles, e.g:
    // app.ExternalInterface.myJSFunction = function() {
    //     console.log('Hello, World!');
    // }

}

function runCode(app) {
    /***  Element: anotation  ***/
    const annotationPlaca = $("#placa");
    const annotationFibra = $("#fibra");
    const annotationMasillaPasta = $("#pasta");
    const annotationJuntasInvisibles = $("#juntas");

    /***  Element: content info  ***/
    const contentPopup = document.getElementById("mainContent"); 

    /***  Element: close content info  ***/
    const closePopup = document.getElementById("closePopup");

    /***  Element: dimanicos  ***/
    const titlePopup = document.getElementById("title");
    const linkInfoPDF = document.getElementById("linkInfoPDF");
    const imgPopup = document.getElementById("imgPopup");
    const textDescription = document.getElementById("textDescription");
    const linkMoreInfo = document.getElementById("moreInfo");

    
    /***  Info  ***/
    const urlBase = 'https://visual2etex.com';

    /***  placa  ***/
    const titlePlaca = 'Superboard Paredes Interiores';
    const urlPlacaPDF = '/wp-content/uploads/2021/10/FT-PAREDES-INTERIORES.pdf';
    const imgPlaca = '/wp-content/uploads/2021/10/paredes-interiores.png';
    const textPlaca = `Placa de cemento resistente a la humedad y el impacto para la elaboración de paredes interiores con más rapidez constructiva, poco peso y mucha limpieza en la obra.`;

    /***  Fibra de vidrio  ***/
    const titleFibra = 'Lana de fibra de Vidrio';
    const urlFibraPDF = '/wp-content/uploads/2021/08/FT-LANA-FIBRA-DE-VIDRIO.pdf';
    const imgFibra = '/wp-content/uploads/2021/08/fibra_vidrio.png';
    const textFibra = `Aislamiento térmico y acústico utilizado en las edificaciones, especialmente para ser instalado entre la perfilería de muros de los sistemas constructivos en
    seco (Dry Wall) en áreas residenciales, comerciales e industriales.`;

    /***  Masilla en Pasta  ***/
    const titleMasillaPasta = 'Masilla en Pasta';
    const urlMasillaPastaPDF = '/wp-content/uploads/2021/10/FT-Gyplac-Masilla-en-Pasta-.pdf';
    const imgMasillaPasta = '/wp-content/uploads/2021/10/masilla-pasta.png';
    const textMasillaPasta = `Masilla lista para usar, creada y formulada para realizar uniones de placas de yeso, ideal para terminaciones en muros, cielos rasos y revestimientos.`;

    /***  Masilla juntas invisibles  ***/
    const titleMasillaFlexible = 'Masilla Flexible JUNTAS INVISIBLES Exterior e interior';
    const urlMasillaFlexiblePDF = '/wp-content/uploads/2021/11/FT-Superboard-A-Juntas-Invisibles.pdf';
    const imgMasillaFlexible = '/wp-content/uploads/2021/11/juntas-invisibles.jpg';
    const textMasillaFlexible = `Masilla flexible de consistencia cremosa lista para usar, ideal para el tratamiento de juntas invisibles, continuas o perdidas en aplicaciones interiores y exteriores de sistemas de Construcción en Seco con placas planas de cemento Superboard ®. Es componente del Sistema de Tratamiento de Juntas Superboard ®.`;


    /***  Funtions  ***/       
    const openMuroPopup = (title, linkPDF, img, text) => { 
        titlePopup.textContent = title;
        linkInfoPDF.href = urlBase + linkPDF;
        imgPopup.src = urlBase + img;
        linkMoreInfo.href = urlBase + linkPDF;
        textDescription.innerHTML = text;

        linkMoreInfo.onclick = () => { saveActionClick(title, linkPDF) };  
        linkInfoPDF.onclick = () => { saveActionClick(title, linkPDF) };

        contentPopup.style.display = "flex"; 
    }	
    const closeMuroPopup = () => {	
        contentPopup.style.display = "none";  
    }


    /***  Events clicks  ***/	
    annotationPlaca.on("click", () => { openMuroPopup(titlePlaca, urlPlacaPDF, imgPlaca, textPlaca) });	
    annotationFibra.on("click", () => { openMuroPopup(titleFibra, urlFibraPDF, imgFibra, textFibra) });	
    annotationMasillaPasta.on("click", () => { openMuroPopup(titleMasillaPasta, urlMasillaPastaPDF, imgMasillaPasta, textMasillaPasta) });
    annotationJuntasInvisibles.on("click", () => { openMuroPopup(titleMasillaFlexible, urlMasillaFlexiblePDF, imgMasillaFlexible, textMasillaFlexible) });	

    closePopup.addEventListener("click", closeMuroPopup, false);

    const nameWall = 'Sistema 076 Par';
    const urlApi = "https://backend.visual2etex.com/api/register-file-model";
    const urlFrontend = urlBase + '/wp-json/wp/v2/current-user';

    const saveActionClick = (title, urlFile) => {
        let email = '';

        $.ajax({
            url: urlFrontend,
            type: "GET",
            success: function (response) {          
                email = response.user_email;         
                if ( email ) sendInfo({ email, nameWall, title, urlFile });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error... ',textStatus, errorThrown);
            }
        });
    }
 
    const sendInfo = ( data ) => {        
        $.ajax({
            url: urlApi,
            type: "POST",
            data: data,
            success: function (response) {
                console.log('Register... ', response);     
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error... ',textStatus, errorThrown);
            }
        });         
    }

}

});

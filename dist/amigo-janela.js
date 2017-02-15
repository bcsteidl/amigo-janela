/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {

    // Mostra a lista dos registros já consultados
    $(jan).children(".area_menus").children("#_btn_modo_criar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_modo_consultar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_consultar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_listar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_salvar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_apagar").attr("disabled", "true");

    // Executa comandos informados no parâmetro ao mostrar a lista de registros consultados
    opcoes.aolistar(jan);

    // Aumenta a área que lista os registros e some com a área de dados
    $($(jan).children(".area_lista")).animate({
        height: "100%"
    }, 500);
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const montaJanela = __webpack_require__(27)
const preparaOpcoes = __webpack_require__(28)
const botoesControle = __webpack_require__(23)
const execControles = __webpack_require__(26)
const aoabrir = __webpack_require__(16)

$.fn.json = __webpack_require__(30)
$.fn.consultar = __webpack_require__(25)
$.fn.salvar = __webpack_require__(29)
$.fn.apagar = __webpack_require__(22)

$.fn.parametros = function() {
    return opcoes;
}

// Obtem o posicionamento do mouse no momento do clique
var mouseX = 0;
var mouseY = 0;
$("html").mousedown(function(mouse) {
    mouseX = mouse.pageX;
    mouseY = mouse.pageY;
});

module.exports = function(parametros) {
    // Definindo valores padrões
    var opcoes = preparaOpcoes(parametros);

    // Define ID da janela
    var contaJanelas = localStorage.getItem("contaJanelas") + 1;
    localStorage.setItem("contaJanelas", contaJanelas)
    var idJanela = opcoes.janela + "_" + contaJanelas;

    // Cria as áreas e botões de controle da janela
    var jan = montaJanela(idJanela, opcoes);

    // Carrega o corpo da janela ou cria área de dados limpa
    if (opcoes.html != "")
        $("<section class='area_dados'/>").html(opcoes.html).appendTo(jan);
    else if (opcoes.janela != "")
        $("<section class='area_dados'/>").load(opcoes.htmlJanela).appendTo(jan);
    else
        $("<section class='area_dados'/>").appendTo(jan);

    // $(jan).css("padding", "2px").css("border", "1px solid #000000").css("border-radius", "4px")
    //     .css("background-color", "#DDEAF4");

    $(jan).css("padding", "2px").css("border", "1px solid #000000")
        .css("background-color", "#DDEAF4");

    $(jan).addClass("ui-corner-all")

    // Corrige altura da barra de rolagem vertical ou reduz a altura da janela se for para esconder os controles
    if (opcoes.controles) {
        $(jan).css("padding-bottom", "25px");
    } else {
        opcoes.altura = opcoes.altura - 22;
    }

    // Abre a janela Dialog
    $(jan).dialog({
        autoOpen: true,
        width: opcoes.largura,
        height: opcoes.altura,
        closeOnEscape: false,
        minWidth: opcoes.minLargura,
        minHeight: opcoes.minAltura,
        closeText: "Fechar a janela",
        resizable: opcoes.redimensiona,
        draggable: opcoes.move,
        modal: opcoes.desabilita,
        open: function(event, ui) {
            // Cria botões de controle da janela
            botoesControle(this, opcoes);

            // Execução dos botões de controle
            execControles(this, opcoes);

            // Posiciona a janela na área de trabalho com efeito animado
            opcoes.horizontal = (opcoes.horizontal == "center" ? ($(window).width() - opcoes.largura) / 2 : opcoes.horizontal);
            opcoes.vertical = (opcoes.vertical == "center" ? ($(window).height() - opcoes.altura - 6) / 2 : opcoes.vertical);
            $(this).parent().css("left", mouseX);
            $(this).parent().css("top", mouseY);
            $(this).parent().css("width", 0);
            $(this).parent().css("height", 0);
            $(this).parent().animate({
                left: opcoes.horizontal,
                top: opcoes.vertical,
                width: opcoes.largura,
                height: opcoes.altura - 6
            }, 500);

            // Executa comandos informados no parâmetro ao iniciar a janela
            setTimeout(function() {
                opcoes.aoiniciar(jan);
            }, 100);

            // Executa comandos informados no parâmetro ao abrir a janela
            setTimeout(function() {
                aoabrir(jan, opcoes);
            }, 200);
        }
    });
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(5)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./janela.css", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./janela.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".area_menus {\n    margin: -1px;\n    position: relative;\n    width: 100%;\n    background-size: 100% 30px;\n    height: 22px;\n    background-color: #D6D6D6;\n    border: 1px solid #aaaaaa;\n    z-index: 1;\n    overflow: hidden;\n}\n\n.area_dados {\n    position: relative;\n    height: 100%;\n\tbackground-color: #CCDDDD;\n    overflow: auto;\n}\n\n.btn_controle {\n    position: absolute;\n    margin-top: -2px;\n    margin-right: 3px;\n    width: 25px;\n    height: 20px;\n}\n\n.btn {\n    position: relative;\n    width: 28px;\n    height: 22px;\n    margin: auto;\n}\n\n.btn img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.ui-dialog .ui-dialog-titlebar {\n    font-family: arial, \"Times New Roman\", \"Courier New\", sans-serif;\n    color: #FFFFFF;\n    background-image: url(" + __webpack_require__(10) + ");\n    background-size: 100% 100%;\n}\n\n#_btn_minimizar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(13) + ");\n    width: 16px;\n    height: 16px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_maximizar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(12) + ");\n    width: 16px;\n    height: 16px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_fechar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(9) + ");\n    width: 16px;\n    height: 16px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_modo_criar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(8) + ");\n    width: 15px;\n    height: 15px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_modo_consultar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(14) + ");\n    width: 15px;\n    height: 15px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_consultar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(7) + ");\n    width: 15px;\n    height: 15px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_listar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(11) + ");\n    width: 15px;\n    height: 15px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_salvar {\n    margin-left: 20px;\n}\n\n#_btn_salvar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(15) + ");\n    width: 16px;\n    height: 15px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n#_btn_apagar div {\n    position: relative;\n    background-image: url(" + __webpack_require__(6) + ");\n    width: 16px;\n    height: 15px;\n    background-repeat: no-repeat;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.btnform {\n    position: relative;\n    width: 30px;\n    height: 22px;\n    margin-right: auto;\n}\n\n.btnform img {\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {\n    border-bottom-right-radius: 10px;\n}\n\n.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {\n    border-bottom-left-radius: 10px;\n}\n\n.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {\n    border-top-right-radius: 10px;\n}\n\n.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {\n    border-top-left-radius: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1goOFSsTSv/nLAAAAwRJREFUKM9dkz1sG3Uchp//+e5sn8/nc+x8NLVT1ES0FS0fEkWNBAgIAwJVFQNCSstUISohhIQQYkGwIRY2FjY2hMTAQIcMDBWChkqkQSTFTXEUHCdxTO7Oju9sn2P/GECo6rM/r57lVSJyFvABAfaBBDAO2ECvXqudbO1uXk0Z2utm2v4lOzWzlHXcHzVNuwnMKREpKKUOuA8RMYDHWq3W1e3ffn7TiQPNzbrKbzalbVoUz5z/cqo08zmgKRE5pZSq3CfT78eLvud9XFteeuh4UjfdVBKtN0KLI4LWAZtDidOnzlfmHn/yq/8HRMSKou65fr/3Qm399486lZX0w26abL+NeC2G/Q5HnQ5a2GEQeNxqR+Quv4sOxCIyORqNrvjN/fd2764fS2zeUacHDfS1P4j3thjFhwzDPoaK6faOMDLHOdHvU2/soAPFMIze9jzv0k5923Ul5sTK91BdRbUDPG2IMQDdhtAokiudJrVVxevFaAr0ZvPvTxqNxssgjE9O0UDhP7vIjG7ibtyiELbAzRDaE0wUptBWlyGKEWeMhGmiVlZui55I4OZd6vU6iKCUQkWH2JVlchs3yWqQ3quh31mFAey7ee49cgFr8X30wA96hpFIHR0NSCVT6IaOArBtpHiRbmGSsW8+I1GrMhJFc3aCPy+8ivPcZY7Nnrmu60biisDXvu/rlmVRzI6TTCYREVpBQNwN0fe38VMZNuefYrTwBqVzz6/lx/LfZbPZG3rSNFMCKpVMEnW7HB4eYlkWcT9GAFE6G1aB3flXKC68xvjJszcKhcI7pmncBZ7QDzwvjKIoLpVKaTuT+Tcf0BIapmGwchDivHSN2RcvtQqT029ZlnXbNI17SqmhiKDbdm4nl8sv+X6wICL22FgegCAIqFQqzD29EJbL5XXHcT60rPQPPIASEQcYbG399UG1WnXb7dYon89f6/X61vT09KhcLn+RyzmfAntKKXngM/NKRB4FOkAGUEBxbW39W8dxqq7rXs9m7Z+AX4Hhf94QCAANeOYf23pa3OYs/A4AAAAASUVORK5CYII="

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wMcFCICzBM4YAAAAl9JREFUOMtjYMAB8jqW8coaeAmoGDgJRMSkCOw/fIwZl1oWdIHqhettrl19k//s7X8PLX1zZoafb8+JSwmtYmBgmM/AwPAZmyGMyJyaOZuLfjCw9zx+/OLRm2fvJ1iZaG5uTne7y0AsSO6Z7TJx2/U/SQ1rH+v45KoxkABYGBgYGBatP8Tz5AfXzNf3XjI/vnHR5cqWybdINuTo+UfmfOqmSg/uX9m4e0XTTVyKHeObWQREFZcIi4t8l5IySGmKlvjLwMDAwMTAwMBw9+Fzwy+fWRhu3XuwDZcBGt6lbNIqxvO/CDiFn7innHDi3M3pLcvOsMJd8vHrb4bv3zkY/jGwYjVA28aZVUtbaSajkEHM+2diDOIyPxg4/7xLffzg4b+IvOZsFgYGBgYhfh6Gtz9+MYjLKLteZmCYhW6Ir6u14ztGJoUzN14/+f+XQcbXnp/hz2f+Rz8+/1EX4Xhlw8DAwMDgkTFLy7z69H/Xoj2/fJLnyGJzzba7//nMcs4/sSy+/n/fxZ//p83eGgqTY2JgYGDYMSPt2t/Pz3f+ZJVj/calcjBn+gElZAPq5p/in7/4xI4P35ikXa24GT79efJJzVjmHEZia1153XjTkRc7PrCJi3D9e/Tj3fOP7cxcfz7x8MpIf33H5M/OxKFqaSnCEGov/OXp/cvJyV7Wq7Cm2II5t02u3/6w695zHsEfbHIMzL//MDCxMzKICDEweJoyMGhLvfny+OZ1v+IE7/04kz0DAwPD9lM/pHYevZxw5tVP13d3fzDIyrMwaKhxMEjz/Dkoy/93UaSX/T0GWgAA51bo1qDACAAAAAAASUVORK5CYII="

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB90FBw4oCG5bGQoAAAB4SURBVCjP7dOxDcQgDIXhn4gG1vEGDMIatKzACszABtTMQkebVEFKEV043XV5lW3pk91YicjOw8QYZ62NMYQQPqKc86XXANZanHO3qLU2N55bNYtZht57AFJK9N6fQREBoNY6Zxtf5oX/gBpgjEEpZQmqle/4yakHHicdhrxNGXkAAAAASUVORK5CYII="

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAAABmJLR0QAvQC9AL1pQtWoAAAAPklEQVR42mNgoBP4//9/QUEBCbIQIax6cEphlcBjEBZpAqrRFBGlGk0PUapJ1kCak0jzNGnBSnLEkZw0aAgAi2p4323PXkkAAABMelRYdFNvZnR3YXJlAAB42nPQUNb0zE1MT/VNTM9MzlYw0TPSM1awtNQ3MNU3MFRILsosLql0yK0sLslM1kst1kspLcjPK9FLzs8FAPRxEoFtGEkjAAAAM3pUWHRTaWduYXR1cmUAAHjaS01LMjO2TEpNNTI1MEwzsExNTjFONDBNS0syNTWwMDIGAJ2zCR1udCcgAAAAAElFTkSuQmCC"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABRQAAAAaCAYAAADG1NA/AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAIABJREFUeJztfc2yJEuO1id55DlVdft2T/eCJTu2vAIrFmOYwbuwZDHDK7DFjBXwEqwxjD0vgRnT09N03/o5mSGx8J/wiHCXIsMzb12mj8pOKSM9/U8ul8vlcgX9x//2vzSEgBACAEBEICIABMyMt7c3rEFWT8wvsEBVzfRRIKKB3LLB94MO5IUSAE5/bXh5eTFpGMfqe8K6/m1bM191czvtz/nrcomo/M3zbOa/Xq9mOnOf9kcg8GvhwYxzW1X1AP/b/Gvzt0IxwxqDaZrs6tVOH22/qq7Ga50mEH3DyPzzwJMPo+Nvzd0j9XvpNv0Fs9xg0c+Vj2rPT3/+pmI689Pjn3keWx+84fv69auRKiCOuF9+rKDdD8bEE6DrRtQ0d+XPNLB+kWJWBWhpP2+aGWIH21yqDIQAKJ9cpxmqlNaxNpjymRRECtX1b3ryogXe+uHN7zP9rvN482NMP3GABLfbDUC/D678wdT8Xe7jvfJzS89R+eet73n8t+3N/DMq3832kUBkv/7WUPPHntcYAO3kxzOgR59RiPzXh8vlYqZfr/b8s+eXJP44Rv8WHOFvS78b4l8SxOzn1+9Z7PWllb/mw6fOjzvLqemb2+i1j2CPrwdRf958V9FndP/q61/Pn/tm9Y3+15Dla92P+rPKmH6tTv+3euW2fk+/8uCe+bvnC037K9mlH4Vn6Cc1PFX/eIe/aJiJ8fLxR8y08PD03//H/0RtUJznuSj4RLQ3SNBm8VPbIPZshnYXHLN+gaitEHnlXy4jCxq79Hu2wBkD6SpMRxUCT+Frbejv2XB6G5JHGJQoTaiWwumCs6B6G5q4mVzm5L0burKp6TXP6YOnUOQ2NA2KmHG58F6mPBAshUNV8fHjRzP//kBlDVOwD1SealAkQQiE2qBw//gPGhTndp35zzP4LHkZkY/XmCg0v894aP6SgCgqht2fmBsywoXzhrndvth9u/0HplAHBKqysufRpitTos/2+9x+pinlb7fPxgDTBdb6ZSv8AlA2CCzlEmkZd2/8VclMn6YXMz0atI/lj3rRffWHcDlB1+OY2gNbwJv/eXoShVRW7Gfulz//JjPdwx79zuCaf8bp6/AfjuuPLVmeDbrP4o8W32b65PF+5vhNV2v+xfXjKP1aEPX38/x5lL+3vzvKt97viGWofYtB9Vz/R+fv6DzryZn8vS0/AdW8vpzlYzy1f3b+XHe//d76MS4/7fyilA79lnFSzXKElm708pvl19CTr/WzbrDg9cOnJ47Por/VdK7laZjG5Kc3/0bH91Hr4Dt+x1ssIFw36uX0h3/4I5i5LNwispxmMg6cENnp4wYbG8YMir6HoX+CMXJCwpWXol9/uy12+0fB6//lcuntVg/l906Ytka67Qn7mIfXIH8qQbXnfaeHTrCjwB9ogton9D/88INTwtj89DzM6nHa02iO82eAfzzwDGI/fbY82HwPz2/f/mymP9dDEcmg2B7/Ix6CgN2/IwcalkHRy188XJQiH2zwFC7N7y2vuBrM8U8ectb88cYnUN8goDqbCp0OGtK14d2ynUqc2r/1XAQAISB0DKK53bZCi+Th2h9jz8PWMig+wuABfDPTfYPCdSg/8Oakj2FmNg9kTP5VrjxQfpkGxaPlb9v7KP5xx5cE53UwBhWD5Fn+up++9xjsR3EIlsE+Q59H7fVDy22qPv/YBwaAbZAjmgsf1fPjiHw/xF88IxpIqImJ7HTNHuodzERmesjyQ3EKE2go/3zTVI6CWAGNt25UYrkXDf38QHVgKVgO1+/BOEAfTc/3Y4KRvoJ2+7Qs6G28rK9ncZe1AELa3yDpXQRKGEog1PodNf9EcoFoYBRnDCinetdYlcozka4wKNkfGvmOYi+/Uu4vR29OZYAp8SdBkPdw7f57f0pspxu0PfTnlP/+9/53/o+hybCYgf7Vv/0PunU3jxAFtXelIZ7g9+HZHnSjBsWY3lcI/Q19WvDOgDLKhl7zwr7GgS+IC25YfZ+fY/vOKrQ+HDMI5E2JTesWuFdyE9QGxTa/tuG5V14ZUdGkVV21h+Kzr2zc5rfdxql+9k54PXAN6rdj9G+OW/GwO7khPgBbD9VtedM0nZ+/ON7/s+mu/Nlcmd2W54ZEcDxkj4Ys6M1Pb37764uVv76qO7Khs2FL0/o5VItp66qUNf/PeyYusLWrbg2KuX09mz2FpX2twyub/xgyRxnY/YUp/wSg/ZX9ezzQPXjkgVKrPc8+MPUgeov0wafh2IFYq/+rK3GD+t/ogcYoD9n5E32M9aN3dbw8OyEnHnXD51lXnkfnl+pad8qQnz354d1A8davo9C7kjtGw2S8GtB/PA/lTL+eY8Jz54cP8zyb+rN3ZX484tN+77Ja3wf559gNISPV89AdJMA23MgWPL6J+4s+eO0jCqYO6l15HoUj+nnvCrxiXoXcOdOu9yvP7/D/KwgxhKZkFI8wzeGyWSBzYoqp6MUgCaMx2MZAHQ8v+8pgVpj7ZahxHQ4QCAUzvwnEi0JJ+cR7jYXWVy6IlxNRIk1XPp63qSHLE4gUNywbSsL9Al/JNyhG41NVbf5H5IyPDzxKO6WoFxJVh355ESKw40k1rJBhAnTtmVHj62ydMPjKiNc8hfuDWE71V+akAoHt+cc0Nj61vS+P0UJzwazkbuos0EGDoe9BbfO3EjcVvYzFNZY6Co3XvsaGpt583cTZ8EwfzPTZvXI9aFCkbHD3oaXQCu2VzVpeueOPcNTZ8hjkerMHR96YdwyPqoJ42L7vGxFBLIOVMni6mBuCm7n+AkTTLo7TPcYgT7+YLvb6cr3DINGi0dXZMHkb4lHwN2zH5E/LoHgkf659W87RAz8XftEGRbnrQLqmzfKtzZ9++4/JrmcZFF2DhiO/6xsOLV70DDo32DGEcfDA2oPe/BgH6Z/2NOrdp99nUHz0/Bzlobx/69KXnf3dMA+vDYp7/enZBtcxg2JL/7oHxDnV9AyKN6/9zvxTAawthG719007nh0DtBVya/k8YSZt0uXovBjlLxfeDYrv8CQgzR7IlUHx5eOvqhexxInAzHdc2bz/BPuxMGbhXzz8ehvOAzFMRj0UjR3lVRRASArglAwiKZA6CFEfe56Hom3PIEyXaBCoFdR7lNVjQXVppRDnf5EWY+PPg0GRRfaGqmxMVFWwY3Bbpkebv9wrh5VBlmja0d7bUHu8M6oQ1TJke8oPCG5OUPXR8aHptdS9bQMR4TbbMRI9g8DtzTnhdcbfS/cMijK3511RiAfd4Pzx31+rrjfzrgex0z7Pf1BXMWj32A/Kb3t4WxtxIkqbQS1GRFUtY6aq7vh6G24XOvOjGBAzH2yGgZDOQnSO7dVKtuY5CmfDQoS5GOM7hltn/YxX+nhF5yg9yadd7ogBsxf03Vk/rvPa8zZ/zlgcazAPHFYcAi9khjN/Z5HO+oVD+t9SDa3KyWM3avD05Bcz72UkUfmbBz147PZxvKZpwEp+bGhDFNwYgi79D4r30o5c99H55YEzf7yQLnO68k1IV9TTlcZ8A2cuV17bN3iEbA/pefAGSOxDwwhH982PNqQbRoYMMceIBOw5VFTjnfHqQMzxcPZgnIf2cnW1lnoH8iPjS4L8UpAefQb9FXz6OP2bHIPqEPlJIAc8pGt9YPvZe6nK8IF1NQBNY92gw4EvX/M+q1oXS5skN7KURZv55oLDX8MHYo+Q8e/wDi2gqD/XMdinGwhSDFMAE4FBUERFTXceJmsGdefjcx0U45Uf02XaKyEpn9rDSLuvNr5cXgdaT4hv2TWuxc3LC3KKcM9EJ40C74kvtfAMAp/f3nab7XsMi3zgpRZrN3OUzcL6pP8kjBq8o0Uxfs64eOCp72FR6EOIfNDCPSZE2ZCUjfhmDL5evR1LFUvmFPgLVs9bJF5pscd/dHy+fP2a6s1vm87sE7+bJnv+fnnzruQ6898VkJ7CaY/NLG2DR1H8nA2vB978VZXCAnmDVdfPwR4/ca7c2AonJxlt1eFteOOBTbd+7A3iy3NmT1l5Sq28pjyDyaCHdPRYb9TRMCDWwJS8KynGcqRlYpQ2E1FZf9rAG4MI7XA06PbkGieD3rJ+lU1LJc9GwPMgDM4Ni+v1uhiD8vXgehPsGISvD3U/3cNoyBepxnrJtGzq/flfzQ/s1/9hDx/vQA57gyJV/0Y1I3dDJoIjN1S2hrzMUzf3LeUHDBIHlOwijlBtfB+gm7v85dQh2cO+xKLmqNIm2R7tXXu5krF6Hmzegd2BkDk7I1PSSfPBhwX2/AzJIHP2ynOI/XOu3G+N2XV/RsNujMrnuozFWLUYbrwDHy+Gvw2MWeYUu7FNn1EYP5B3cg+GbFK2Q3Zt1+DdZ8eg6MpfzyHEMSg6IdxdcEdHe96JgCql+ZV18GVv8ahVf7Scd3PiOzwPOB3oAVmfn8LlBTLfQCAoAcwBxAEkCoGCJAr1VTz85HelJAjJQtmNmy9qpg9jSRsPTRujDebO9xHDbb/OYqRHD6vT7QeVcnrtlzmmMwLAESvN6RlIziXd/KNYZzLTQRMktU85niwra2qnpLeI9vPPs93/OH4KCBU6KOL3YIXc1M6f2tFLD2L3z8MMihuvZOMjjYtoxurwf0jzjlSbGCJGOuN6vQF5ASNKQbgjVgCvLy+OTVxSf87wP8fDBzLmX+YDBKDiizyeN7N8IOiY/OBwiRgEMK2wEnCbb5FvhZqY+dJPJ1TtP8d/XjpM/kQMScAERoAgl1fRWT3+duhXxrfzO1Tt5Hi4k+sHK2ZnfhW50Rt/Sz6DQDqhxO1u8PdcNn7tdJZj8m/hXy58DFRvWJakPOd1UwGBYmJrfUk3AfI6ZvBhj/9Y9/MPEMxgkK49AhmLZ89cPHwSHTT+tGBE+aFqjT+BA5v0vamkZ23jRrm5HbF/Nn966zeZ9AfE4W/wBMnzgONms2AC5pu9/l84DMkvD8Npvzt/M302vyt6m0cf0UgPxYo+ud48R87qh974zqJQojLfOB0QZ/5lnsbofKT/JOaxnwJlXSai2N60PqunP3r8jeP6S5QKa/3sWXpjkZ+e/sTBnl9yM+UHF/qcWT/zetVPn2r9dpuPD9DB0X8hgFI4N39ZUno/P0RX9C10jsSDqj0/h/WDA/mlwrFfWa7ENd7MrwPylQWqMOkzKp9d+oiz//TWP7Xze/2P86fPP1TTJz1nusTvbfrb+wefPqj0fyQ5n/GR9WFUvito4cdMj6TfKaf+Vevfio9G2vXA+fWIdrzjd9ycH6tnwvR2vUXBkBRfUUBEwRpPr5kIErdRy0Ul4pgOjhspkvR7NHA8JY6/fzRmkOYFM24OtjgQxfaigREFlmi2zdGCKRmGOG2YCBBVMMVNapQxnARaUigJd2IGSRLIYCjRHjNS+VERjG+ZYhAChOLb0fLv87ZxVk10J1zYVmh0Xm0395gdhQmaFKsAYQE0tzNAmSASvRRYO5g4CmRpYxXGjLiRF0IyXHCqX8GBISxgaeNYTh/ndvbqd3Fuf1pQSBE5KGF4E7IoVGjiEOwFYbpcynxUpoJz+m3WzryM8zaQmvMse3l0LmQng3Gff0Xim8woe5Ikvix8SgHWPFGzfh/HDVwSfKA4HkpRkWRB4LRRyHy+wfEtVlHx2uF6fHr85fCPx38Mg38TH0QvgxDd5bIBHgHZu8+c3x79DtC/np/5AKDMT2d+i8xR/nb5z5D/pGDVZT1q8XmeX/X8rOYH0kLY418OHOWscpG/SrpclWJCdKmJb3SMB3YKSFwrRCyDpi4Ggw7/2RiRfzbzL5ZeeW8mHL1ZUnrC8cYgI+3Oo0cEESSKLqBcaUATS+vAscIc3Y1anUf2jIir6VJu9E6k0h6rfnXap45BWVM/qYNz/zUZqqLHFQHJYAUORv+iB4VV/igunpydJuR2dtNVYxlp3AlRzyEQJNHOqp9pMSgDqRyNZZT5ZfXDbZ9fv8TRietNNT4gigbHAfra/c+GxL7hIW/oJNE32/glbVA9/skGlTZ/J8MWAKCPRRWkcR2WyMxYZICf38JEIcqXLG922E7P8080diw7AGX+ieXH71o45++3r9euhItHdjtdonAuuNAzYXboI0qJPzo4H/w1xxdpbenxB6f1Rd35pWlOZDpzmqsefUXElj95/p6cX3me5vmRxz7LH6989EhzBCuDylucscjBRADVB8hnjz4j7T+AoYb8EwJxwOIRih3O66cqit4EpYpklnxKThVG+5gt/o4skUOyZDlfRojIL99pny1fUfSgup+pUbF9OX+iz1Z/Gh6/75z/Hb9jC+vGvkf/8m//a+a7Cio3ZOX9d8Ay66iR/WcELwSIf2VnSe+5di+/1RWOv9PzNIgaZXpob9njjRgBUYoxgxRjJsWmUixXMlvte+5bpKQZI+9R1wUyWDHaRiHHC63rqftjv9RHwGy/5dmDmMeKMWbFIKvfMswr/jiWX+Bdl/dovMSwsU1TmX8L32ruN2DFSNq+3fxerEK7cigb5kmGeWj0Ld2Pu1rTlg9ZfvTHB+fpn+D0/CRZ2tDtl1OG5iurvom5NT+O4noe1flfLwSQlmvO27nvXqlDfW3gfujNP06eirQdT930j+dyLb51pciVYWX9PCO/pNBu1ac75Puj15otbN9evv185MrkM2H0yvN2/c7fbdOOlH+Kfxw4Uv9IDNfR+u+RX63Pboy4wfpjHc/Tn+7hjzYs7T/DP16MRg8OXXkemB/+lVR7/A7p744OB5yXX8+Wb6P0HdW/YiGyqn/7eahoV385v/YD4/u7EJwrz6u97n5+svNSTS+GbjQo2r+x9mej8md0nFX2PPPINf8R8+sd3uFZMGMtXyZGQ+CUq1LAPnnDoI5C9GzwXlrgqjNSC0zsPq+VmzUuvxuiQRKmirTxa2NSihtZjUZMim5RqS3phLNl8HSC2HgttwVSjmEoSbjHjtQxSB7xNjwrRtIoBIqXZ0SkDCyBkqEQzltOo2UeOiPHqYn5kzJ0oH5CNEhApYmp8322pBfaJL6oceYbi69ijNR+H+2XWjA0x8DLim0DE+vCv5Lqz4Y+ouVUoIG9dA9Hbkx9bJXnsOezFZJHRVvpyQdPrgA4T/8Ep+enJvqZBzJGWm2U9vrZmR+H8nGed5L6VMllMFTm2FNVIBkVS88N+ZfjQ/HpwPgMoTj/WBrzD5IEvKT25XoqnGUMFl5cjZspvxllfM7Ir+IGtu7/PfL9UfOnC9WaUNOn1OsajJ/bPnI2pG7tKvtxrxQdr/11+v3848Oh+rcGs5p/nly/n7+C2kBSYts5c39wfWqVQdXfKLj644my1jR7XPlNOFD+rl26YLf/Lvs589ec32kdOmCU6hoUvZcmjfL/Af1pZ4ip5Y+bf8Qgl3WHpYxHGxVHYyi65Xtjb8o/SR6HRhmOQZEcg6b9UsoD9ddt+AUaFOu9f3P9GwR3/XMN1g9ryju8wwoi688r8xeT3gDc0qZCygZg2WRscJ7U2XjynTEn41UPu+UUQlDBRLRTIpqY5AH9UEQj3HwS540umji6vM9d3Mt3HEsyYACAJLovz//YMWRO8wU7rPl3nXSQFmNXD0MlGu1aOM9XCAi3JmaaQaR9jHhNk0H34yInJMmHNo7tnaE6N9IT/Z6EmaQ8x9tDy/fxWe3xsTBQyc3vw3+MGBR6O+7Qa6J3my8WPELfebj/TEh8SE1s5l/xn9fPc5hpLs81nZlmMCXehgDJML/IBY30N9pPKoP8J2CNf6A07pTX8vSMW1ojbgAJGDUeH7+F/rYc6+LB+jOde3h8frX58FHlj+HvL3/esY23fFLLiXH++eXr37H/2sWenp0PaLrYK/8XQqez2O6fv0/p7Wdcuuqx8fnueIi+3D0AJODn6f/g/BrLH4bHf2z+8dP57yifn67/FyIn3vE7/rlxWaMqCP/sX/zrfw/KEycbOJA2OvXEyc8KoLLFJ8FAMeDHz4yXWHVnBc5iIAGIFhyIUmisSLli+FvhfAIzIviywUObOHty5HYRtLQzbggVoxumkfQcoaW0L9Ertk8X+uXnMxjr53qchsqt2hlPQ1Geo4HZb388WxNEr8zkD6dzOhmq6NfBJf+p8Vv4g4phacGxHyjpLRwo0ZM4GRo32Go/JYWVKWHscPRQXJ7XdNMUaahlaIyYSZvf34vrciJ9ZEXH/vg4/QcWOTnAf+fzy36cEQ2Ncf7Z8iUeTByj2x7nleD8/ORiWDrH//1+7XFrfniYG/MoG6IJihgCKMYQViR5nGIKR8OdhbWiny0n2vwnpR3dv9SH7XcljXTVnjX2+lHRp9PPkNrZp4NCsS835uuXexT79R8sh5ZyFMfLfVT9PfoH2ozXvfVv1uvcv6P9XKffyz/j9Asgm3+eXP9hrGv6PqZcRUgrafy/jVW338fY4gCZ+Y7gkA/iz+Yv9In7izVWkKT1LfPpCpPb/+H2rehEK3qq+uU/pn7rd5leaOKQlJOM0wuNyzPJsfy9dA97+WM6pWcq7du2s5/f538Ta91/2tX77P5nD76z4/+Y+Xe0P7TBPv0hKSxWNtBtcFy/bPrV/LBtx8/Dn1Y5Nf1pgwf4Mo/Pk8f/Hb/jEYzKQYCgoL/+m/+kJS0Jt/Jz5fSZNs/1b2hV/M8LkoLgS2rDHi+x2lrpCXTtOt2L4bK7Ukw66DIdN+eg/rWDHIPiSAyUe2L3ZRhr/xL/atu2R8Zu+J4xgGyQdGVTsI0114rd18Kx/rP8KyvatK4keFeWl2sm7faZeFNWr/05pt82dp3qjOhZ1efXR8cQWc9zjvQdiGMzGsNplP84RNyjv4+B8/QnQCds44Adn59++z3+vwfsGDft8pmn1fM2lmI2XECjYSPeopfyTOCSvsOI/CM4yX9JftRvd67bzyl0CWE/f1nTy2aI4kt8NB8ALBik8Uam0X6Pfm4MRSz0QtUOAq/a0cMmfR+AvfJH04cwUMXQOkd/TQc+9bgf5t9N/+7mnwfR3+KfZ9fvYRWs6LEtb4h/yrjb8uOZ+pOtXwDzPBupgvrG5JkYiursP0ZjzD0/huIYRJ3qfP2jMRK/ewzFQf1L5Nbd+wHj4zd65fnZ9ZeQRQfyt/WnUf7y+XckhuIof/vzx6PPGLzHUHyHXyoICWYopLJfTbzalGUjYW1wy8aDvLFLoPXvn9VkBwigFNsqOk7usVqxxJAFQvYQycXWnxdY3oaVM+f0+za2S+HJoGgJvcoFP7el/uwZFP0YC57C5gxu8siBJgGPHLvomMA/As+MoagSlZb65SqqMaaiqvoLus5YefUCKaZajK3GTDBj1BWDhDSxphP5bnpFG9pgAGjGSC0wAyWocCrzHrwmBOI8WGMuL2PRpDxUf4T0Jr/+/BmPYbVd8HX3GYZS479U43HtOwPsxqhzsCO77PYlo8TmN/fMT0ohA1D4fI1J7flxD7TmR4FO+TV9o2FA0kY/8jClvPH6mcTSq+clThrvcNZF+ez6oQCTZvN87JgumAhQTd4/ZZ2JmDR5B+Y1FIzo7b7gZI3ptn8N+7kf6dP+fsHYlUtpI7luRxtb9H0E9sofTR/CWNac8/TXzrjf37+7+edJ9F/zz3Pr9zEBkgy7ad1PPjeHyo/6hwJ5vVrhXKQjP7YGxQfqT7Q7WNime+vL/vNdrVLA1B+8JeLA+l7dx1rnUXVp6C9RgwYjL92p3+UBJz+PGnTQGHddsNs/J92DqJJWhsuNEfNOFWNf/lj259fv8sf+8z198vkr7R/N+iuGqMo8JsPG9HczVXlV/Cn55YDbO29+8btB8R2eAwxg3rDXtNgT8sJGlbVq+arA9jvFY2fQnVBkfxZKG6yd7zMu7yzR6i2gnRN+3eDioXbaQwjVpr79uzg+kjy8ksJMuV21PKNkXFowoJXhpIV9EFNgJYNW9vDUSllNzzwUNHmppYZHKsSiktrIpa2iEn1HmxvnPeRTthwgur7QG5uYy9jjwj/ETaxeet2OreK7+dwC3U3kNSaz/YCKnT8wxbZSwgDSRYu4rXU8DA6NsaWQ0P4zUdqGK0AcYHkomi/lQT2Lzsz/5AE04mFY+CG15l6MAEvpsukfx07zBjl77iF61tDm+7YH1Wj7gb582/Dyqkfxf667njfHNab99+VCi1JiHQY0+nPFn8dnJS7P0alojXP5QsDZt5gTL5JQaLlyU+ijAlkWydRfghLS95kHUj9WOKSxDeV5jWs4y8eA7splZN5q17vgqDD30zUbt5r9O4Ad+Z3TW+Prjb/SQLsSaMXN2wv0R7CSLnL5xPrl9b/Mgx59POzQr5uOY/UPj7+Ds2xUaNEPsKrX5l8k3aRdfqXfGrB7cSHR8jcISjX/7TFITKkceUzR9fRE5/ski3P/+/Xbq4L3UscVnbIRN+XRyrB7rv7Eh+Bufg97FqeFx3vg848JjsFC3ZdC5jmACtcGJKf8QRbWIvOwGBJrD9mD+5cuC6e1tsvCzu0YxbH6jZbZ5bsWZ9p/3skNS7/zPOTFnP+a26jLTYqWfKCUvsVxe9pPJ3S+z/lh5ZfULoCUkW+KPBQjmOkqMNMZT2rXO/6Lx0JADn2VZ/UEvGzkTiXAKLkb11K7fMwGuQmW0PI8vA69Vr4HpJhFEK9N9n5jlg6asvErCaaiwADEhNv1ttrAqcgK55hWpw0KIaRGtv/m2vgIIEpIBXQGa6QPZc0FlDwuM1ZMYTLqB243g3aAe6WAOfd/1cLl4Nddr+zy2+7uuY922XW+HjBfIKpQIUii5zrimHelgmDZnIgmM/fsLKgiacOn1MS1m33u6frKkK1QkKeweDR2FLroqdUzAE+YbfazPVxJwdOe/1b1S8U3uuAMgSezD566Xd5i1xkfD0cnmrzruB/PArQNPBGmyeY/vTkKv+eBQAA4X21MY0xphpZngw5SG3z24HoIF/nTU1hjOlEoB0Hl4EgFtyTHexBq5igybaEZSaT9rnbKG9bYRW5hoFLS+RSWtCH5f+9uAAAVBklEQVRR3cjdBGLNfwWII390Q344AqCs353xDTSZ8q0VuqO+kumtT8Hhz9ErUXX3mzSa4w96q/zE3B9/hbsh9yDL9765lkwtJL12Jv1yPRZ6xAMrDT8DEInjUTAAUjXr97BHP61/n76P4UYoYhGzfM8gMXrDor62mQ9ay4ErAJXaYLiHeesCsGrcDNErgKqOzRXSrC+t9Kf0p/D1bx/WG4odDjnqescgNnHRr+MGesFL6JjKwBCZKm7kdQm506s/sG2Qm535P02hGJsqCZXqpUW/6JSvZPG/gHWKB0EaD5a2eCLuiU4o+frJ1p63kmGcW24dyNr8PzsGN7HYVwGmUA5FdkNBiPu7LijCFPmlW7+Zn0HTZaUDb2W87VAB5Ldks6Zx3WAiduSPPf95uhi155BH5gbEbr9r0NwWt+WfW2JGbeLlXQBtPM9Z/+ImvkxTOvyngmNAxYh1ViAZzqSBQwgYMSiKSJyn4AYGmCjOV8S5XmMhSetPCjHTwC/hxZzfhK7qBCUgMCd50cZe/nf8ji0M0TQf9phIETjEF2vmfH/9t/+5khkb4aK02dBthQ/jelNYpyyjMThMhZ8keu3RDedOSOqKGMS6wiCBzEB8K3Kt4CQFCHOiz3mVWchO99rPc6ZPikm32UhvY4BZ/W96wDgxAMf6X41/p3yZsaJ7bg8hgFjd9tXj1cKX6RWzXDHftJTLAfFkqBr3s/33TuhE7fa5MRg36fUzsbr998p3PaQO5t+OV2mX0Bj98tttDYNSHbtxHQOPsA6ffD8ft2LX3dP+UUzmgcEB+SeL/DjVjmTQqw13GefYmWZ+Z/xt+SVJIT/W/2JIrAyKUImq4Rn+Rx1DrLel7GOh6LXUPHlPWGZtfp8xRxW2W0/0iuqlo3hAtOh0aP0SDI3f6gaAzju+8WJohmBrRR797omR14qFxzNM+jOHbrpQxNb4e/iCfvne+AtpNEQ36JANN1O42O24Stqz7uuLV+5t+njY5t8lPddDxMleFr8XUbP/IUwm/UdjKM43KeVsY4MSEUSSHD61vt4wy2eA5pURvjYqZoN8bVCs070YiB4EQz33QFL7tNoCbOOQteIp1nuCD6bBZZ2/VT+AVf1byPTblpPbMDkGd5O+SoC+AEYZl0u/f0LA9Xo1j3xy/t6BUTRIn9cflrLuXx9IgQ+XV5DRAcsgqAQoC5T67fdi6DMt9D0Tw3MZ/3b9t5t06xcAIVwi/xn7E0sPmWd7/Lz1d57VTA/hUp53ejTNuN3eALp12+ftP15e7PmbQ0/VY1GP08fLi5n/7e3NTLfmV11XD27XHIOyrW9O0wss+lr88Yj9w7P3H+/4Lxxv9p8TrrXA3ApvxupO2E64Lm9p7YKjcByKsWCUTZSVxPZf7dG2/0N1gkxAiqeHyquJBMnowFBJQcAlKcxY3m59+k+zwtv+8zzuWXI/Mi1p9dk4vCt9rJ52OMYA5NTWPQ6UPSy5iRcPOe7gVWt2WOfUgbKYpPhISU9Ygvp28M5Vco2niQFhyHyLygsBpAEhEIgm3EpQ8XZ+/0aEN76ZXmf4d6sk0vqzZA+TkfLtP2ZOpGjj7DEbY1pVbcvfa3zLMIqvyRpH9uynizO+JaZcfq74ZQkN0B+n6IFr0E/Sx86el7NHiD4JO+OjpnxJb6816KtqKTyoZMGan8ocdYCd/nnp5TylB1Ub4rXDBRMiOxQv0waOG5o2beIvMh0I9xocoixLjegwUXyLoGF4EXtDQDkGWzN/RSbqfXZ4TGCme+tPnl95zar5hmjxuO+WH4l/nn5O/oyJGHF3XPO1gmZ7nKN86I9/dHQaVOzMA69gtk9S+2Kfqn4nukUPnH79k2aDVzK4Sja8xvq3Hmb3Yia7fyjlL8/x4CrTv5+fSOL8sehf5OO58Qlg5FiKu9iOAELWuRUxXwuTYIlVXeM5HrimeZPjQNd/gReDVtZ1a4Pi9e2KMbCFvLUhJwAfwgfUXrrb3/cMefkzOwuAf0NliWXbgk+XT2Y7PIOqa7DVuLfowfXaHx8l4OPlYm6xikEZSx/qz5H/FT0PMsBIB6rh76yTxaDfSacbzA5YHoZJDYhXT5HmxRaz2X4Ky961aXQ9HEO73b+Plwt664oAuF5v6au2nFreAdBJn6/d8gFNDNpP//jyaqa/vVXlU+oxLf19nSYAmYcbctBxuPBuyHy4fDANiuTk/zh9NNNvV++KlJ388fIhtqdzAHS7iqlafJw+2OM76BDCNNnr5zt+xwP89W1lUAfo3/y7/1LNyO3sWd6wBN0vekpIHgLnG5Q9w3rpgS/9dOS3yPUXZP/KCu9+Z51QrYWbHCi/D0KxHH8708YAMNGU1se10G31pQmWNgVHISL/pSX+lTK7/vqEqlTbOIk/W/+HDx9wu91wvV4hEj0OQwhFOTev3FlHqwks+kSbyFj7S1Map6uAr9COXuk60v7eWKnOkPkbYGiUVvmRfsf4rze/CQGW/HCv3Doxgp75lkdn6gDwxkfAedNwqn4q9Ou9gc/d0A1sSI/035KH8S3NMb135YxEm98vV9ImM93D3pXX0fnpQR6/7vxw6veuTHr5W/OjlhXuW2Kd/fqj5euuTLH5J4DM8ZeTcy/DlAjQK//Cwaz/Fi1SXYOJJ79Ckr/xUget8JH542GPfjk91xNAUKbyPWYx83sy5FHrY2t9jvLx+FtWW3C7XaMBldpGxev1OqQ/eZBVoLPjK9DD8qal474kD8WufHXGnyc/5M527FbtGJz/Ectp+h3h3z59eTGGGPnt8m35YK8Pipd0w4Fw//5HwZAw0H5abhgd3f/tIDl0nOa/YHvY2fTPL23s03h0f7bNv50LXkgSr/6j7evpcZcQQ7Z058dtHlpfJmIznURX611dXr0OndUvPf4Zbf87fscj/BVDCizzcgorhX07ubUyKDYED8UTWDWuHLtYYKaz5yEz5yWmDb7C1BZUTeUh51jFe8rtvx8CgBlqHtIHI4YKAITNhmvbTn/BsGOs+eaQPD6d/O6Gzk4P5XexH0TpTLAyVNnl2/3XtzeQCCaN3oLFg2CeoaoIhzac/f7TgRihFgmObniB9qaXvRPWwQ2Fy18bA1M9rwgCzFdTITLbpwzmCdu3DG/bF8tY+Kee81GfMcbIizH1HQ2KGSz+sQ3KAujtvEIqnA5EeCMTl7F+pkExp1v9F+lvFkhjCC8kDmJgh1XE8s+L8UOSPD6FifKe5HT/T6crFw/UswZFd344wIk/uwZp06AIUIqh1E33DJp3yr+6faxVuxUllkyNGdT8PmMRMcffbLsCzGLWTyxm/WGeodw67Im6w+Wlv+FlBUSiBxUjzsOMc/kQNet3sUO/nF7qqTxpmOMNB7P/IQzNPw+28mdbJlXezmeAJc+VLE+iV32sQnHR0NyMP8KYGMc/8V/nj4macjVjEYXQfm1ut62KXaga+b+KYdgqH9pvGwHgWe35lzz8M43zd1E3rORBp36rbiIBaQzbdJZ+3vpRKNc8cJ7BlK9k9rrv6Y9OjHUzTeL4kXT3P7U82eMZLBPE2n84+hfxW+pHiz52/1fyv/MHVXP8WMmc/fY7BFJOK4i7p756B4JV/S0ahdkzGHr7F3//ENeiTbsoGjuyh3J//jvzx/ljttNVZmQrN6fA2cxULp0QsbvOWfqh3GYzP+cQH71yMLj+vuO/aIzERz18w/pAYfryh99vLI+8sVDGSxnb7/PJ2izfoDTj7Nti2HmLEYSMdALrBfGtfe2gqpdwaX5PmlS5eY4nXsoA665dOqPUJ5h37WKyg7p6GE6MoBAmIx3xhEQ1jY+AhBBPPBkzZshVyvMOA3iZpmp8978LCP38JCBVM/3CF7P+ErTdqH/GvPpeWREQoKzdfC16eP1DQHnWm+Kmt+SB1M8/sV0/ZpjpTJPJ/8FJL3yY+HU7n+z5488/D9fzw2o/I6zmFykDNENxBTB3jx1ycP92OoGQ539bIY1BZZfn7cZ3UVjvn7/xwCUqRawxJtcWTxSa3z8MsxN02mz/jBh/Vk/TX2aO41CXywDH/6LN0qBfjnX2rP7Ht9ztn3PswXzlvsc/OouxoWFMHNLzybelefLVkV9E9vyd+NJNBxCDoif5W8tTT+4flm8ObsnXWr57/Wdn/fHym+tTo101feorSWfHHyfpxrq+AXJ2/ZA0fvV6OmMudHsJL2b9OcZxrT/Vct5bf0ZxvX4J5rLOtPS3Zn5nfT86D47iXXnI+tlZTwKGZGlGhEAETUYoQXqpTaVn5fQs1+fr9fSFbgDF4NGTn7ZBCOlAiJrrjRLt2l+/5AeoYhz2yvewub5F+tX0yt9TMirml571yl/Wh1a6gDAnfmznn683s/2vr68mf1y/fkPLc4oVkW90zIMq8vMZvgUAQUgeiuf0j/jCphEPG0ZeP9D0NLP6D2AxsnXG5xImc/yub7YH2kuwbkDElyNY8sMbvw+Xl0P806QPGB9fPixy6G79AJDrrciv1jh/fH3FnIyyGWd5kT2wLfp/eHm16f/tzUy3HHri+tpejzKer2KuP6+XD2a6u345+7fR/d07/svGnv52FV09T3/8u/+9mSibCST5uaUYKETfIHQ7rdB7BhtbIDEmvECIwMIQlh2eMDW/Z+GVwK0VvXrjkOvfGuoWBZH65R/A+bXw3SXTCKpLCqTXvCIr1DVWEshNDYaoF7xzDFUUo066taFdG3yOMXYtsPPqNjIhaoFLAeVZbopZb0779wvKvQsCkb1h8eZHzZeZb1v8+6wN09Hy84Y1P5NERVJxw/kTagBqK7S1QtW7miCEU/N3FdrhAH89AzMZ8o0FNPflE0hAlYfT/QY1QLMcTfUEDdCgCBrKs1X/qEGG0C9/W78GXX0fDSJvQxvSQFM6kDp5sJReytI9cDIMskoKwDa4WgZtAJAZySv7HL8+SuGt5XQ2CNWGqa5813mIfluD85HfgeN41wcKzxr/owcavd8Fsg3u+aUsWzp4dKvrJ0KXTkfKeTTOBxpH+pH7P8ofPTzxZPJlYFu+bA/Edunzen3crpffvnxdlcMggKn8zjZ42RhYPOAjN+xxYDavrl6v16W85NnT6kdNB4GW+otBr1O+i8nWL67f3lb0WrVH1e1/fkttvx22wdAbHxF7fW55Dtd09rDHf1F+n+UfWUI2dHY53lvixbnh5emPWb/p0cfqPwDkGO698Z1vN3P8Q7ANXrZBUlL7+vqzhz2DdZYXLXqCKa3/QG99dvefbL/lOI9PyzHgyPxXEZP+3vxkIjP97dsX1HrLVq+5hBej/x59/P3rUYeT722Yesf/OPHl9cPaXnH9+kesYe3CLNVbhPcgoCluDPPFpC3OL03opd/SCU92vN5itfIr40ZvgHI3/1fHpTu+xQrQqh351BJYx3BSVcwVBuIpkdU/DyuZzXMhyDIurevZ5Ypp/s0G325+DJk+iB/jx42RYedvXduur+x4LvvelY0QwqqMfOKuqlFZc66MOiF9/SvXbPffC5neiy2yvbLfg2fHaLvWV9V312AFcstvaT7ZPufKvnnl9QD/eBCeTD8PxlofPTCsUuwYdtm3YC9zjl6rozuu9Dfb582vhiwsn0mg1zcs0nAPXgzSeCNu4Fq7M/+9K1s367rTAZhoKu1vzRNPfozGUOzlOVQ/CUTGYjh5MaDqNrU+eyEPXHDG3wWnfo/+OYZd78qzx/9zFdT+DP+MQiuswj36AQXnSuQT5bvqeAzqrX60/X3ecNdQj/fo+jc7LzVwY3BeJnN9rl9K0uynw/+u/uOMfx2Tcluu6mLY7Jbv8Q/Z9PfWX3bmZ/Hg6tCYA8Fa/0evPJt5FZic/F7/EaLB5Bxwtb89Kb/Slfge2ONP6W6I8QtPfyKFxYSjIaFq+XBXKJSj5c++/mO9lMWb/77+NiA/Ct812pXAk6+PjnF5b/53eAcLrHmuFPXnmsOnX/+wZcj18+vrxyV3A376+u1EMx8IymgbOyN8/PgrM/u3b19yQXWh1edaYc2fl8WGyDZoeOAZFD2B8OtP9lusfvrpJzPdWxY+fvxk508b87P1/+qHX5vpowLxj3/cGszX8Jvf/GCmf/nyxUglt//iKbyD+5U9fe6j18+x4esD44cff4TPhT1QzE5/P3/+bG5YliidnRo8g7TT9mcbdF+d+e+V/+3zV1jy88OPlvxU/PnLZ7N89gxmBw4ULHC2G83QvykFgMa3vBs89PpqB01n760gDnz9Zq+fc/Kg7MGr81KBy+VipDLevtjluzDWfRc+fPhgVv7t2xtGNsQ//toq31fYxdvwejBqsLpDvrQ+/9lZn70jrV/9+Nqs71EGKw98+WmP35evXx/XmHuBGKQXWOufzb+KTz98ACC7TXeGby35UtlARqfvp08jL5UAvr4t+lWLP3/8ZM9PuQ3OP2d9KvRrDQMBnz7a669nEIv7hz6PWm95BoDJlO/AN8cg8vqBYPHf1TEYXy7nD9NIGSQBbBzIaejvr4QEylfogEGN8GoeqJnjlzwDzfK9Ax216W8bxNQ1SI+C51AicjMNmm4McR2TQN78V7X5d0j/Jt3wTKm14h9vfzUovxyXgmc7jLzDP27wXir7ZX5bcSD9+E//+Ybj1wX86Y9/SrnbBX/68a/OtPOBYAusz3/6k5n+q9/8eLim9knwgHcKADrwljkLPv/d/zHTP/2VPT7kqJQ//f3fm+klmMjJ+j//gz0+3obJg1/97ndm+p+d/nn5yem/u6EaFPijBsHvbVD8/Pt/wPk5JGlD0Kfxx8R/Z05XgQMnhN/ZoPjnPzjz0yn/x9/+EzP9T7//vZEq+PS738KivxsU3XUAGPMwsT3QBG9ff4LpofnmGNwcD1kPJuOlFwDw4qR/u9rt8za0nz7YB27fGz7/4Q9GquKH3/0OIwZFu/wDMCo/n2xQLOl1PdXnj8767MGXvH52yh99aY8Lg/T7+NvfPqghZ4BBeIG1/nkb+i//9/co1q76t+nzJ0d/GYXPf2etD3DH58NvF/5rrdHu/Hyyh/APDv1++r2z/prjR+leZ3/8Lz/a+5PrZ/tAgC2DJ90gX/6MGEe5DdMP9oH7zT2QMEAZuF1sD/+Gh20BugH6ZrbfzA8G3kLEPfnlvlTPkW+eB/xkG8xt+bm9j/cEcD305jGjpo7pT+7899bHIYOipPKlzz/f20Pw3aD4Ds8CAl5//evVWdv/A6spxVFkhEI8AAAAAElFTkSuQmCC"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAIAAACp9tltAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wQLER0vqDc/9AAAAjZJREFUKM8Fwb9rFEEUAOD33ryZudtzL4kkKokcImgsUkhA0EIi+AfYCQFJLYpgKdaCYCE2YiOWsbKxU2wEEUEMiJqIGNEIJubMXXKXvd2dX8/vQ0JsZiYhECoJrQQpxAIkKmYAARZEkAQpKm412rdv3QRVlJUimdTGvH7zMgS3sHA+xDqmWtsoie7dfUJj2fhoWCUfLSFDdKN9JTKWZw2rNCNKlJA02QPZpDo9d/zwERTq9nZ/ON8HGBTFdkq7PnQFesSD2nX3+puu0Pz128e5+aF3pcldCnpYmr/dAWmcOdYNEMvKhxitbX5e/Y2d6cantevUWqv8NmObYebhg3WkePXGLOk9Jz2AaNLsyc4yM4s2vQAbpLYQm0qC0ftATmQ9xB2koVKYfNZqJq6H4fGjDzbvJ3QECdyv928LY2nZjljXyoTShZ3tVQuRIZCGafQNwzUkkJDp2AVXazhIklIdGEzbTo0GXc5ytXjllG59SbhJYsnNFH0A3ltamvK4C6QiCsXp+3eIE4ppVMrsV3FbYc7oSYuQRz1gLECVSmTk/wgmPDROFy52UA0FCyWsYr7xvRJ2nRNGIJIOPlJdN9692GFt+eq1BYEhq4pSxNB+/uwn6K1LlyeSZJXTqmEJjy6+esq2DfNnk9JFjF2NwKm5skLC7sy50kmJkFf4T6u2WOGRRxdaRo8pgyJSl+3S7xBOeJgRCgEYMPOSJQJkC3luEAVQEAAjuSoBJdMkARAAQQChvb77D6EgON2JAnGaAAAAAElFTkSuQmCC"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAAABmJLR0QAvQC9AL1pQtWoAAAAJ0lEQVR42mNgoBP4Twhg0VCAF2DXgMvyUQ0UacAVazg1kBBxgwkAAADtmtUipjPlAAAATHpUWHRTb2Z0d2FyZQAAeNpz0FDW9MxNTE/1TUzPTM5WMNEz0jNWsLTUNzDVNzBUSC7KLC6pdMitLC7JTNZLLdZLKS3IzyvRS87PBQD0cRKBbRhJIwAAADN6VFh0U2lnbmF0dXJlAAB42ksySzQxtzRNNrNMNkszTDGxtDBPTrUwsjCzTDVKMTdMAgCP9wizM2EIwgAAAABJRU5ErkJggg=="

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kIEhEYHyFyb3kAAABGSURBVDjLY2AYaMAIY/z//594TYxwbQwsyBKFhYXkO+X///8MBQUFJKthojQMmKgZiP9J0QcLyGEQiCzYbKHIAIrCYWgCAAeUH0MK6uirAAAAAElFTkSuQmCC"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wMZFh00by2jmQAAAlBJREFUKM+N0s9L03Ecx/HX59d3+25zc8M1E0VwRorZF2vNZoRIUtEliBAxMeovCCrsLnTpEHTqUocQA8nfRSeDzUMmKgWVenANpRTn17l0+27z+6NDFOQ67Hl6Xx6XF28CAKmdLOnp7VHSP9ODkhBNBf0AjALf19f74/H4a8D8iv9EAEAIl6etLRK9efuWUuH3Q3bYQQAszs9hJhpbjsVil9Lp1FoRttvLg4pycuT+g36lIuCHp9yDfD4Hw9AhGEUuq6HvRu+HRCJ+9jCmnPPO9o4OpbKqCmXlHnh8XrjcbjhcTnCbhDK3G13d3Y0g9NphzOvqg09D4TAIo/D6vHC6XNDyGtxODxghYCA40xp2g9IaGOa/2DQMEErAGIO6rSKraXA4ZXDGwAhATAsOhwyYZtFgNKNp4yl1B4aug3MOSggICCQhYJdskGUZhVwekmDFOBGPD39bXUVe06AXDiAJAWrh9805OGGYm51Fw/FjxdgyzU+TExPLmb0MBKEoZHOAYUIWAvlsDm+mppBSVXN4aEg/jBlgJHd396ZWlpeuAvDKsgxV3UZKVTExNorF+YXCTDRKt9aXWiVdO7+f3J3OAZm/TwIAjMtNpmF0toRCyO7vwe/3Ibm1gdGRV/uPHw087Os6dySxMofnz95Nf/m8eWULKKCUWprrJicH71qbiwPW2JPrVnuw4m0lEGCl4OpAILrw/mOkpbG2JnQqApvg9RubO6dJKdiyfuDEUcXms1vj9+70XW5oaMKLoVGUhP9UAwRqg9UvL14IdzS3RvALhDHexgokxQ0AAAAASUVORK5CYII="

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABrElEQVQokZWSLY8UURBFz633unt6l/0IgYSMQhISDA7NOBzBIlAoNMFiAIHB8RNQ8APwJIsmQUACBkPIZtid7emPV4VgdiVkrz/3pFJXi8WC8yQD81sPf3x4/ebtu1QlU1QxFUiUiHpUCvev35ePH93vrj5pvz0zoPgcUGqwStFYtEnZVGTFbEq5WBqBvcs7G0MpM0AqQiILiUS0IgnJXMpAruvhL+DFAVknSZoREkCjMCMUbpGAUnxjwB0g+ogU0XhABAEBQEwWExBnQDiAkZMqU52kUJGKIlyADANsslNDWgGuWpGDkEIlHKUpSIQsSgZSnBnSFnDvzt3/vMAON0DvO9duP9+1MabskbONFkNphjSVdWr7XPejVqvqeKg2gJr4eXT4+eDFP9rTzVfNrD29IXtdtcDiwcthKjeu715qZ3TjWHj/6dfBlxM+Pj3xUjen05DVs2YPIMKLX9y/MN9u6+53H35lv9rbbpbgGq3uN0ClxjwAH8ZY9+PRcigj6+XAyNBnN6A21fLVxuBHlA4wX6Wpm461GreOS9fTdYM0bQP1WFmXAJ133n8AHpLR7EtncV0AAAAASUVORK5CYII="

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {
    // Formata os campos do formulário conforme plugin de validação do AMIGO
    $(jan).find(".area_dados form").tipagem("recursiva");

    // Limpa os valores dos campos se houver webservice definido
    if ($(jan).find("form").attr("action") != undefined && $(jan).find("form").attr("action") != "" &&
        $(jan).find("form").attr("action") != "usuarios/acesso") {
        // Verifica se é um formulário dinâmico para preparar os parâmetros enviando o ID do formulário
        var parametros = (($(jan).find("form").attr("action") == "dinamicos") ? $(jan).find("form").data("form_id") + "/-1" : "-1");
        $().funcoes.ajaxSubmit({
            servidor: "localhost",
            porta: "3000",
            metodo: "GET",
            acao: $(jan).find("form").attr("action") + "/" + parametros,
            callback: function(retorno) {
                // Verifica se houve erro no retorno e apresenta na tela
                if (!$().funcoes.verificaErro(retorno)) {
                    $(jan).find("form").json(retorno.dados);
                    $(jan).find("form").data("dadosoriginais", JSON.stringify($(jan).find("form").json()));

                    // Executa comandos informados no parâmetro ao abrir a janela, em caso de WebService
                    opcoes.aoabrir(jan);
                }
            }
        });
    } else {
        // Executa comandos informados no parâmetro ao abrir a janela
        opcoes.aoabrir(jan);
    }
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {

    // Executa comandos informados no parâmetro ao apagar registros
    var executa = opcoes.aoapagar(jan);

    // Remove o registro do servidor
    if (executa != false) {
        $(jan).apagar(opcoes);
    }
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {

    // Executa comandos informados no parâmetro ao consultar registros
    var executa = opcoes.aoconsultar(jan);

    // Consulta os registros no servidor conforme o critério de seleção informado no formulário
    if (executa != false) {
        $(jan).consultar(opcoes);
    }
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {

    // Entra em modo de consulta
    $(jan).children(".area_menus").children("#_btn_modo_criar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_modo_consultar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_consultar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_listar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_salvar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_apagar").attr("disabled", "true");
    $(jan).children(".area_dados").css("background-color", "#CCDDDD");

    // Limpa os valores dos campos se houver webservice definido
    if ($(jan).find("form").attr("action") != undefined && $(jan).find("form").attr("action") != "") {
        var parametros = (($(jan).find("form").attr("action") == "dinamicos") ? $(jan).find("form").data("form_id") + "/-1" : "-1");
        $().funcoes.ajaxSubmit({
            servidor: "localhost",
            porta: "3000",
            metodo: "GET",
            acao: $(jan).find("form").attr("action") + "/" + parametros,
            //                    dados : parametros,
            callback: function(retorno) {
                // Verifica se houve erro no retorno e apresenta na tela
                if (!$().funcoes.verificaErro(retorno)) {
                    $(jan).find("form").json(retorno.dados);
                    $(jan).find("form").data("dadosoriginais", JSON.stringify($(jan).find("form").json()));

                    // Executa comandos informados no parâmetro ao entrar no modo de consulta de registros, em caso de WebService
                    opcoes.aomodoconsultar(jan);
                }
            }
        });
    } else {
        // Executa comandos informados no parâmetro ao entrar no modo de consulta de registros
        opcoes.aomodoconsultar(jan);
    }

    // Torna visível a área de dados quando diminui a área que lista os registros consultados
    $(jan).children(".area_lista").animate({
        height: 0
    }, 500);
    setTimeout(function() {
        $(jan).children(".area_lista").html("");
    }, 500);
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {

    // Entra em modo de criação
    $(jan).children(".area_menus").children("#_btn_modo_criar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_modo_consultar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_consultar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_listar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_salvar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_apagar").attr("disabled", "true");
    $(jan).children(".area_dados").css("background-color", "#CCFFFF");

    // Atualiza os campos com os valores padrões se houver webservice definido
    if ($(jan).find("form").attr("action") != undefined && $(jan).find("form").attr("action") != "") {
        var parametros = (($(jan).find("form").attr("action") == "dinamicos") ? $(jan).find("form").data("form_id") + "/0" : "0");
        $().funcoes.ajaxSubmit({
            servidor: "localhost",
            porta: "3000",
            metodo: "GET",
            acao: $(jan).find("form").attr("action") + "/" + parametros,
            //                    dados : parametros,
            callback: function(retorno) {
                // Verifica se houve erro no retorno e apresenta na tela
                if (!$().funcoes.verificaErro(retorno)) {
                    $(jan).find("form").json(retorno.dados);
                    $(jan).find("form").data("dadosoriginais", JSON.stringify($(jan).find("form").json()));

                    // Executa comandos informados no parâmetro ao entrar no modo de criação de registros, em caso de WebService
                    opcoes.aomodocriar(jan);
                }
            }
        });
    } else {
        // Executa comandos informados no parâmetro ao entrar no modo de criação de registros
        opcoes.aomodocriar(jan);
    }

    // Torna visível a área de dados quando diminui a área que lista os registros consultados
    $(jan).children(".area_lista").animate({
        height: 0
    }, 500);
    setTimeout(function() {
        $(jan).children(".area_lista").html("");
    }, 500);
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {

    // Executa comandos informados no parâmetro ao salvar registros
    var executa = opcoes.aosalvar(jan);

    // Grava as informações do registro
    if (executa != false) {
        $(jan).salvar(opcoes);
    }
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const aolistar = __webpack_require__(0)

module.exports = function(opcoes) {
    var jan = $(this);
    if ($(jan).find("form").attr("action") != undefined && $(jan).find("form").attr("action") != "") {
        var idForm = (($(jan).find("form").attr("action") == "dinamicos") ? $(jan).find("form").data("form_id") : "")
        var parametros = $(jan).find("form").json();
        $().funcoes.ajaxSubmit({
            servidor: "localhost",
            porta: "3000",
            metodo: "DELETE",
            acao: $(jan).find("form").attr("action") + (idForm == "" ? "" : "/" + idForm) + "/" + parametros.Id,
            dados: JSON.stringify(parametros),
            callback: function(retorno) {
                // Verifica se houve erro no retorno e apresenta na tela
                if (!$().funcoes.verificaErro(retorno)) {
                    // Atualiza dados no formulário
                    $(jan).find("form").json(retorno.dados);
                    $(jan).find("form").data("dadosoriginais", JSON.stringify($(jan).find("form").json()));

                    // Remove o registro da lista de registros disponiveis
                    $(jan).children(".area_lista").find(".selecionado").each(function(index) {
                        if ($(this).find("td[name=Id]").html() == parametros.Id) {
                            $(this).remove();

                            // Mostra lista os registros disponíveis
                            aolistar(jan, opcoes);
                        }
                    });
                    $(jan).children(".area_lista").children(".container_lista").children(".container_lista_corpo").trigger("update");
                }
            }
        });
    }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(jan, opcoes) {

    // Remove botão de fechar a janela padrão
    $(jan).parents(".ui-dialog:first").find(".ui-dialog-titlebar-close").remove();

    // Cria botões de controle da janela
    $(jan).parent().children(":first-child").css("overflow", "auto");

    if (opcoes.minimiza) {
        var minimizado = false;
        $("<button type='button' class='btn_controle ui-corner-all' id='_btn_minimizar' style='right: 54px'\
            title='Minimizar ou reabrir a janela na posição atual'><div/>\
            </button>").click(function(evento) {
            if (minimizado == true) {
                if (opcoes.controles) {
                    $(jan).css("padding-bottom", "25px");
                }
                $(jan).parent().animate({
                    width: opcoes.largura,
                    height: opcoes.altura
                }, 500);
                $(jan).animate({
                    width: opcoes.largura - 6,
                    height: opcoes.altura - 65
                }, 500);
                minimizado = false;

                // Executa comandos ao normalizar a janela
                opcoes.aonormalizar(jan);
            } else {
                if (opcoes.controles) {
                    $(jan).css("padding-bottom", "0px");
                }
                $(jan).parent().animate({
                    width: opcoes.largura,
                    height: 40
                }, 500);
                $(jan).animate({
                    width: opcoes.largura - 6,
                    height: 0
                }, 500);
                minimizado = true;

                // Executa comandos ao minimizar a janela
                opcoes.aominimizar(jan);
            }
        }).appendTo($(jan).parent().children(":first-child"));
    }
    if (opcoes.maximiza) {
        var maximizado = false;
        $("<button type='button' class='btn_controle ui-corner-all' id='_btn_maximizar' style='right: 27px'\
        title='Maximizar a janela para tela cheia ou retornar a janela ao tamanho e posição original'><div/>\
        </button>").click(function(evento) {
            if (maximizado == true) {
                $(jan).parent().animate({
                    top: opcoes.vertical,
                    left: opcoes.horizontal,
                    width: opcoes.largura,
                    height: opcoes.altura - 8
                }, 500);
                $(jan).animate({
                    width: opcoes.largura - 6,
                    height: opcoes.altura - 73
                }, 500);
                maximizado = false;

                // Executa comandos ao normalizar a janela
                opcoes.aonormalizar(jan);
            } else {
                var docWidth = $(document).width();
                var docHeight = $(document).height();

                $($(jan).children(".area_dados")).animate({
                    width: (docWidth - 14),
                    height: (docHeight - 75)
                }, 500);
                $(jan).animate({
                    width: (docWidth - 14),
                    height: (docHeight - 75)
                }, 500);
                $(jan).parent().animate({
                    top: 0,
                    left: 0,
                    width: (docWidth - 8),
                    height: (docHeight - 10)
                }, 500);
                maximizado = true;

                // Executa comandos ao maximizar a janela
                opcoes.aomaximizar(jan);
            }
        }).appendTo($(jan).parent().children(":first-child"));
    }
    if (opcoes.fecha) {
        // Cria botão de fechamento da janela
        $("<button class='btn_controle ui-corner-all' id='_btn_fechar' style='right: 0px'\
        title='Fechar esta janela'><div/>\
        </button>").click(function(evento) {
            var retorno = opcoes.aofechar(jan);

            if (retorno != false) {
                $(jan).dialog("close");
                $(jan).remove();
            }
        }).appendTo($(jan).parent().children(":first-child"));
    }
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function() {
    var retorno = "";
    $(this).find("input:text,input:password,input:hidden,input:checkbox,select,textarea").each(function() {
        if ($(this).attr("name") && $(this).val() != "") {
            switch ($(this).data("tipo").toLowerCase()) {
                case "inteiro":
                    retorno += $(this).attr("name") + " = " + $(this).val() + " and ";
                    break;
                case "caracter":
                    retorno += $(this).attr("name") + " = '" + $(this).val() + "' and ";
                    break;
                case "senha":
                    break;
                case "menu":
                    if ($(this).val() > 0)
                        retorno += $(this).attr("name") + " = " + $(this).val() + " and ";
                    break;
                case "decimal":
                    retorno += $(this).attr("name") + " = " + $(this).val().replace(".", "").replace(",", ".") + " and ";
                    break;
                case "booleano":
                    if ($(this).is(":checked"))
                        retorno += $(this).attr("name") + " = " + $(this).is(":checked") + " and ";
                    break;
                case "data":
                    retorno += $(this).attr("name") + " = + STR_TO_DATE('" + $(this).val() + "', '%d/%m/%Y') and ";
                    break;
                case "hora":
                    retorno += $(this).attr("name") + " = + STR_TO_DATE('" + $(this).val() + "', '%H:%i:%s') and ";
                    break;
                case "datahora":
                    retorno += $(this).attr("name") + " = STR_TO_DATE('" + $(this).val() + "', '%d/%m/%Y %H:%i:%s') and ";
                    break;
            }
        }
    });
    retorno = retorno.substr(0, (retorno.length - 5));

    return retorno;
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.condicao = __webpack_require__(24)

module.exports = function(opcoes, condicao) {
    var jan = $(this);
    $(jan).children(".area_menus").children("#_btn_modo_criar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_modo_consultar").removeAttr("disabled");
    $(jan).children(".area_menus").children("#_btn_consultar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_listar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_salvar").attr("disabled", "true");
    $(jan).children(".area_menus").children("#_btn_apagar").attr("disabled", "true");
    $(jan).children(".area_lista").css("height", "0");

    // Entra em modo de listagem dos registros que obedeceram o critério de pesquisa se houver webservice definido
    if ($(jan).find("form").attr("action") != undefined && $(jan).find("form").attr("action") != "") {
        // var param = $(jan).find("form").json();
        // if (condicao) {
        //     param.form_condicao = condicao;
        // } else {
        //     param.form_condicao = $(jan).find("form").condicao();
        // }
        // var parametros = 'indice=true&parametros=' + JSON.stringify(param);
        var idForm = (($(jan).find("form").attr("action") == "dinamicos") ? $(jan).find("form").data("form_id") : "")
        var parametros = $(jan).find("form").json();
        $().funcoes.ajaxSubmit({
            servidor: "localhost",
            porta: "3000",
            metodo: "PATCH",
            acao: $(jan).find("form").attr("action") + "/" + idForm,
            dados: JSON.stringify(parametros),
            callback: function(retorno) {
                // Verifica se houve erro no retorno e apresenta a lista de registros
                if (!$().funcoes.verificaErro(retorno)) {
                    $(jan).find(".area_lista").append("<table>");
                    $(jan).find(".area_lista").find("table").tipagem("lista", {
                        valores: retorno.dados
                    });
                    $(jan).find(".area_lista").find(".container_lista").css("position", "relative");
                    $(jan).find("form").data("dadosoriginais", JSON.stringify($(jan).find("form").json()));

                    if (opcoes.mostraRegistro) {
                        // Consulta o registro selecionado e mostra a área de dados
                        $(jan).children(".area_lista").find("tr:gt(1)").click(function() {
                            // Habilita botão que mostra a lista, o botão de salvamento e o de remoção de registro
                            $(jan).children(".area_menus").children("#_btn_listar").removeAttr("disabled");
                            $(jan).children(".area_menus").children("#_btn_salvar").removeAttr("disabled");
                            $(jan).children(".area_menus").children("#_btn_apagar").removeAttr("disabled");

                            // Mostra a área de dados
                            $(jan).children(".area_lista").animate({
                                height: 0
                            }, 500);

                            // Verifica se é um formulário dinâmico e consulta o registro selecionado
                            var parametros = (($(jan).find("form").attr("action") == "dinamicos") ? $(jan).find("form").data("form_id") + "/" + $(this).find('td[name="Id"]').text() : $(this).find('td[name="Id"]').text());

                            // var parametros = $(this).find('td[name="Id"]').text();
                            $().funcoes.ajaxSubmit({
                                servidor: "localhost",
                                porta: "3000",
                                metodo: "GET",
                                acao: $(jan).find("form").attr("action") + "/" + parametros,
                                callback: function(retorno) {
                                    // Verifica se houve erro no retorno e apresenta na tela
                                    if (!$().funcoes.verificaErro(retorno)) {
                                        $(jan).find("form").json(retorno.dados);
                                        $(jan).find("form").data("dadosoriginais", JSON.stringify($(jan).find("form").json()));

                                        // Executa comandos informados no parâmetro ao mostrar o registro selecionado
                                        opcoes.aomodoalterar(jan);
                                    }
                                }
                            });
                        });

                        if ($(jan).children(".area_lista").find("tbody").find("tr").length == 1) {
                            // Mostra o único registro retornado pela consulta
                            $(jan).children(".area_lista").find("tbody").find("tr").click();
                        } else {
                            // Aumenta a área que lista os registros e some com a área de dados
                            $($(jan).children(".area_lista")).animate({
                                height: "100%"
                            }, 500);
                        }
                    }
                }
            }
        });
    }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const aoconsultar = __webpack_require__(18)
const aolistar = __webpack_require__(0)
const aosalvar = __webpack_require__(21)
const aoapagar = __webpack_require__(17)
const aomodocriar = __webpack_require__(20)
const aomodoconsultar = __webpack_require__(19)

module.exports = function(jan, opcoes) {
    $(jan).on("click", "#_btn_modo_criar", function() {
        // Caso o registro tenha sido alterado, solicita a confirmação para ignorar as alterações
        if ($(jan).find("form").data("dadosoriginais") != JSON.stringify($(jan).find("form").json())) {
            $().mensagem({
                tipo: "Aviso",
                mensagem: "As informações foram alteradas, deseja ignorar as alterações?",
                largura: 400,
                altura: 150,
                ok: function() {
                    aomodocriar(jan, opcoes);
                },
                cancelar: function() {}
            })
        } else {
            aomodocriar(jan, opcoes);
        }
    });
    $(jan).on("click", "#_btn_modo_consultar", function() {
        // Caso o registro tenha sido alterado, solicita a confirmação para ignorar as alterações
        if ($(jan).find("form").data("dadosoriginais") != JSON.stringify($(jan).find("form").json())) {
            $().mensagem({
                tipo: "Aviso",
                mensagem: "As informações foram alteradas, deseja ignorar as alterações?",
                largura: 400,
                altura: 150,
                ok: function() {
                    aomodoconsultar(jan, opcoes);
                },
                cancelar: function() {}
            })
        } else {
            aomodoconsultar(jan, opcoes);
        }
    });
    $(jan).on("click", "#_btn_consultar", function() {
        aoconsultar(jan, opcoes);
    });
    $(jan).on("click", "#_btn_listar", function() {
        // Caso o registro tenha sido alterado, solicita a confirmação para ignorar as alterações
        if ($(jan).find("form").data("dadosoriginais") != JSON.stringify($(jan).find("form").json())) {
            $().mensagem({
                tipo: "Aviso",
                mensagem: "As informações foram alteradas, deseja ignorar as alterações?",
                largura: 400,
                altura: 150,
                ok: function() {
                    aolistar(jan, opcoes);
                },
                cancelar: function() {}
            })
        } else {
            aolistar(jan, opcoes);
        }
    });
    $(jan).on("click", "#_btn_salvar", function() {
        aosalvar(jan, opcoes);
    });
    $(jan).on("click", "#_btn_apagar", function() {
        // Solicita confirmação para a remoção do registro
        $().mensagem({
            tipo: "Aviso",
            mensagem: "Confirma a remoção deste registro?",
            ok: function() {
                aoapagar(jan, opcoes);
            },
            cancelar: function() {}
        })
    });
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(idJanela, opcoes) {
    //Cria a área de trabalho principal
    var jan = $("<div/>", {
        id: idJanela,
        title: opcoes.titulo
    }).css("overflow", "hidden");

    // Cria os botões de controle dos dados
    var barra = $("<nav/>", {
        class: "area_menus ui-corner-all"
    });
    $("<button/>", {
        type: "button",
        class: "btn ui-corner-all",
        id: "_btn_modo_criar",
        title: "Colocar a janela em modo de criação de registros"
    }).append($("<div/>")).appendTo(barra);
    $("<button/>", {
        type: "button",
        class: "btn ui-corner-all",
        id: "_btn_modo_consultar",
        disabled: true,
        title: "Colocar a janela em modo de consulta de registros"
    }).append($("<div/>")).appendTo(barra);
    $("<button/>", {
        type: "button",
        class: "btn ui-corner-all",
        id: "_btn_consultar",
        title: "Consultar registros na base de dados conforme o critério informados nos campos"
    }).append($("<div/>")).appendTo(barra);
    $("<button/>", {
        type: "button",
        class: "btn ui-corner-all",
        id: "_btn_listar",
        disabled: true,
        title: "Mostrar relação de registros retornados na consulta a base de dados"
    }).append($("<div/>")).appendTo(barra);
    $("<button/>", {
        type: "button",
        class: "btn ui-corner-all",
        id: "_btn_salvar",
        disabled: true,
        title: "Salvar informações do registro na base de dados"
    }).append($("<div/>")).appendTo(barra);
    $("<button/>", {
        type: "button",
        class: "btn ui-corner-all",
        id: "_btn_apagar",
        disabled: true,
        title: "Apagar o registro na base de dados"
    }).append($("<div/>")).appendTo(barra);
    $(barra).appendTo(jan);

    // Torna invisivel a div de comandos caso opcoes.conroles for false
    if (opcoes.controles) {
        $(barra).css("display", "block");
    } else {
        $(barra).css("display", "none");
    }

    // Cria áreas para listar os registros consultados
    $("<section class='area_lista'>").appendTo(jan);

    return $(jan);
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(parametros) {
    var defaults = {
        janela: "",
        html: "",
        servidor: "localhost",
        porta: "8080",
        cssJanela: "http://[servidor]:[porta]/css/[janela].css",
        jsJanela: "http://[servidor]:[porta]/js/[janela].js",
        htmlJanela: "http://[servidor]:[porta]/htm/[janela].html",
        horizontal: "center",
        vertical: "center",
        largura: 195,
        altura: 195,
        minLargura: 32,
        minAltura: 40,
        titulo: "Identificação do Usuário",
        redimensiona: false,
        move: true,
        desabilita: true,
        minimiza: true,
        maximiza: true,
        fecha: true,
        controles: true,
        mostraRegistro: true,
        aoiniciar: function(jan) {},
        aoabrir: function(jan) {},
        aofechar: function(jan) {},
        aominimizar: function(jan) {},
        aomaximizar: function(jan) {},
        aonormalizar: function(jan) {},
        aomodocriar: function(jan) {},
        aomodoconsultar: function(jan) {},
        aoconsultar: function(jan) {},
        aolistar: function(jan) {},
        aomodoalterar: function(jan) {},
        aosalvar: function(jan) {},
        aoapagar: function(jan) {},
    };

    var opcoes = $.extend({}, defaults, parametros);

    $.each(opcoes, function(key, value) {
        if (typeof(value) == "string") {
            value = value.replace("[servidor]", opcoes.servidor);
            value = value.replace("[porta]", opcoes.porta);
            value = value.replace("[janela]", opcoes.janela);
            opcoes[key] = value;
        }
    });

    return opcoes;
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(opcoes) {
    var jan = $(this);
    if ($(jan).find("form").attr("action") != undefined && $(jan).find("form").attr("action") != "") {
        var metodo = ($(jan).children(".area_menus").children("#_btn_listar").attr("disabled") == "disabled" ? "POST" : "PUT");
        var idForm = (($(jan).find("form").attr("action") == "dinamicos") ? $(jan).find("form").data("form_id") : "")
        var parametros = $(jan).find("form").json();
        $().funcoes.ajaxSubmit({
            servidor: "localhost",
            porta: "3000",
            metodo: metodo,
            acao: $(jan).find("form").attr("action") + (idForm == "" ? "" : "/" + idForm) + (metodo == "POST" ? "" : "/" + parametros.Id),
            dados: JSON.stringify(parametros),
            callback: function(retorno) {
                // Verifica se houve erro no retorno e apresenta na tela
                if (!$().funcoes.verificaErro(retorno)) {
                    // Atualiza dados no formulário
                    $(jan).find("form").json(retorno.dados);
                    $(jan).find("form").data("dadosoriginais", JSON.stringify($(jan).find("form").json()));

                    // Marcar registro como alterado
                    $(jan).children(".area_lista").find(".selecionado").each(function(index) {
                        if ($(this).find("td[name=Id]").html() == parametros.Id) {
                            $(this).addClass("alterado");
                        }
                    });

                    // Executa comandos informados no parâmetro ao entrar no modo de criação ou alteração de registros
                    if (metodo == "POST")
                        opcoes.aomodocriar(jan);
                    else
                        opcoes.aomodoalterar(jan);
                }
            }
        });
    }
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Define a globalização que o AMIGO vai usar
const Gbl = $().funcoes.globalize("pt")

module.exports = function(json) {
    var retorno = false;
    if (json) {
        $(this).find("input:text,input:password,input:hidden,input:checkbox,select,textarea,table,figure").each(function() {
            if ($(this).attr("name") && json[$(this).attr("name")] != undefined) {
                if ($(this).is("input") && !$(this).is("input:checkbox")) {
                    var valor = json[$(this).attr("name")];
                    if (valor != "") {
                        switch ($(this).data("tipo")) {
                            case "datahora":
                                valor = Gbl.formatDate(new Date(valor), {
                                    skeleton: "yMd Hms"
                                })
                                break;
                            case "data":
                                valor = Gbl.formatDate(new Date(valor), {
                                    date: "short"
                                })
                                break;
                            case "hora":
                                valor = Gbl.formatDate(new Date(valor), {
                                    time: "medium"
                                })
                                break;
                            case "inteiro":
                                valor = Gbl.formatNumber(Number(valor));
                                break
                            case "decimal":
                                valor = Gbl.formatNumber(Number(valor), {
                                    minimumFractionDigits: Number($(this).data("decimais"))
                                });
                                break
                        }
                    }
                    $(this).val(valor);
                }
                if ($(this).is("input:checkbox")) {
                    if (json[$(this).attr("name")] != false && json[$(this).attr("name")] != "false")
                        $(this).prop('checked', true);
                    else
                        $(this).prop('checked', false);
                }
                if ($(this).is("select")) {
                    if ($(this).data("idmenu") == undefined) {
                        $(this).val(json[$(this).attr("name")].valor);
                    } else {
                        $(this).html("<option value='" + json[$(this).attr("name")].valor + "' selected>" + json[$(this).attr("name")].descricao + "</option>");
                    }
                }
                if ($(this).is("textarea")) {
                    $(this).val(json[$(this).attr("name")]);
                }
                if ($(this).is("table")) {
                    $(this).tipagem("lista", {
                        valores: json[$(this).attr("name")]
                    });
                }
                if ($(this).is("figure")) {
                    $(this).tipagem("imagem", {
                        imagem: "http://localhost:3000/images/" + json[$(this).attr("name")]
                    });
                }
            }
        });
        retorno = $(this);
    } else {
        retorno = {};
        $(this).find("input:text,input:password,input:hidden,input:checkbox,select,textarea,table,figure").each(function() {
            if ($(this).attr("name")) {
                if ($(this).is("input") && !$(this).is("input:checkbox")) {
                    var valor = $(this).val();
                    var valoraux = "";
                    var op = "";
                    if (valor.indexOf("=") == 1) {
                        op = valor.substr(0, 2);
                        valoraux = valor.substr(2);
                    } else if (valor.substr(0, 1) == ">" || valor.substr(0, 1) == "<" || valor.substr(0, 1) == "=") {
                        op = valor.substr(0, 1);
                        valoraux = valor.substr(1)
                    } else {
                        valoraux = valor;
                    }
                    try {
                        switch ($(this).data("tipo")) {
                            case "datahora":
                                var formato = {
                                    skeleton: "yMd Hms"
                                };
                                var valordata = Gbl.parseDate(valoraux, formato).toISOString();
                                valor = valor.replace(valoraux, valordata);
                                break;
                            case "data":
                                var formato = {
                                    date: "short"
                                };
                                var valordata = Gbl.parseDate(valoraux, formato).toISOString();
                                valor = valor.replace(valoraux, valordata);
                                break;
                            case "hora":
                                var formato = {
                                    time: "medium"
                                };
                                var valordata = Gbl.parseDate(valoraux, formato).toISOString();
                                valor = valor.replace(valoraux, valordata);
                                break;
                            case "inteiro":
                                if (valoraux.length > 0)
                                    valor = valor.replace(valoraux, Gbl.parseNumber(valoraux));
                                break
                            case "decimal":
                                if (valoraux.length > 0)
                                    valor = valor.replace(valoraux, Gbl.parseNumber(valoraux, {
                                        minimumFractionDigits: Number($(this).data("decimais"))
                                    }));
                                break
                        }
                    } catch (e) {
                        valor = $(this).val();
                    }
                    retorno[$(this).attr("name")] = valor;
                }
                if ($(this).is("input:checkbox")) {
                    retorno[$(this).attr("name")] = $(this).is(":checked");
                }
                if ($(this).is("select")) {
                    var reg = {
                        valor: $(this).val(),
                        descricao: $(this).find('option:selected').text()
                    };
                    retorno[$(this).attr("name")] = reg;
                }
                if ($(this).is("textarea")) {
                    retorno[$(this).attr("name")] = $(this).val();
                }
                if ($(this).is("table")) {
                    var registros = [];
                    $(this).children("tbody").find("tr").each(function(index) {
                        var reg = {};
                        $(this).find("td").each(function(index) {
                            if ($(this).html() != "") {
                                if ($(this).children(":first-child").is("input:checkbox")) {
                                    reg[$(this).attr("name")] = $(this).children("input:checkbox").is(":checked");
                                } else {
                                    reg[$(this).attr("name")] = $(this).html();
                                }
                            }
                        });
                        registros.push(reg);
                    });
                    retorno[$(this).attr("name")] = registros;
                }
                if ($(this).is("figure")) {
                    var url = $(this).find("img").attr("src")
                    var nome = url.split("/")[url.split("/").length - 1]
                    retorno[$(this).attr("name")] = nome;
                }
            }
        });
    }
    return retorno;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// carga dos CSS do plugin
__webpack_require__(2)

(function($) {

    $.fn.abreJanela = __webpack_require__(1)

})(jQuery);


/***/ })
/******/ ]);
//# sourceMappingURL=amigo-janela.js.map
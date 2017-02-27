'use strict'

require("./css/janela.css")

const $ = require('jquery')
require('jquery-ui')

const montaJanela = require('./src/montaJanela')
const preparaOpcoes = require('./src/preparaOpcoes')
const botoesControle = require('./src/botoesControle')
const execControles = require('./src/execControles')
const aoabrir = require('./src/aoabrir')

$.fn.json = require('amigo-json')
$.fn.consultar = require('./src/consultar')
$.fn.salvar = require('./src/salvar')
$.fn.apagar = require('./src/apagar')

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

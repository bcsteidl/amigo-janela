'use strict'

const $ = require('jquery')

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

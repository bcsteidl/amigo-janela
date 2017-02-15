'use strict'

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

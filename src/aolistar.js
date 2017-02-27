'use strict'

const $ = require('jquery')

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

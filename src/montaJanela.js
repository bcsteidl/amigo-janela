'use strict'

const $ = require('jquery')

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

'use strict'

$.fn.condicao = require('./condicao.js')

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

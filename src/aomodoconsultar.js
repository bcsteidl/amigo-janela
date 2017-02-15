'use strict'

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

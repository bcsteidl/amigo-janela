'use strict'

const aolistar = require('./aolistar')

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

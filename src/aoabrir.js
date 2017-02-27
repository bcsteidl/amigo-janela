'use strict'

const $ = require('jquery')
$.fn.tipagem = require('amigo-validacao');

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

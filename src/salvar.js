'use strict'

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

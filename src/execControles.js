'use strict'

const $ = require('jquery')
const mensagem = require('amigo-mensagem')
const aoconsultar = require('./aoconsultar')
const aolistar = require('./aolistar')
const aosalvar = require('./aosalvar')
const aoapagar = require('./aoapagar')
const aomodocriar = require('./aomodocriar')
const aomodoconsultar = require('./aomodoconsultar')

module.exports = function(jan, opcoes) {
    $(jan).on("click", "#_btn_modo_criar", function() {
        // Caso o registro tenha sido alterado, solicita a confirmação para ignorar as alterações
        if ($(jan).find("form").data("dadosoriginais") != JSON.stringify($(jan).find("form").json())) {
            mensagem({
                tipo: "Aviso",
                mensagem: "As informações foram alteradas, deseja ignorar as alterações?",
                largura: 400,
                altura: 150,
                ok: function() {
                    aomodocriar(jan, opcoes);
                },
                cancelar: function() {}
            })
        } else {
            aomodocriar(jan, opcoes);
        }
    });
    $(jan).on("click", "#_btn_modo_consultar", function() {
        // Caso o registro tenha sido alterado, solicita a confirmação para ignorar as alterações
        if ($(jan).find("form").data("dadosoriginais") != JSON.stringify($(jan).find("form").json())) {
            mensagem({
                tipo: "Aviso",
                mensagem: "As informações foram alteradas, deseja ignorar as alterações?",
                largura: 400,
                altura: 150,
                ok: function() {
                    aomodoconsultar(jan, opcoes);
                },
                cancelar: function() {}
            })
        } else {
            aomodoconsultar(jan, opcoes);
        }
    });
    $(jan).on("click", "#_btn_consultar", function() {
        aoconsultar(jan, opcoes);
    });
    $(jan).on("click", "#_btn_listar", function() {
        // Caso o registro tenha sido alterado, solicita a confirmação para ignorar as alterações
        if ($(jan).find("form").data("dadosoriginais") != JSON.stringify($(jan).find("form").json())) {
            mensagem({
                tipo: "Aviso",
                mensagem: "As informações foram alteradas, deseja ignorar as alterações?",
                largura: 400,
                altura: 150,
                ok: function() {
                    aolistar(jan, opcoes);
                },
                cancelar: function() {}
            })
        } else {
            aolistar(jan, opcoes);
        }
    });
    $(jan).on("click", "#_btn_salvar", function() {
        aosalvar(jan, opcoes);
    });
    $(jan).on("click", "#_btn_apagar", function() {
        // Solicita confirmação para a remoção do registro
        mensagem({
            tipo: "Aviso",
            mensagem: "Confirma a remoção deste registro?",
            ok: function() {
                aoapagar(jan, opcoes);
            },
            cancelar: function() {}
        })
    });
}

'use strict'

const $ = require('jquery')

module.exports = function(jan, opcoes) {

    // Executa comandos informados no parâmetro ao salvar registros
    var executa = opcoes.aosalvar(jan);

    // Grava as informações do registro
    if (executa != false) {
        $(jan).salvar(opcoes);
    }
}

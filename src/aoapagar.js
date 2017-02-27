'use strict'

const $ = require('jquery')

module.exports = function(jan, opcoes) {

    // Executa comandos informados no parâmetro ao apagar registros
    var executa = opcoes.aoapagar(jan);

    // Remove o registro do servidor
    if (executa != false) {
        $(jan).apagar(opcoes);
    }
}

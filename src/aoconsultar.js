'use strict'

const $ = require('jquery')

module.exports = function(jan, opcoes) {

    // Executa comandos informados no parâmetro ao consultar registros
    var executa = opcoes.aoconsultar(jan);

    // Consulta os registros no servidor conforme o critério de seleção informado no formulário
    if (executa != false) {
        $(jan).consultar(opcoes);
    }
}

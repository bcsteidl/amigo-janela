'use strict'

const $ = require('jquery')

const abreJanela = require('..')

abreJanela({
    janela: "janelaHTML",
    htmlJanela: "./janelaHTML.html",
    horizontal: 10,
    vertical: 10,
    largura: 750,
    altura: 430,
    titulo: "Janela e manutenção de testes",
    redimensiona: true,
    move: true,
    desabilita: false,
    aoabrir: function(jan) {
        console.log("Executa logo após abrir a janela")
    },
    aomodocriar: function(jan) {
        console.log("Executa após entrar em modo de criação de registros")
    },
    aomodoconsultar: function(jan) {
        console.log("Executa após entrar em modo de consulta de registros")
    },
    aolistar: function(jan) {
        console.log("Executa antes de listar os registros consultados")
    },
    aoconsultar: function(jan) {
        console.log("Executa antes de consultar os registros")
    },
    aosalvar: function(jan) {
        console.log("Executa antes de salvar o registro")
    },
    aoapagar: function(jan) {
        console.log("Executa antes de apagar o registro")
    }
});

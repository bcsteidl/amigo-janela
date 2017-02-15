'use strict'

module.exports = function() {
    var retorno = "";
    $(this).find("input:text,input:password,input:hidden,input:checkbox,select,textarea").each(function() {
        if ($(this).attr("name") && $(this).val() != "") {
            switch ($(this).data("tipo").toLowerCase()) {
                case "inteiro":
                    retorno += $(this).attr("name") + " = " + $(this).val() + " and ";
                    break;
                case "caracter":
                    retorno += $(this).attr("name") + " = '" + $(this).val() + "' and ";
                    break;
                case "senha":
                    break;
                case "menu":
                    if ($(this).val() > 0)
                        retorno += $(this).attr("name") + " = " + $(this).val() + " and ";
                    break;
                case "decimal":
                    retorno += $(this).attr("name") + " = " + $(this).val().replace(".", "").replace(",", ".") + " and ";
                    break;
                case "booleano":
                    if ($(this).is(":checked"))
                        retorno += $(this).attr("name") + " = " + $(this).is(":checked") + " and ";
                    break;
                case "data":
                    retorno += $(this).attr("name") + " = + STR_TO_DATE('" + $(this).val() + "', '%d/%m/%Y') and ";
                    break;
                case "hora":
                    retorno += $(this).attr("name") + " = + STR_TO_DATE('" + $(this).val() + "', '%H:%i:%s') and ";
                    break;
                case "datahora":
                    retorno += $(this).attr("name") + " = STR_TO_DATE('" + $(this).val() + "', '%d/%m/%Y %H:%i:%s') and ";
                    break;
            }
        }
    });
    retorno = retorno.substr(0, (retorno.length - 5));

    return retorno;
}

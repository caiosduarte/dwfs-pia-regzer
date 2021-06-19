"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumJoinedValues = exports.enumValues = exports.ETHNICITY = exports.CIVIL_STATUS = exports.GENDER = exports.ALL_PERSON_TYPES = exports.PERSON_TYPES = void 0;
var PERSON_TYPES;
(function (PERSON_TYPES) {
    PERSON_TYPES["FISICA"] = "F";
    PERSON_TYPES["JURIDICA"] = "J";
})(PERSON_TYPES = exports.PERSON_TYPES || (exports.PERSON_TYPES = {}));
var ALL_PERSON_TYPES;
(function (ALL_PERSON_TYPES) {
    ALL_PERSON_TYPES["FISICA"] = "F";
    ALL_PERSON_TYPES["JURIDICA"] = "J";
    ALL_PERSON_TYPES["ORGAO_PUBLICO"] = "O";
    ALL_PERSON_TYPES["AUTORIDADE"] = "A";
})(ALL_PERSON_TYPES = exports.ALL_PERSON_TYPES || (exports.ALL_PERSON_TYPES = {}));
var GENDER;
(function (GENDER) {
    GENDER["MASCULINO"] = "M";
    GENDER["FEMININO"] = "F";
})(GENDER = exports.GENDER || (exports.GENDER = {}));
var CIVIL_STATUS;
(function (CIVIL_STATUS) {
    CIVIL_STATUS["SOTEIRO"] = "SOLTEIRO";
    CIVIL_STATUS["UNI\u00C3O_ESTAVEL"] = "UNI\u00C3O EST\u00C1VEL";
    CIVIL_STATUS["CASADO"] = "CASADO";
    CIVIL_STATUS["SEPARADO"] = "SEPARADO";
    CIVIL_STATUS["DIVORCIADO"] = "DIVORCIADO";
    CIVIL_STATUS["VIUVO"] = "VI\u00DAVO";
})(CIVIL_STATUS = exports.CIVIL_STATUS || (exports.CIVIL_STATUS = {}));
var ETHNICITY;
(function (ETHNICITY) {
    ETHNICITY["AFRODESCENDENTE"] = "AFRODESCENDENTE";
    ETHNICITY["BRANCO"] = "BRANCO";
    ETHNICITY["ASIATICO"] = "ASI\u00C1TICO";
    ETHNICITY["AMERINDIO"] = "AMER\u00CDNDIO";
    ETHNICITY["MULATO"] = "MULATO";
    ETHNICITY["MULTIRRACIAL_PARDO"] = "MULTIRRACIAL/PARDO";
    ETHNICITY["NAO_DECLARADA"] = "N\u00C3O DECLARADA";
})(ETHNICITY = exports.ETHNICITY || (exports.ETHNICITY = {}));
var enumValues = function (entireEnum) {
    return Object.values(entireEnum);
};
exports.enumValues = enumValues;
var enumJoinedValues = function (entireEnum) {
    var values = exports.enumValues(entireEnum);
    return values.reduce(function (result, current, index) {
        return (result += (index != 0 ? "," : "") + ("'" + current + "'"));
    }, "");
};
exports.enumJoinedValues = enumJoinedValues;

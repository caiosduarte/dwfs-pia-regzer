export enum PERSON_TYPES {
    FISICA = "F",
    JURIDICA = "J",
}

export enum ALL_PERSON_TYPES {
    FISICA = "F",
    JURIDICA = "J",
    ORGAO_PUBLICO = "O",
    AUTORIDADE = "A",
}

export enum GENDER {
    MASCULINO = "M",
    FEMININO = "F",
    OUTRO = "O",
}

export enum CIVIL_STATUS {
    SOTEIRO = "SOLTEIRO",
    UNIÃO_ESTAVEL = "UNIÃO ESTÁVEL",
    CASADO = "CASADO",
    SEPARADO = "SEPARADO",
    DIVORCIADO = "DIVORCIADO",
    VIUVO = "VIÚVO",
}

export enum ETHNICITY {
    AFRODESCENDENTE = "AFRODESCENDENTE",
    BRANCO = "BRANCO",
    ASIATICO = "ASIÁTICO",
    AMERINDIO = "AMERÍNDIO",
    MULATO = "MULATO",
    MULTIRRACIAL_PARDO = "MULTIRRACIAL/PARDO",
    NAO_DECLARADA = "NÃO DECLARADA",
}

type ENUM =
    | typeof PERSON_TYPES
    | typeof GENDER
    | typeof ETHNICITY
    | typeof CIVIL_STATUS
    | typeof ALL_PERSON_TYPES;

export const enumValues = (entireEnum: ENUM): string[] => {
    return Object.values(entireEnum);
};

export const enumJoinedValues = (entireEnum: ENUM): string => {
    const values = enumValues(entireEnum);
    return values.reduce(
        (result, current, index) =>
            (result += (index != 0 ? "," : "") + `'${current}'`),
        ""
    );
};

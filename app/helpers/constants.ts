export const SELECT_MARCA_OPTIONS = [
    { label: "Toyota", value: "TOY" },
    { label: "Honda", value: "HON" },
    { label: "Ford", value: "FOR" },
    { label: "Chevrolet", value: "CHE" },
    { label: "Nissan", value: "NIS" },
];

export const SELECT_MODELO_OPTIONS = [
    { label: "Corolla", value: "corolla", code: "TOY" },
    { label: "Civic", value: "civic", code: "HON" },
    { label: "Focus", value: "focus", code: "FOR" },
    { label: "Cruze", value: "cruze", code: "CHE" },
    { label: "Sentra", value: "sentra", code: "NIS" },
    { label: "Camry", value: "camry", code: "TOY" },
    { label: "Accord", value: "accord", code: "HON" },
    { label: "Mustang", value: "mustang", code: "FOR" },
    { label: "Malibu", value: "malibu", code: "CHE" },
    { label: "Altima", value: "altima", code: "NIS" },
    { label: "RAV4", value: "rav4", code: "TOY" },
    { label: "CR-V", value: "cr-v", code: "HON" },
    { label: "Explorer", value: "explorer", code: "FOR" },
    { label: "Equinox", value: "equinox", code: "CHE" },
    { label: "Rogue", value: "rogue", code: "NIS" },
    { label: "Hilux", value: "hilux", code: "TOY" },
];

export const SELECT_TIPO_IDENTIFICACION_OPTIONS = [
    { label: "Cédula", value: "CI" },
    { label: "RUC", value: "RUC" },
    { label: "Pasaporte", value: "PAS" },
];

export const SELECT_CIVIL_STATUS_OPTIONS = [
    { label: "Soltero", value: "S" },
    { label: "Casado", value: "C" },
    { label: "Divorciado", value: "D" },
    { label: "Viudo", value: "V" },
];

export const SELECT_GENDER_OPTIONS = [
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" }
];

export const LAST_YEAR = 12

export const SELECT_YEAR_OPTIONS = Array.from({ length: LAST_YEAR }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
});
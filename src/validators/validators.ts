export default {
    notEmptyRules: [value => (!!value || value?.length > 0) || 'Não pode ficar em branco.'],
    notEmptySelect: [(v) => v.length > 0 || "Selecione ao menos um"],
}

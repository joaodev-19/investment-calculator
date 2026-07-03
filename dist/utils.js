const currencyLocaleMap = {
    USD: "en-US",
    BRL: "pt-BR",
    EUR: "de-DE",
};
export function formatCurrency(value, currency = "USD") {
    return new Intl.NumberFormat(currencyLocaleMap[currency], {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
//# sourceMappingURL=utils.js.map
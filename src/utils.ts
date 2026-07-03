import type { CurrencyCode } from "./types.js";

const currencyLocaleMap: Record<CurrencyCode, string> = {
  USD: "en-US",
  BRL: "pt-BR",
  EUR: "de-DE",
};

export function formatCurrency(
  value: number,
  currency: CurrencyCode = "USD"
): string {
  return new Intl.NumberFormat(currencyLocaleMap[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
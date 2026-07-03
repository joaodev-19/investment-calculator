import type { InvestmentResult, MonthlyInvestmentResult, ValidationError } from "./types.js";
import type { CurrencyCode } from "./types.js";
export declare function renderErrors(container: HTMLElement, errors: ValidationError[]): void;
export declare function renderResultTable(container: HTMLElement, results: MonthlyInvestmentResult[], type: CurrencyCode): void;
export declare function renderSummary(type: CurrencyCode, resultsSection: HTMLElement, totalInvestedEl: HTMLElement, totalInterestEl: HTMLElement, finalAmountEl: HTMLElement, data: InvestmentResult): void;
export declare function clearSummary(resultsSection: HTMLElement, totalInvestedEl: HTMLElement, totalInterestEl: HTMLElement, finalAmountEl: HTMLElement): void;
export declare function clearErrors(errorsContainer: HTMLElement): void;
export declare function clearTable(container: HTMLElement): void;
//# sourceMappingURL=dom.d.ts.map
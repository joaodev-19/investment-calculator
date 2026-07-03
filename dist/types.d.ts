export interface InvestmentFormData {
    initialAmount: number;
    monthlyContribution: number;
    monthlyRate: number;
    months: number;
}
export interface MonthlyInvestmentResult {
    month: number;
    investedAmount: number;
    interestAmount: number;
    balance: number;
}
export interface InvestmentResult {
    totalInvested: number;
    totalInterest: number;
    finalAmount: number;
    months: MonthlyInvestmentResult[];
}
export interface ValidationError {
    field: string;
    message: string;
}
export type CurrencyCode = "USD" | "BRL" | "EUR";
//# sourceMappingURL=types.d.ts.map
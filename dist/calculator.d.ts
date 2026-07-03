import type { InvestmentFormData, InvestmentResult, ValidationError } from './types.js';
export declare function validateInvestmentData(data: InvestmentFormData): ValidationError[];
export declare function getInvestmentFormData(e: Event, form: HTMLFormElement): InvestmentFormData;
export declare function calculateInvestment(data: InvestmentFormData): InvestmentResult;
//# sourceMappingURL=calculator.d.ts.map
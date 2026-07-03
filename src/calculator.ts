import type { InvestmentFormData, InvestmentResult, MonthlyInvestmentResult, ValidationError } from './types.js';

export function validateInvestmentData(data: InvestmentFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (Number.isNaN(data.initialAmount)) {
    errors.push({
      field: "Initial Amount",
      message: "Initial amount must be a valid number.",
    });
  }

  if (Number.isNaN(data.monthlyContribution)) {
    errors.push({
      field: "Monthly Contribution",
      message: "Monthly contribution must be a valid number.",
    });
  }

  if (Number.isNaN(data.monthlyRate)) {
    errors.push({
      field: "Monthly Rate",
      message: "Monthly rate must be a valid number.",
    });
  }

  if (Number.isNaN(data.months)) {
    errors.push({
      field: "Months",
      message: "Months must be a valid number.",
    });
  }

  if (data.initialAmount < 0) {
    errors.push({
      field: "Initial Amount",
      message: "Initial amount cannot be negative.",
    });
  }

  if (data.monthlyContribution < 0) {
    errors.push({
      field: "Monthly Contribution",
      message: "Monthly contribution cannot be negative.",
    });
  }

  if (data.monthlyRate < 0) {
    errors.push({
      field: "Monthly Rate",
      message: "Monthly rate cannot be negative.",
    });
  }

  if (data.months <= 0) {
    errors.push({
      field: "Months",
      message: "Months must be greater than 0.",
    });
  }

  return errors;
}

export function getInvestmentFormData(e: Event, form: HTMLFormElement): InvestmentFormData {
    e.preventDefault();

    if (!form) throw new Error("No form element received.");

    const formData = new FormData(form);
    
    let initialAmount = Number(formData.get('initialAmount'));
    let monthlyContribution = Number(formData.get('monthlyContribution'));
    let monthlyRate = Number(formData.get('monthlyRate'));
    let months = Number(formData.get('months'));

    return {
        initialAmount,
        monthlyContribution,
        monthlyRate,
        months,
    };
}

export function calculateInvestment(data: InvestmentFormData): InvestmentResult {
    const monthlyResults: MonthlyInvestmentResult[] = [];

    const monthlyRate = data.monthlyRate / 100;
    
    let currentBalance = data.initialAmount;

    for(let month = 1; month <= data.months; month++){
        const investedAmount = data.initialAmount + data.monthlyContribution * month

        const balanceBeforeInterest = currentBalance + data.monthlyContribution;

        const monthlyInterest = balanceBeforeInterest * monthlyRate;

        const balance = balanceBeforeInterest + monthlyInterest;

        const totalInterest = balance - investedAmount;

        monthlyResults.push({
            month,
            investedAmount,
            interestAmount: totalInterest,
            balance,
        });

        currentBalance = balance;
    }

    const totalInvested = data.initialAmount + data.monthlyContribution * data.months;
    const finalAmount = currentBalance;
    const totalInterest = finalAmount - totalInvested;

    return {
        totalInvested,
        totalInterest,
        finalAmount,
        months: monthlyResults,
    };
}
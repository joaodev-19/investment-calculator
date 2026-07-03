import {
    validateInvestmentData,
    getInvestmentFormData,
    calculateInvestment,
} from './calculator.js';

import {
    renderErrors,
    renderResultTable,
    renderSummary,
    clearSummary,
    clearTable,
    clearErrors,
} from './dom.js';

import type {
    InvestmentFormData,
    MonthlyInvestmentResult,
    InvestmentResult,
    ValidationError,
    CurrencyCode,
} from './types.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        appWrapper: document.getElementById("app-wrapper") as HTMLElement,

        investmentForm: document.getElementById('investment-form') as HTMLFormElement,

        initialAmountEl: document.getElementById('initial-amount') as HTMLInputElement,
        monthlyContributionEl: document.getElementById('monthly-contribution') as HTMLInputElement,
        monthlyRateEl: document.getElementById('monthly-rate') as HTMLInputElement,
        monthsEl: document.getElementById('months') as HTMLInputElement,
        selectCurrencyFormatEl: document.getElementById('selectCurrencyFormat') as HTMLSelectElement,

        errorsContainer: document.getElementById('errors-container') as HTMLDivElement,

        resultsSection: document.getElementById('results-section') as HTMLElement,
        totalInvestedEl: document.getElementById('total-invested') as HTMLElement,
        totalInterestEl: document.getElementById('total-interest') as HTMLElement,
        finalAmountEl: document.getElementById('final-amount') as HTMLElement,
        monthlyResultsBody: document.getElementById('monthly-results-body') as HTMLTableSectionElement,
        
        clearBtn: document.getElementById('clear-button') as HTMLButtonElement,
    };

    elements.investmentForm?.addEventListener('submit', (e) => {
        const data = getInvestmentFormData(e, elements.investmentForm);
        const errors = validateInvestmentData(data);

        const currencyType: CurrencyCode = elements.selectCurrencyFormatEl.value as CurrencyCode;

        if (errors.length > 0) {
            renderErrors(elements.errorsContainer, errors);

            elements.appWrapper.classList.remove("has-results");

            clearSummary(
                elements.resultsSection,
                elements.totalInvestedEl,
                elements.totalInterestEl,
                elements.finalAmountEl,
            );

            clearTable(elements.monthlyResultsBody);
            return;
        }

        const investmentData = calculateInvestment(data);

        elements.appWrapper.classList.add("has-results");

        renderSummary(
            currencyType, 
            elements.resultsSection,
            elements.totalInvestedEl,
            elements.totalInterestEl,
            elements.finalAmountEl,
            investmentData,
        );
        renderResultTable(elements.monthlyResultsBody, investmentData.months, currencyType);
    });

    elements.clearBtn?.addEventListener('click', () => {
        elements.appWrapper.classList.remove("has-results");

        clearErrors(elements.errorsContainer);

        clearSummary(
            elements.resultsSection,
            elements.totalInvestedEl,
            elements.totalInterestEl,
            elements.finalAmountEl,
        );

        clearTable(elements.monthlyResultsBody);
    });
});
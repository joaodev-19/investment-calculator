import { validateInvestmentData, getInvestmentFormData, calculateInvestment, } from './calculator.js';
import { renderErrors, renderResultTable, renderSummary, clearSummary, clearTable, clearErrors, } from './dom.js';
document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        appWrapper: document.getElementById("app-wrapper"),
        investmentForm: document.getElementById('investment-form'),
        initialAmountEl: document.getElementById('initial-amount'),
        monthlyContributionEl: document.getElementById('monthly-contribution'),
        monthlyRateEl: document.getElementById('monthly-rate'),
        monthsEl: document.getElementById('months'),
        selectCurrencyFormatEl: document.getElementById('selectCurrencyFormat'),
        errorsContainer: document.getElementById('errors-container'),
        resultsSection: document.getElementById('results-section'),
        totalInvestedEl: document.getElementById('total-invested'),
        totalInterestEl: document.getElementById('total-interest'),
        finalAmountEl: document.getElementById('final-amount'),
        monthlyResultsBody: document.getElementById('monthly-results-body'),
        clearBtn: document.getElementById('clear-button'),
    };
    elements.investmentForm?.addEventListener('submit', (e) => {
        const data = getInvestmentFormData(e, elements.investmentForm);
        const errors = validateInvestmentData(data);
        const currencyType = elements.selectCurrencyFormatEl.value;
        if (errors.length > 0) {
            renderErrors(elements.errorsContainer, errors);
            elements.appWrapper.classList.remove("has-results");
            clearSummary(elements.resultsSection, elements.totalInvestedEl, elements.totalInterestEl, elements.finalAmountEl);
            clearTable(elements.monthlyResultsBody);
            return;
        }
        const investmentData = calculateInvestment(data);
        elements.appWrapper.classList.add("has-results");
        renderSummary(currencyType, elements.resultsSection, elements.totalInvestedEl, elements.totalInterestEl, elements.finalAmountEl, investmentData);
        renderResultTable(elements.monthlyResultsBody, investmentData.months, currencyType);
    });
    elements.clearBtn?.addEventListener('click', () => {
        elements.appWrapper.classList.remove("has-results");
        clearErrors(elements.errorsContainer);
        clearSummary(elements.resultsSection, elements.totalInvestedEl, elements.totalInterestEl, elements.finalAmountEl);
        clearTable(elements.monthlyResultsBody);
    });
});
//# sourceMappingURL=main.js.map
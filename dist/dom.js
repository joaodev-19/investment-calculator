import { formatCurrency } from "./utils.js";
function createErrorEl(error) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert');
    errorDiv.classList.add('alert-danger');
    errorDiv.role = 'alert';
    const alertHeading = document.createElement('h4');
    alertHeading.classList.add('alert-heading');
    alertHeading.textContent = error.field;
    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-exclamation-triangle', 'me-2');
    const errorMessage = document.createElement('p');
    errorMessage.appendChild(icon);
    errorMessage.appendChild(document.createTextNode(`${error.message}`));
    errorDiv.appendChild(alertHeading);
    errorDiv.appendChild(errorMessage);
    return errorDiv;
}
export function renderErrors(container, errors) {
    container.innerHTML = '';
    container.classList.remove('d-none');
    errors.forEach(error => {
        container.appendChild(createErrorEl(error));
    });
}
function createResultTr(result, type) {
    if (!result) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="4">Nenhum investimento detectado</td>
        `;
        return row;
    }
    const row = document.createElement('tr');
    const tdMonth = document.createElement('td');
    tdMonth.textContent = String(result.month);
    const tdInvested = document.createElement('td');
    tdInvested.textContent = formatCurrency(result.investedAmount, type);
    const tdInterest = document.createElement('td');
    tdInterest.textContent = formatCurrency(result.interestAmount, type);
    const tdBalance = document.createElement('td');
    tdBalance.textContent = formatCurrency(result.balance, type);
    row.appendChild(tdMonth);
    row.appendChild(tdInvested);
    row.appendChild(tdInterest);
    row.appendChild(tdBalance);
    return row;
}
export function renderResultTable(container, results, type) {
    container.innerHTML = '';
    results.forEach(result => {
        container.appendChild(createResultTr(result, type));
    });
}
export function renderSummary(type, resultsSection, totalInvestedEl, totalInterestEl, finalAmountEl, data) {
    totalInvestedEl.textContent = formatCurrency(data.totalInvested, type);
    totalInterestEl.textContent = formatCurrency(data.totalInterest, type);
    finalAmountEl.textContent = formatCurrency(data.finalAmount, type);
    resultsSection.setAttribute("aria-hidden", "false");
}
export function clearSummary(resultsSection, totalInvestedEl, totalInterestEl, finalAmountEl) {
    totalInvestedEl.textContent = 'R$ 0,00';
    totalInterestEl.textContent = 'R$ 0,00';
    finalAmountEl.textContent = 'R$ 0,00';
    resultsSection.setAttribute("aria-hidden", "true");
}
export function clearErrors(errorsContainer) {
    errorsContainer.innerHTML = '';
}
export function clearTable(container) {
    container.innerHTML = '';
}
//# sourceMappingURL=dom.js.map
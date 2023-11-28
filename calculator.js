window.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById("calc-form");
    if (form) {
        setupIntialValues();
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            update();
        });
    }
});

function getCurrentUIValues() {
    return {
        total: +(document.getElementById("loan-total").value),
        years: +(document.getElementById("loan-years").value),
        rate: +(document.getElementById("loan-rate").value),
    }
}
// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
    let values = { total: 100000, years: 20, rate: 5.5 };
    let totalUI = document.getElementById("loan-total");
    totalUI.value = values.total;
    let yearsUI = document.getElementById("loan-years");
    yearsUI.value = values.years;
    let rateUI = document.getElementById("loan-rate");
    rateUI.value = values.rate;
    update();
}
// Get the current values from the UI
// Update the monthly payment
function update() {
    let currentUIValues = getCurrentUIValues();
    updateMonthly(calculateMonthlyPayment(currentUIValues))
}
// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
    if (!values || typeof values.total != 'number') {
        return {
            monthlyPayment: 'N/A',
            totalPrincipalPaid: 'N/A',
            totalInterestPaid: 'N/A'
        };
    }
    let monthlyRate = (values.rate / 100) / 12;
    let n = Math.floor(values.years * 12);
    let monthlyPayment = (
        (monthlyRate * values.total) /
        (1 - Math.pow((1 + monthlyRate), -n))
    );
    let totalPayments = n;
    let totalAmountPaid = monthlyPayment * totalPayments;
    let totalInterestPaid = totalAmountPaid - values.total;
    return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPrincipalPaid: values.total.toFixed(2),
        totalInterestPaid: totalInterestPaid.toFixed(2)
    }
}
// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(paymentDetails) {
    let monthlyUI = document.getElementById("monthly-payment");
    monthlyUI.innerText = "$" + parseFloat(paymentDetails.monthlyPayment).toLocaleString('en-US', { maximumFractionDigits: 2 });

    let totalPrincipalUI = document.getElementById("total-principal");
    totalPrincipalUI.innerText = "Total Principal Paid: $" + parseFloat(paymentDetails.totalPrincipalPaid).toLocaleString('en-US', { maximumFractionDigits: 2 });

    let totalInterestUI = document.getElementById("total-interest");
    totalInterestUI.innerText = "Total Interest Paid: $" + parseFloat(paymentDetails.totalInterestPaid).toLocaleString('en-US', { maximumFractionDigits: 2 });
}

let budget = 0;

let expenses = [];

const budgetInput = document.getElementById("budget");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const budgetDisplay = document.getElementById("budgetDisplay");
const totalDisplay = document.getElementById("totalExpenses");
const balanceDisplay = document.getElementById("balance");
const expenseList = document.getElementById("expenseList");
const messageDisplay = document.getElementById("message");

// Set the budget
document.getElementById("setBudget").addEventListener("click", function () {
    budget = Number(budgetInput.value);

    if (budget <= 0 || budgetInput.value === "") {
        messageDisplay.textContent = "Please enter a valid budget.";
    } else {
        messageDisplay.textContent = "Budget successfully set!";
        updateDashboard();
    }
});

// Add a new expense
document.getElementById("addExpense").addEventListener("click", function () {
    const name = expenseNameInput.value.trim();
    const amount = Number(expenseAmountInput.value);

    if (name === "" || amount <= 0 || expenseAmountInput.value === "") {
        messageDisplay.textContent = "Please enter a valid expense.";
        return;
    }

    expenses.push({
        name: name,
        amount: amount
    });

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    messageDisplay.textContent = "Expense added successfully!";
    updateDashboard();
});

// Calculate total expenses using a loop
function calculateTotal() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// Update dashboard using DOM manipulation
function updateDashboard() {
    const total = calculateTotal();
    const balance = budget - total;

    budgetDisplay.textContent = budget.toFixed(2);
    totalDisplay.textContent = total.toFixed(2);
    balanceDisplay.textContent = balance.toFixed(2);

    expenseList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        const item = document.createElement("li");

        item.textContent =
            expenses[i].name + " - KSh " +
            expenses[i].amount.toFixed(2);

        expenseList.appendChild(item);
    }

    // Conditional budgeting feedback
    if (balance < 0) {
        messageDisplay.textContent = "Warning! You have exceeded your budget.";
    } else if (balance === 0) {
        messageDisplay.textContent = "You have used your entire budget.";
    } else {
        messageDisplay.textContent = "Good job! You are within your budget.";
    }
}

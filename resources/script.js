const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 },
// ];

// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// generate unique id of transaction
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add Transactions
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';



    }
}

// Add transactions to DOM List
function addTransactionDOM(transaction) {
    // get sign 
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // add class based on value 
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        <button class="delete-btn" onclick='removeTransaction(${transaction.id})'>
        X
        </button>
        <span class="custom-width">
        ${transaction.text} 
        </span>
        <span class="custom-width">
        ${sign}${Math.abs(transaction.amount)}
        </span>
    `;

    list.appendChild(item);
}

// update balance income and expense 
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    const expense = ((amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0).toFixed(2)) * -1);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

    // console.log(amounts);
    // console.log(total);
    // console.log(income);
    // console.log(expense);
}

// Remove transaction by ID 
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage();

    init();
}

// Update local storage 
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Init app functions
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();

// Interactive DOM 
form.addEventListener('submit', addTransaction);

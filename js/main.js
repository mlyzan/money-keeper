// Получить кнопку "Начать расчет" через id
let getBtnStart = document.getElementById('start');

// Получить все блоки в правой части программы через классы (которые имеют класс название-value,
//  начиная с <div class="budget-value"></div> и заканчивая <div class="yearsavings-value"></div>)
let budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0];

    // Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)
let expensesItem = document.getElementsByClassName('expenses-item');

//   Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной. 
let expensesItemBtn = document.getElementsByTagName('button')[0];
let optionalexpensesBtn = document.getElementsByTagName('button')[1];
let countBudgetBtn = document.getElementsByTagName('button')[2];

// Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
let optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item');
 
// Получить оставшиеся поля через querySelector (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
let chooseIncome = document.querySelector('.choose-income'),
    checksavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


var time, money;
getBtnStart.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD" , "2001-01-01");
     money = +prompt("Ваш бюджет на месяц?" , "");
while (isNaN(money) || money == '' || money == null) {
    money = prompt("Ваш бюджет?",'');
}
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    
    if (time != undefined && money!= undefined) {
        expensesItemBtn.addEventListener('click', function() {
            let sum = 0;
            for ( let i = 0; i < expensesItem.length; i++ ) {
                let a = expensesItem[i].value,
                    b = expensesItem[++i].value;
                if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
                    appData.expenses[a] = b;
                    sum += +b;
                    appData.suma = sum;
                } else {
                    i = i-1;
                }
            };
                expensesValue.textContent = sum;
            });
    } else {
        expensesItemBtn.setAttribute("disabled", "true");
    };

    if (time != undefined && money!= undefined) {
        countBudgetBtn.addEventListener('click', function() {
     
            if (appData.budget != undefined) {
                appData.moneyPerDay = ((appData.budget - +appData.suma) / 30).toFixed(2);
                daybudgetValue.textContent = appData.moneyPerDay; 
        
                if (appData.moneyPerDay < 100) {
                    levelValue.textContent = 'Минимальный уровень достатка';
                } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                    levelValue.textContent = 'Средний уровень достатка';
                } else if (appData.moneyPerDay > 2000) {
                    levelValue.textContent = 'Высокий уровень достатка';
                } else {
                    levelValue.textContent = 'Произошла ошибка';
                }
            } else {
                daybudgetValue.textContent = 'Произошла ошибка';
            }
        
        });
    } else {
        countBudgetBtn.setAttribute("disabled", "true");
    };

   
    if (time != undefined && money!= undefined) {
        optionalexpensesBtn.addEventListener('click', function() {
            for (let i = 0; i < optionalexpensesItem.length; i++) {
                let opt = optionalexpensesItem[i].value;
                appData.optionalExpenses[i] = opt;
                optionalexpensesValue.textContent += appData.optionalExpenses[i] + " ";
            }
        });
    } else {
        optionalexpensesBtn.setAttribute("disabled", "true");
    };


});


chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
        appData.income = items.split(', ');
        incomeValue.textContent = appData.income;
});

checksavings.addEventListener('click', function() {
    if(appData.savings == false) {
        appData.savings = true;
    } else {
        appData.savings = false;
    };
    if (appData.savings == true) {
        let sum = chooseSum.value;
        let percentValue = percent.value;
        appData.monthIncome = sum/100/12*percentValue;
        appData.yearIncome = sum/100*percentValue;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
    };
    if (appData.savings == true) {
        let sum = chooseSum.value;
        let percentValue = percent.value;
        appData.monthIncome = sum/100/12*percentValue;
        appData.yearIncome = sum/100*percentValue;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
    let sum = chooseSum.value;
    let percentValue = percent.value;
    appData.monthIncome = sum/100/12*percentValue;
    appData.yearIncome = sum/100*percentValue;
    monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
}
});
percent.addEventListener('input', function() {
    if (appData.savings == true) {
    let sum = chooseSum.value;
    let percentValue = percent.value;
    appData.monthIncome = sum/100/12*percentValue;
    appData.yearIncome = sum/100*percentValue;
    monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
    yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
}
});


    var appData = {
     budget: money,
     timeData: time,
     expenses: {},
     optionalExpenses: {},
     income: [],
     suma: {},
     savings: false
     };
  
     
     

// // ****************
// // for (var i = 0; i < 2; i++) {
// //     var q1 = prompt("Введите обьязательную статью расходов в этом месяце", "");
// //     var q2 = prompt("Во сколько обойдется?", "");
// // if ((typeof(q1)) === "string" && (typeof(q1)) != null && (typeof(q1)) != "" && (typeof(q2)) == "string" && (typeof(q2)) != null 
// // && (typeof(q2)) != "" && q1.length < 50 && q2.length < 50) {    
// //     console.log("done");
// //     appData.expenses[q1] = q2;
// // } else {
// //    i= i-1;
// // }
// // }


// //  var budgetPerDay = appData.budget / 30;

// // alert(appData.budget / 30);



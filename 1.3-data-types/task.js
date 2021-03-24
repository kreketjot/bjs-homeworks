'use strict'

function calculateTotalMortgage(percent, contribution, amount, date) {
  let x = parseFloat(percent);
  if (isNaN(x) || x > 100 || x < 0) {
    return `Параметр 'процентная ставка' содержит неправильное значение '${percent}'`;
  }
  percent = x;

  x = parseFloat(contribution);
  if (isNaN(x) || x < 0) {
    return `Параметр 'сумма первоначального взноса' содержит неправильное значение '${contribution}'`;
  }
  contribution = x;

  x = parseFloat(amount);
  if (isNaN(x) || x < 0) {
    return `Параметр 'сумма кредита' содержит неправильное значение '${amount}'`;
  }
  amount = x;

  x = new Date(Date.parse(date));
  let today = new Date();
  if(x - today <= 0) {
    return `Параметр 'дата окончания кредита' содержит неправильное значение '${date}'`;
  }

  let s = amount - contribution; //нужно ли округлять?
  let p = percent / 1200; //нужно ли округлять? 
  let n = (x.getFullYear() - today.getFullYear()) * 12 + x.getMonth() - today.getMonth();
  let res = +((n * s * (p + p / (((1 + p) ** n) - 1))).toFixed(2));

  console.log(res);
  return res;
}

function getGreeting(name) {
  name = name || `Аноним`;
  let greeting = `Привет, мир! Меня зовут ${name}.`;
  console.log(greeting);
  return greeting;
}
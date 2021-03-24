'use strict'

function getResult(a, b, c){
  a = +a; b = +b; c = +c;
  let res = [];
  let d = b ** 2 - 4 * a * c;
  if (d === 0) {
    res[0] = +(-b / (2 * a)).toFixed(2);
  } else if (d > 0) {
    res[0] = +((-b + Math.sqrt(d)) / (2 * a)).toFixed(2);
    res[1] = +((-b - Math.sqrt(d)) / (2 * a)).toFixed(2);
  }

  return res;
}

function getAverageMark(marks){
  if (marks.length === 0) {
    return 0;
  } 
  if (marks.length > 5) {
    console.log(`Оценок больше 5`);
    marks.splice(5);
  }

  return +((marks.reduce( (sum, x) => sum + +x, 0 ) / marks.length).toFixed(2));
}

function askDrink(name, dateOfBirthday){
  let today = new Date();
  today.setHours(23, 59, 59, 999);
  let diff = today.getFullYear() - dateOfBirthday.getFullYear(); 
  if(diff > 18 || diff === 18 && today.setFullYear(dateOfBirthday.getFullYear()) - dateOfBirthday > 0) {
    return `Не желаете ли олд-фэшн, ${name}?`;
  }
  return `Сожалею, ${name}, но я не могу вам продать алкоголь. Могу предложить вам замечательный клюквенный компот!`;
}
'use strict'

/*** TASK 1 ***/

function roundNumber(x, n = 2) {
  return +(x.toFixed(n));
}

function getSolutions(a = 0, b = 0, c = 0) {
  a = parseFloat(a); 
  b = parseFloat(b);
  c = parseFloat(c);
  let D = b ** 2 - 4 * a * c;
  let roots = [];
  let x;
  if(D === 0) {
    x = -b / (2 * a);
    roots.push( roundNumber(x) );
  } else if (D > 0) {
    x = (-b + Math.sqrt(D)) / (2 * a);
    roots.push( roundNumber(x) );
    x = (-b - Math.sqrt(D)) / (2 * a);
    roots.push( roundNumber(x) );
  }

  return {
    D,
    roots
  };
}

function showSolutionsMessage(a, b, c) {
  console.log(`Вычисляем корни квадратного уравнения ${a}x² + ${b}x + ${c}`);
  let result = getSolutions(a, b, c);
  console.log(`Значение дискриминанта: ${result.D}`);
  switch (result.roots.length) {
    case 1:
      console.log(`Уравнение имеет один корень X₁ = ${result.roots[0]}`);
      break;
    case 2:
      console.log(`Уравнение имеет два корня. X₁ = ${result.roots[0]}, X₂ = ${result.roots[1]}`);
      break;
    default:
      console.log(`Уравнение не имеет вещественных корней`);
  }
}

/*** TASK 2 ***/

function getAverageScore(data) {
  let result = {};
  let avgMarks = [];
  for(let subject in data) {
    avgMarks.push( result[subject] = getAverageMark(data[subject]) );
  }
  result.average = getAverageMark(avgMarks);

  return result;
}

function getAverageMark(marks) {
  if (!marks.length) {
    return 0;
  }
  return marks.reduce((sum, x) => sum + +x, 0) / marks.length;
}

/*** TASK 3 ***/

function getPersonData(secretData) {
  return { 
    firstName: getDecodedValue(secretData.aaa), 
    lastName: getDecodedValue(secretData.bbb) 
  };
}

function getDecodedValue(secret) {
  return secret ? `Эмильо` : `Родриго`;
}

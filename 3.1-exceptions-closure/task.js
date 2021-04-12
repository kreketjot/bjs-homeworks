'use strict'

// задание 1
function parseCount(count = 0) {
  const result = Number.parseInt(count);
  if (Number.isNaN(result)) {
    throw new Error('Невалидное значение');
    // получается return не нужен?
  }
  return result;
}

function validateCount(count) {
  let result;
  try {
    result = parseCount(count);
  } catch(e) {
    console.error(e);
    return e;
  }
  return result;
}

// задание 2
class Triangle {
  #a;
  #b;
  #c;

  constructor(lenA, lenB, lenC) {
    const a = +lenA,
          b = +lenB,
          c = +lenC;
    if (!(a && b && c)) {
      throw new Error('Треугольник состоит из 3 отрезков');
    }
    if (a >= b + c || b >= a + c || c >= a + b) {
      throw new Error('Треугольник с такими сторонами не существует');
    }
    this.#a = a;
    this.#b = b;
    this.#c = c;
  }

  static #roundNumber(x, prec = 3) {
    return +x.toFixed(prec);
  }

  getPerimeter() {
    const p = this.#a + this.#b + this.#c;
    return Triangle.#roundNumber(p);
  }

  getArea() {
    const p = this.getPerimeter() / 2;
    const s = Math.sqrt( p * (p - this.#a) * (p - this.#b) * (p - this.#c) );
    return Triangle.#roundNumber(s);
  }
}

function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch(e) {
    const triangleError = () => 'Ошибка! Треугольник не существует';
    const notTriangle = {};
    notTriangle.getArea = triangleError;
    notTriangle.getPerimeter = triangleError;
    console.error( triangleError() ); 
    return notTriangle;
  } 
}
'use strict'

String.prototype.isPalindrome = function () {
  let letters = this.toLowerCase().split(' ').join('').split('')
  for (let i = 0, j = letters.length - 1; i <= j; i++, j--) {
    if (letters[i] !== letters[j]) {
      return false;
    }
  }
  return true; 
}

function getAverageMark(marks) {
  return Math.round(marks.reduce( (sum, cur) => sum + cur, 0 ) / marks.length) || 0;
}

function checkBirthday(birthday) {
  let majority = new Date(birthday);
  majority.setFullYear(majority.getFullYear() + 18);
  return Date.now() - majority > 0;
}
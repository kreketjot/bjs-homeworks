'use strict'

// 1 задание
class PrintEditionItem {
  name;
  releaseDate;
  pagesCount;
  _state;
  type;

  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
    return this.state;
  }

  set state(newState) {
    let fixedState = newState || 0;
    if (fixedState < 0) {
      fixedState = 0;
    } else if (fixedState > 100) {
      fixedState = 100;
    }

    this._state = fixedState;
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = `magazine`;
  }
}

class Book extends PrintEditionItem {
  author;

  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = `book`;
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = `novel`;
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = `fantastic`;
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = `detective`;
  }
}

// задание 2
class Library {
  name;
  books;

  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(printEditionItem) {
    if (printEditionItem.state > 30) {
      this.books.push(printEditionItem);
    }
  }

  findBookBy(type, value) {
    return this.books.find( (book) => book[type] == value ) || null;
  }

  giveBookByName(bookName) {
    const indexOfBook = this.books.findIndex( (book) => book.name == bookName );
    if (indexOfBook === -1) {
      return null;
    }
    return this.books.splice(indexOfBook, 1)[0];
  }
}

// задание 3
class StudentLog {
  #name;
  #marks;

  constructor(name = 'unnamed student') {
    this.#name = name;
    this.#marks = {};
  }

  getName() {
    return this.#name;
  }

  addGrade(grade, subject) {
    if (!subject) {
      console.log(`Необходимо указать предмет помимо оценки!`);
      return 0;
    }

    const mark = +grade || 0;

    if (mark < 1 || mark > 5) {
      console.log(`Вы пытались поставить оценку "${grade}" по предмету "${subject}". Допускаются только числа от 1 до 5.`);
    } else {
      if (!this.#marks[subject]) {
        this.#marks[subject] = [];
      }
      this.#marks[subject].push(mark);
    }
    return this.#marks[subject]?.length || 0;
  }

  getAverageBySubject(subject) {
    const grades = this.#marks[subject];
    if (!grades?.length) {
      return 0;
    }
    return +(grades.reduce( (sum, cur) => cur + sum, 0 ) / grades.length).toFixed(2);
  }

  getTotalAverage() {
    let sum = 0;
    let len = 0;
    for (let subj in this.#marks) {
      sum += this.getAverageBySubject(subj);
      len++;
    }
    return +(sum / len).toFixed(2);
  }
}
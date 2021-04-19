'use strict'

class AlarmClock {
  #alarmCollection;
  #timerId;

  constructor() {
    this.#alarmCollection = [];
    this.#timerId = null;
  }

  addClock(time, callback, id) {
    if (!id) {
      throw new Error('Необходим идентификатор создаваемого звонка');
    }
    if ( this.#alarmCollection.some( alarm => alarm.id === id ) ) {
      console.error(`Будильник с таким идентификатором уже существует! 
        Новый будильник не добавлен!`);
    } else {
      this.#alarmCollection.push({ id, time, callback });
    }
  }

  removeClock(id) {
    const oldLength = this.#alarmCollection.length;
    this.#alarmCollection = this.#alarmCollection.filter( alarm => alarm.id !== id );
    return oldLength !== this.#alarmCollection;
  }
  
  static getCurrentFormattedTime(shift = 0) {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes() + shift}`;
  }

  start() {
    if (this.#timerId) {
      return;
    }
    this.#timerId = setInterval( 
      () => this.#alarmCollection.forEach( 
        alarm => AlarmClock.#checkClock(alarm) 
      ), //норм так раскидывать каждый callback на новую строку?
      1000
    );
  }
  
  static #checkClock(alarm) {
    if (alarm.time === AlarmClock.getCurrentFormattedTime()) {
      alarm.callback();
    }
  }

  stop() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
      this.#timerId = null; //или лучше delete this.#timerId
    }
  }

  printAlarms() {
    this.#alarmCollection.forEach( alarm => console.log(`${alarm.id} ${alarm.time}`) );
  }

  clearAlarms() {
    this.stop();
    this.#alarmCollection = [];
  }
}

function testCase() {
  const alarms = new AlarmClock();
  function alarmLog() {
    console.log(`alarm ${this.time}`);
  }

  alarms.addClock(
    AlarmClock.getCurrentFormattedTime(),
    alarmLog,
    1
  );

  alarms.addClock(
    AlarmClock.getCurrentFormattedTime(1),
    function () {
      alarmLog.call(this);
      alarms.removeClock(this.id);
    },
    2
  );

  alarms.addClock(
    AlarmClock.getCurrentFormattedTime(2),
    function () {
      alarmLog.call(this);
      console.log('before clearing');
      alarms.printAlarms();
      alarms.clearAlarms();
      console.log('after clearing');
      alarms.printAlarms();
    },
    3
  );

  alarms.start();
}

testCase();
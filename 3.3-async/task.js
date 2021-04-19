'use strict'

class AlarmClock {
  alarmCollection;
  timerId;

  constructor() {
    this.alarmCollection = [];
    this.timerId = null;
  }

  addClock(time, callback, id) {
    if (!id) {
      throw new Error('Необходим идентификатор создаваемого звонка');
    }
    if ( this.alarmCollection.some( alarm => alarm.id === id ) ) {
      console.error(`Будильник с таким идентификатором уже существует! 
        Новый будильник не добавлен!`);
    } else {
      this.alarmCollection.push({ id, time, callback });
    }
  }

  removeClock(id) {
    const oldLength = this.alarmCollection.length;
    this.alarmCollection = this.alarmCollection.filter( alarm => alarm.id !== id );
    return oldLength !== this.alarmCollection;
  }
  
  getCurrentFormattedTime(shift = 0) {
    let time = new Date();
    time.setMinutes(time.getMinutes() + shift);
    let h = time.getHours();
    if (h < 10) {
      h = '0' + h;
    }
    let m = time.getMinutes();
    if (m < 10) {
      m = '0' + m;
    }
    return `${h}:${m}`;
  }

  start() {
    if (this.timerId) {
      return;
    }
    this.timerId = setInterval( 
      () => this.alarmCollection.forEach( 
        alarm => checkClock.call(this, alarm) 
      ), //норм так раскидывать каждый callback на новую строку?
      1000
    );

    function checkClock(alarm) {
      if (alarm.time === this.getCurrentFormattedTime()) {
        alarm.callback();
      }
    }
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null; //или лучше delete this.timerId
    }
  }

  printAlarms() {
    this.alarmCollection.forEach( alarm => console.log(`${alarm.id} ${alarm.time}`) );
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}

let alarms;
function testCase() {
  alarms = new AlarmClock();
  function alarmLog() {
    console.log(`alarm ${this.time}`);
  }

  alarms.addClock(
    alarms.getCurrentFormattedTime(),
    alarmLog,
    1
  );

  alarms.addClock(
    alarms.getCurrentFormattedTime(1),
    function () {
      alarmLog.call(this);
      alarms.removeClock(this.id);
    },
    2
  );

  alarms.addClock(
    alarms.getCurrentFormattedTime(2),
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
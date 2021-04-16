'use strict'

// задание 1
console.clear();

const weapons = [new Knife(), new Staff(), new Axe(), 
  new StormStaff(), new LongBow(), new Bow()];

function getNames() {
  return weapons.map( weapon => weapon.name ); 
}

function getCountReliableWeapons(durability = 0) {
  return weapons.reduce( (sum, weapon) => 
    weapon.durability > durability ? sum + 1 : sum, 0 );
}

function hasReliableWeapons(durability = 0) {
  return weapons.find( weapon => 
    weapon.durability > durability ) !== undefined;
}

function getReliableWeaponsNames(durability = 0) {
  return weapons.
    filter( weapon => weapon.durability > durability ).
    map( weapon => weapon.name );
}

function getTotalDamage() {
  return weapons.reduce( (total, weapon) =>
    weapon.attack + total, 0 );
}

function getValuestCountToSumValues(nums, number) {
  let sum = 0;
  for (let x in nums) {
    if (sum >= number) {
      return +x;
    }
    sum += nums[x];
  }
  return nums.length;
}


// задание 2
function sleep(milliseconds) {
  let e = new Date().getTime() + milliseconds;
  while (new Date().getTime() <= e) {}
}

function sum(...args) {
  sleep(100);
  return args.reduce( (sum, arg) => sum + +arg, 0 );
}

function compareArrays(arr1, arr2) {
  return arr1.length === arr2.length && 
    arr1.every( (el, i) => el === arr2[i] );
}

function memorize(fn, limit) {
  let n = limit > 0 ? limit : 0;

  const memory = [];

  return function (...args) {
    let result = memory.find( item => 
      compareArrays(item.args, args) )?.result;
    if (result === undefined) {
      result = fn(...args);
      if (memory.length >= n) {
        memory.shift();
      }
      memory.push( {args, result} );
    }
    return result;
  }
}

function testCase(testFunction, timer) {
  const arr = [ [1,2,3], [1,2], [1,2,3], [1,2], [9,5,2,4] ];
  console.time(timer);
  for (let i = 0; i < 100; i++) {
    arr.forEach( args => testFunction(...args) );
  }
  console.timeEnd(timer);
}

/* со sleep(100)
testCase(sum, 'sum');
testCase( memorize(sum, 10), 'mSum' );
functions.js:87 sum: 50500.5380859375 ms
functions.js:87 mSum: 303.42822265625 ms
*/

/* без sleep()
testCase(sum, 'sum');
testCase( memorize(sum, 10), 'mSum' );
functions.js:87 sum: 0.41015625 ms
functions.js:87 mSum: 1.059814453125 ms
*/
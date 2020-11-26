"use strict";
/**
 * Produces n number of prime numbers.
 *
 * @param {int} n - a value that defines the dimensions of the prime sieve to
 *   output.
 * @return {array<int>} - an (n+1)*(n+1) - 1 (to account for the empty top left
 *   corner of such a sieve) long array of primes.
 */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function sieve_n(n) {
  if (!Number.isInteger(n)) return new TypeError('n must be an integer.');
  if (n <= 0) return new TypeError('n must be 1 or greater.');

  if (n == 1) {
    return [2];
  }

  var result = [];
  var check = 2;

  while (result.length < n) {
    if (is_prime(check)) {
      result.push(check);
    }

    check = check + 1;
  }

  return result;
}
/**
 * Checks if a number is prime.
 * 
 * @param {int} n - A value to check prime-yness.
 * @return {bool} - Returns true if n is prime, false otherwise.
 */


function is_prime(n) {
  if (n < 2) {
    return false;
  }

  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}
/**
export function make_multi_table(A, B){
    if(!Array.isArray(A) || !Array.isArray(B) ||
       A.some(isNaN) || B.some(isNaN)){
        return (new TypeError("must provide two 1D arrays."));
    }
        
    var result = [];
    for(var i = 0; i < A.length; ++i){
        result.push(make_row_table(A[j], B));
    }
    return result;
}*/

/**
 * Makes a row of values, multiplying each value in B by the scalar a.
 *
 * @param {int} a - A scalar to multiply by.
 * @param {array<int>} B - A vector to be multiplied.
 * @param {array<int>} - The result of a multiplied by B.
 */


function make_row_table(a, B) {
  if (!Number.isInteger(a)) {
    return new TypeError("ensure a is a integer.");
  }

  if (!Array.isArray(B) || B.some(isNaN)) {
    return new TypeError("ensure B is an array of integers.");
  }

  var row = [];

  for (var j = 0; j < B.length; ++j) {
    row.push(a * B[j]);
  }

  return row;
}
/**
 * Checks if a list is an array of only strings and ints.
 * 
 * @param {array<int>} x - An array of values.
 * @result {bool} - Returns true if array is only compoed of string and ints.
 */


function is_array_of_chars(x) {
  if (!Array.isArray(x)) {
    return false;
  }

  for (var i = 0; i < x.length; ++i) {
    if (!_typeof(x[i]) === 'string' && !Number.isInteger(x[i]) || !x[i] || x[i].length === 0 || Array.isArray(x[i])) {
      return false;
    }
  }

  ;
  return true;
}
/**
 * Prints out an array all formated and pretty, like in a table. Note: Due to the
 *   heavy side-effects in this function, I've opted to not unit test, instead
 *   relying on integration testing.
 *
 * @param {int} n - A number to build the table around.
 * @return {side-effect} - No explicit return. Prints statements to the console.
 */


function pretty_print(n) {
  var primes = sieve_n(n); // For padding.

  var max = Math.pow(primes[n - 1], 2).toString().length;
  var s = " ".repeat(max - 1).concat("\\ | ");

  for (var i = 0; i < n; ++i) {
    s = s.concat(" ".repeat(max - primes[i].toString().length)).concat(primes[i]).toString().concat(" | ");
  }

  console.log(s);
  console.log("=".repeat(n * (max + 4)));

  for (var i = 0; i < n; ++i) {
    var s = " ".repeat(max - primes[i].toString().length).concat(primes[i]).concat(" | ");
    var row = make_row_table(primes[i], primes);

    for (var j = 0; j < n; ++j) {
      var l = row[j].toString().length;
      s = s.concat(" ".repeat(max - l)).concat(row[j]).concat(" | ");
    }

    console.log(s);
  }
}
/********************************************************************************
 * Main script. No need to wrap in a function and not united tested.
 */


var args = process.argv.slice(2);
var good = true;

if (!/^\+?(0|[1-9]\d*)$/.test(args)) {
  console.log("Error, please ensure your argument is an integer.");
  good = false;
} else if (args.length > 1 || args.length == 0) {
  console.log("Error, please provide exactly one integer.");
  good = false;
}

if (good) {
  pretty_print(parseInt(args));
}
/*******************************************************************************/


module.exports = {
  sieve_n: sieve_n,
  is_prime: is_prime,
  //prepare_for_output: prepare_for_output,
  is_array_of_chars: is_array_of_chars,
  make_row_table: make_row_table
};
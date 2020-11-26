"use strict"; /// JS Doc here
/// @params n: int, a value that defines the dimensions of the prime sieve to
///   output.
/// @return :array<int>, an (n+1)*(n+1) - 1 (to account for the empty top left
///   corner of such a sieve) long array of primes.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sieve_n = sieve_n;
exports.is_prime = is_prime;
exports.make_multi_table = make_multi_table;
exports.is_array_of_chars = is_array_of_chars;

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

function make_multi_table(A, B) {
  if (!Array.isArray(A) || !Array.isArray(B) || A.some(isNaN) || B.some(isNaN)) {
    return new TypeError("must provide two 1D arrays.");
  }

  var result = [];

  for (var i = 0; i < A.length; ++i) {
    var row = [];

    for (var j = 0; j < B.length; ++j) {
      row.push(A[i] * B[j]);
    }

    result.push(row);
  }

  return result;
}

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

function pretty_print(n) {
  console.log("program");
  var primes = sieve_n(n);
  var output = make_multi_table(primes, primes); // For padding.

  var max = output[n - 1][n - 1].toString().length;
  var s = " ".repeat(max - 1).concat("\\ | ");

  for (var i = 0; i < n; ++i) {
    s = s.concat(" ".repeat(max - primes[i].toString().length)).concat(primes[i]).toString().concat(" | ");
  }

  console.log(s);
  console.log("=".repeat(n * (max + 4)));

  for (var i = 0; i < n; ++i) {
    var s = " ".repeat(max - primes[i].toString().length).concat(primes[i]).concat(" | ");

    for (var j = 0; j < n; ++j) {
      var l = output[i][j].toString().length;
      s = s.concat(" ".repeat(max - l)).concat(output[i][j]).concat(" | ");
    }

    console.log(s);
  }
}

pretty_print(10000);
/* NO LONGER NEEDED
export function prepare_for_output(tbl, primes_1, primes_2){
    if(!Array.isArray(tbl) ||
       !is_array_of_chars(primes_1) ||
       !is_array_of_chars(primes_2)){
           return (new TypeError("must provide a 2D array of strings or numbers, and 2 arrays of either strings or numbers."))
    }

    for(var i = 0; i < tbl.length; ++i){
        if(!is_array_of_chars(tbl[i])){
            return (new TypeError("tbl must be a 2D array of strings or integers."))
        }
        if(tbl[i].length !== primes_1.length){
            return (new TypeError("each row in tbl must be of same length as primes_1"));
        }
    };
    
    if(tbl.length !== primes_2.length){
        return (new TypeError("each column in tbl must be of same length as primes_2"));
    }
    
    primes_1.unshift("\\");
    tbl.unshift(primes_1);

    for(var i = 1; i < tbl.length; ++i){
        tbl[i - 1].unshift(primes_2[i]);
    }

    return tbl;
}*/
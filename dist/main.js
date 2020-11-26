"use strict"; /// JS Doc here
/// @params n: int, a value that defines the dimensions of the prime sieve to
///   output.
/// @return :array<int>, an (n+1)*(n+1) - 1 (to account for the empty top left
///   corner of such a sieve) long array of primes.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sieve_under_n = sieve_under_n;
exports.is_prime = is_prime;
exports.make_multi_table = make_multi_table;

function sieve_under_n(n) {
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
  var result = [];

  for (var i = 0; i < A.length; ++i) {
    var row = [];

    for (var j = 0; j < B.length; ++j) {
      row.push(A[i] * B[j]);
    }

    result.push(row);
  }

  return result;
} //exports.sieve_under_n = sieve_under_n;
//exports.is_prime = is_prime;
//exports.make_multi_table = make_multi_table;
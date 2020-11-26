"use strict";
/// JS Doc here
/// @params n: int, a value that defines the dimensions of the prime sieve to
///   output.
/// @return :array<int>, an (n+1)*(n+1) - 1 (to account for the empty top left
///   corner of such a sieve) long array of primes.
function sieve_under_n(n){
    if(!Number.isInteger(n)){
        throw new Error('n must be an integer.');
    }
    if(n <= 0){
        throw new Error('n must be 1 or greater.');
    }
    if(n == 1){
        return [2];
    }
    
    var result = [];
    let check = 2;

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
        return false
    }

    for (let i = 2; i <= Math.sqrt(n); i++){
        if (n % i === 0) {
            return false;
        } 
    }
    return true;
  }

exports.sieve_under_n = sieve_under_n;
exports.is_prime = is_prime;

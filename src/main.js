"use strict";
/// JS Doc here
/// @params n: int, a value that defines the dimensions of the prime sieve to
///   output.
/// @return :array<int>, an (n+1)*(n+1) - 1 (to account for the empty top left
///   corner of such a sieve) long array of primes.
export function sieve_under_n(n){
 
    if(!Number.isInteger(n)) return (new TypeError('n must be an integer.'));
    if(n <= 0) return(new TypeError('n must be 1 or greater.'));

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

export function is_prime(n) {
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

export function make_multi_table(A, B){
    if(!Array.isArray(A) || !Array.isArray(B) ||
       A.some(isNaN) || B.some(isNaN)){
        return (new TypeError("must provide two 1D arrays."));
    }
        
    var result = [];
    for(var i = 0; i < A.length; ++i){
        let row = [];
        for(var j = 0; j < B.length; ++j){
            row.push(A[i] * B[j]);
        }
        result.push(row);
    }
    return result;
}

export function is_array_of_chars(x){
    for(var i = 0; i < x.length; ++i){
        if(!(typeof(x[i]) === 'string' && x[i].length === 1) &&
           !Number.isInteger(x[i])){
            return false;
        }
    };
    return true;
}

export function prepare_for_output(tbl, primes_1, primes_2){
    if(!Array.isArray(tbl) ||
       !is_array_of_chars(primes_1) ||
       !is_array_of_chars(primes_2)){
           return (new TypeError("must provide a 2D array of chars or integers, and 2 arrays of either chars or numbers."))
    }
    tbl.forEach((x) => {
        if(!is_array_of_chars(x)){
            return (new TypeError("tbl must be a 2D array of chars or integers."))
        }
        if(x.length !== primes_1.length){
            return (new TypeError("each row in tbl must be of same length as primes_1"));
        }
    });
    
    if(tbl.length !== primes_2.length){
        return (new TypeError("each column in tbl must be of same length as primes_2"));
    }
    
    primes_1.unshift("\\");
    tbl.unshift(primes_1);

    for(var i = 1; i < tbl.length; ++i){
        tbl[i].unshift(primes_2[i - 1]);
    }

    return tbl;
}

//exports.sieve_under_n = sieve_under_n;
//exports.is_prime = is_prime;
//exports.make_multi_table = make_multi_table;

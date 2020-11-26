import { is_prime, sieve_under_n } from '../dist/main.js';
// Set up
// This should really be streamed in but it works so its fine.
import fs from 'fs';
var primes = fs.readFileSync(__dirname + '/assets/primes-upto-300k')
               .toString()
               .split("\n")
               .map( x => parseInt(x));


describe('sieve_under_n', () => {
    /// NOTE:: This entire sequence for testing is awful and shouldn't really be
    ///   done like this, but jest is being annoying and it's technically fine.
    test('sieve of n != int returns an error', () => {
        expect(sieve_under_n("p")).toStrictEqual(new TypeError("n must be an integer."));
        expect(sieve_under_n(10.22)).toStrictEqual(new TypeError("n must be an integer."));
        expect(sieve_under_n([0])).toStrictEqual(new TypeError("n must be an integer."));
    });
    test('sieve of n <= 0 returns an error', () => {
        expect(sieve_under_n(0)).toStrictEqual(new TypeError("n must be 1 or greater."));
        expect(sieve_under_n(-1)).toStrictEqual(new TypeError("n must be 1 or greater."));
        expect(sieve_under_n(-100)).toStrictEqual(new TypeError("n must be 1 or greater."));
    });
    test('sieve of first 1 returns an array of length 1', () => {
        expect(sieve_under_n(1)).toStrictEqual(primes.slice(0, 1))
    });
    test('sieve of first 3 returns an array of length 3', () => {
        expect(sieve_under_n(3)).toStrictEqual(primes.slice(0, 3))
    });
    
    test('sieve of first 8 returns an array of length 8', () => {
        expect(sieve_under_n(8)).toStrictEqual(primes.slice(0, 8))
    });
    test('sieve of first 15 returns an array of length 15', () => {
        expect(sieve_under_n(15)).toStrictEqual(primes.slice(0, 15))
    });
    test('sieve of first 24 returns an array of length 24', () => {
        expect(sieve_under_n(24)).toStrictEqual(primes.slice(0, 24))
    });

    test('sieve of first 20000 returns an array of length 20000', () => {
        expect(sieve_under_n(20000)).toStrictEqual(primes.slice(0, 20000))
    });
    
    // Really high one here

});

describe('is_prime', () => {
    test('1 is not a prime', () =>{
       expect(is_prime(1)).toBe(false); 
    });
    test('2 is a prime', () => {
        expect(is_prime(2)).toBe(true);
    });
    test('4 is not prime', () => {
        expect(is_prime(4)).toBe(false);
    });
    test('23 is a prime', () => {
        expect(is_prime(23)).toBe(true);
    });
    test('100 is not prime', () => {
        expect(is_prime(100)).toBe(false);
    });
});



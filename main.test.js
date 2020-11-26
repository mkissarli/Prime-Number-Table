const sieve_module = require("./main.js");
const sieve_under_n = sieve_module.sieve_under_n;
const is_prime = sieve_module.is_prime;

describe('sieve_under_n', () => {
    test('sieve of n != int returns an error', () => {
        expect(sieve_under_n("p")).toThrow("n must be an integer.");
        expect(sieve_under_n(10.22)).toThrow("n must be an integer.");
        expect(sieve_under_n([0])).toThrow("n must be an integer.");
    });
    test('sieve of n <= 0 returns an error', () => {
        expect(sieve_under_n(0)).toThrow("n  must be 1 or greater.");
        expect(sieve_under_n(-1)).toThrow("n  must be 1 or greater.");
        expect(sieve_under_n(-100)).toThrow("n  must be 1 or greater.");
    });
    test('sieve of 1 returns an array of length 1', () => {
        expect(sieve_under_n(1)).toStrictEqual([2])
    });
    test('sieve of 3 returns an array of length 3', () => {
        expect(sieve_under_n(3)).toStrictEqual([2, 3, 5])
    });
    
    test('sieve of 8 returns an array of length 8', () => {
        expect(sieve_under_n(8)).toStrictEqual([2,   3,  5, 7, 11,
                                                13, 17, 19])
    });
    test('sieve of 15 returns an array of length 15', () => {
        expect(sieve_under_n(15)).toStrictEqual([ 2,  3,  5,  7, 11,
                                                  13, 17, 19, 21, 23,
                                                  29, 31, 37, 41, 43])
    });
    test('sieve of 24 returns an array of length 24', () => {
        expect(sieve_under_n(24)).toStrictEqual([ 2,  3,  5,  7, 11,
                                                  13, 17, 19, 21, 23,
                                                  29, 31, 37, 41, 43,
                                                  47, 53, 59, 61, 67,
                                                  71, 73, 79, 83])
    });
    
    // Really high one here

});

describe('is_prime', () => {
    test('1 is not a prime', () =>{
       expect(is_prime(1)).toBe(false); 
    });
    test('2 is a prime', () => {
        expect(is_prime(2)).toBe(true);
    })
});



import { is_prime, sieve_under_n, make_multi_table, prepare_for_output, is_array_of_chars } from '../dist/main.js';
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

describe('make_multi_table', () => {
    test('make_multi_table returns an error when not passed exactly 2 1D arrays', () => {
        expect(make_multi_table(["p", 1], [0, 2])).toStrictEqual(new TypeError("must provide two 1D arrays."));
        expect(make_multi_table("p", 0)).toStrictEqual(new TypeError("must provide two 1D arrays."));
        expect(make_multi_table(10.22, [1])).toStrictEqual(new TypeError("must provide two 1D arrays."));
        expect(make_multi_table([0], 1)).toStrictEqual(new TypeError("must provide two 1D arrays."));
        expect(make_multi_table([0, 1], [[1,2], [1,2]])).toStrictEqual(new TypeError("must provide two 1D arrays."));
    });
    
    
    test('passing in [1] and [1] gives [[1]]', () => {
        expect(make_multi_table([1],[1])).toStrictEqual([[1]])
    });
    test('passing in [1] and [2] gives [[2]]', () => {
        expect(make_multi_table([1],[2])).toStrictEqual([[2]])
    });
    test('passing in [1, 2] and [1, 2] gives [[1, 2], [2, 4]', () => {
        expect(make_multi_table([1, 2],[1, 2])).toStrictEqual([[1, 2], [2, 4]])
    });
    
    test('passing in [1] and [1, 2] gives [[1, 2]]', () => {
        expect(make_multi_table([1], [1,2])).toStrictEqual([[1, 2]])
    });
    test('passing in [1, 3] and [1, 2, 3] gives [[1, 2, 3], [3, 6, 9]]', () => {
        expect(make_multi_table([1, 3],[1, 2, 3])).toStrictEqual([[1, 2, 3], [3, 6, 9]])
    });
});

describe('prepare_for_output', () => {
    test('prepare_for_output throws error if not passed 2D array for a tbl', () => {
        expect(prepare_for_output(1,[1],[1])).toStrictEqual(new TypeError("must provide a 2D array of strings or numbers, and 2 arrays of either strings or numbers."));
        
    });
    test('prepare_for_output throws error if passed 2D array of non-numbers or strings for a tbl', () => {
        // Changed mind
        //expect(prepare_for_output([["aa", "bb"], ["Bb", "Cc"]], [1, 2], [1,2])).toStrictEqual(new TypeError("tbl must be a 2D array of strings or integers."));
        expect(prepare_for_output([2],[1],[1])).toStrictEqual(new TypeError("tbl must be a 2D array of strings or integers."));
        expect(prepare_for_output([[[2]]],[1],[1])).toStrictEqual(new TypeError("tbl must be a 2D array of strings or integers."));
        expect(prepare_for_output([[[2]], [[2]]],[1, 2] ,[1, 2])).toStrictEqual(new TypeError("tbl must be a 2D array of strings or integers."));
    });
    
    test('prepare_for_output throws error if passed tbl with a row length less than primes_1', () => {
                expect(prepare_for_output([[1], [3, 4]], [1,2] ,[3, 4])).toStrictEqual(new TypeError("each row in tbl must be of same length as primes_1"));
        expect(prepare_for_output([[1, 2], [3, 4]], [1, 2, 3], [3, 4])).toStrictEqual(new TypeError("each row in tbl must be of same length as primes_1"));
    });
    test('prepare_for_output throws error if passed tbl with a column length less than primes_2', () => {
        expect(prepare_for_output([[1, 2], [3, 4]], [1, 2], [1, 2, 3])).toStrictEqual(new TypeError("each column in tbl must be of same length as primes_2"));
        expect(prepare_for_output([[1, 2], [3, 4], [5, 6]], [1, 2], [1])).toStrictEqual(new TypeError("each column in tbl must be of same length as primes_2"));
    });

    test('prepare_for_output throws error if passed prime_1 or prime_2 as a non-alphanumeric 1D array', () => {
        expect(prepare_for_output([[1, 2], [2, 3]], [[],[]] ,[[], []])).toStrictEqual(new TypeError("must provide a 2D array of strings or numbers, and 2 arrays of either strings or numbers."));
        expect(prepare_for_output([[1, 2], [2, 3]], [null, "ko"], [false, "po"])).toStrictEqual(new TypeError("must provide a 2D array of strings or numbers, and 2 arrays of either strings or numbers."));
    });
    
    test('prepare_for_output passed [[1, 2, 3], [4, 5, 6]], [1, 2, 3] and [1, 2]', () => {
        expect(prepare_for_output([[1, 2, 3], [4, 5, 6]], [1, 2, 3], [1, 2])).toStrictEqual(
            [["\\", 1, 2, 3],
             [1, 1, 2, 3],
             [2, 4, 5, 6]]
        )
    });
});

describe('is_array_of_chars', () => {
    test('tests ["no", "yes", 1, 2]', () => {
        expect(is_array_of_chars(["no", "yes", 1, 2])).toStrictEqual(true);
    });
    test("tests ['n', 'y', 1, 2]", () => {
        expect(is_array_of_chars(['n', 'y', 1, 2])).toStrictEqual(true);
    });
    test("tests ['n', 'y', 1, []]", () => {
        expect(is_array_of_chars(['n', 'y', 1, []])).toStrictEqual(false); 
    });

});


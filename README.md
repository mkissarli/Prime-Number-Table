# Prime Number Multiplication Table
A simple project used for a takehome. Produces a list of the first n-th prime
numbers, then creates a multiplication table with these primes for columns and rows.

Written as a console script.

## Instructions

Ensure Node is install (version 14 LTS was used for testing). Then run the
following commands for setup:

```
git clone https://github.com/mkissarli/Prime-Number-Table.git
cd Prime-Number-Table
npm install --save-dev
npm run babel
```

From here you can run the program from within the directory with:

``` npm run sieve n ```

where ```n``` is the number of primes you want to use.

To run tests you can execute:

``` npm run test ```

### What I'm please with
+ The method I used to get around a heap problem from printing the multiplication table of 10000+ wide and height, where I printed the rows in real time instead.
+ How few lines the actual implementation is.
### What I'd improve upon
+ Implamenting a faster algorithm for the sieving, although currently this is fast enough.
+ Implament a Segmented Sieve algorithm instead of the regular sieve, which would reduce memory complexity (although this isn't a problem.)
+ Implament a better ui. Currently the ui is clean and simple, although somewhat difficult to use if you're not familar with the terminal. A web interface could be helpful, and in particular could be made to allow you to actually view massive tables of 10000-20000 primes.
+ Could be made more decoupled, but in reality I feel that it's decoupled enough that further abstract isn't worth the programmer efficency.
## Notes
Prime numbers file was obtained from
https://www.mathsisfun.com/numbers/prime-number-lists.html

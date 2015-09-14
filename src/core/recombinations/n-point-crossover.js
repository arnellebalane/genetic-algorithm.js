import 'babel/polyfill';
import Individual from '../individual';
import Recombination from '../recombination';


export default class nPointCrossover extends Recombination {
    constructor(n) {
        super();
        this.n = n;
    }

    recombine(a, b) {
        var _a = a.alleles, _b = b.alleles;
        var c = [], d = [];
        var breakpoints = this.breakpoints(_a.length);
        breakpoints.unshift(0);
        for (let i = 1; i < breakpoints.length; i++) {
            c = c.concat(_a.slice(breakpoints[i - 1], breakpoints[i]));
            d = d.concat(_b.slice(breakpoints[i - 1], breakpoints[i]));
            [_a, _b] = [_b, _a];
        }
        var last = breakpoints.pop();
        c = c.concat(_a.slice(last)).map(allele => allele.clone());
        d = d.concat(_b.slice(last)).map(allele => allele.clone());
        c = new Individual(c, a.possibleAlleles);
        d = new Individual(d, a.possibleAlleles);
        return [c, d];
    }

    breakpoints(size) {
        var breakpoints = [];
        for (let i = 0; i < this.n; i++) {
            breakpoints.push(Math.floor(Math.random() * size));
        }
        return breakpoints.sort();
    }
}

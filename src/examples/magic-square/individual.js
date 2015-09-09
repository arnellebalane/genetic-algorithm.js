import 'babel/polyfill';
import Individual from '../../core/individual';
import { sum } from '../../utils';


export default class MagicSquareIndividual extends Individual {
    deconstruct(alleles) {
        return alleles.reduce((merged, allele) => merged.concat(allele), []);
    }

    reconstruct(alleles) {
        var output = [];
        for (let i = 0, l = Math.sqrt(alleles.length); i < l; i++) {
            output.push(alleles.slice(i * l, i * l + l));
        }
        return output;
    }

    fitness() {
        var sums = [0, 0];
        for (let i = 0, l = this._alleles.length; i < l; i++) {
            sums.push(sum(...this._alleles[i]));
            sums.push(sum(...this._alleles.map(row => row[i])));
            sums[0] += this._alleles[i][i];
            sums[1] += this._alleles[i][l - i - 1];
        }
        var counts = sums.reduce((counts, sum) => {
            counts[sum] = counts.hasOwnProperty(sum) ? counts[sum] + 1 : 1;
            return counts;
        }, {});
        var highest = Object.keys(counts).map(count => counts[count])
            .reduce((highest, count) => count > highest ? count : highest, 0);
        return sums.length - highest;
    }
}

import 'babel/polyfill';
import Allele from './allele';
import { NotImplementedError, ImproperlyConfiguredError } from '../errors';
import { shuffle } from '../utils';


export default class Individual {
    constructor(alleles, possibleAlleles) {
        this._alleles = alleles;
        this.possibleAlleles = possibleAlleles;
    }

    get alleles() {
        return this.deconstruct(this._alleles);
    }

    set alleles(alleles) {
        this._alleles = this.reconstruct(alleles);
    }

    deconstruct(alleles) {
        return alleles;
    }

    reconstruct(alleles) {
        return alleles;
    }

    fitness() {
        throw new NotImplementedError(`${this.constructor.name}.fitness`);
    }

    allele() {
        return shuffle(this.possibleAlleles)[0];
    }
}

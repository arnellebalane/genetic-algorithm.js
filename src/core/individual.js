import 'babel/polyfill';
import Allele from './allele';
import { NotImplementedError } from './errors';


export default class Individual {
    constructor(alleles) {
        this._alleles = alleles;
    }

    get alleles() {
        return this.deconstruct(this._alleles);
    }

    set alleles(alleles) {
        this._alleles = this.reconstruct(alleles);
    }

    deconstruct(alleles) {
        throw new NotImplementedError(`${this.constructor.name}.deconstruct`);
    }

    reconstruct(alleles) {
        throw new NotImplementedError(`${this.constructor.name}.reconstruct`);
    }

    fitness() {
        throw new NotImplementedError(`${this.constructor.name}.fitness`);
    }
}

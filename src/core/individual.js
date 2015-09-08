import 'babel/polyfill';
import Allele from './allele';
import { NotImplementedError } from '../errors';


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
        return alleles;
    }

    reconstruct(alleles) {
        return alleles;
    }

    fitness() {
        throw new NotImplementedError(`${this.constructor.name}.fitness`);
    }
}

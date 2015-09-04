import 'babel/polyfill';
import Allele from './allele';
import { NotImplementedError } from './errors';


export default class Individual {
    constructor(alleles) {
        this.alleles = alleles;
    }

    deconstruct() {
        throw new NotImplementedError(`${this.constructor.name}.deconstruct`);
    }

    reconstruct(alleles) {
        throw new NotImplementedError(`${this.constructor.name}.reconstruct`);
    }

    fitness() {
        throw new NotImplementedError(`${this.constructor.name}.fitness`);
    }
}

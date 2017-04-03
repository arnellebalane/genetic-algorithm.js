const { pick } = require('./utils');


class Individual {
    constructor(input, alleles) {
        this._value = input;
        this._alleles = alleles;
    }

    get alleles() {
        return this._value;
    }

    set alleles(value) {
        this._value = value;
    }

    fitness() {
        throw new Error('Not yet implemented.');
    }

    allele() {
        return pick(this._alleles);
    }
}


module.exports = Individual;

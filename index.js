import 'babel/polyfill';
import { extend } from './utils';


class GeneticAlgorithm {
    constructor(options = {}) {
        this.populationSize = 10;
        this.maxGenerations = 1000;
        extend(this, options);
    }
}


module.exports = GeneticAlgorithm;

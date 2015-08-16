import 'babel/polyfill';
import { extend } from './utils';


var defaultOptions = {
    populationSize: 10,
    maxGenerations: 1000
};


class GeneticAlgorithm {
    constructor(options = {}) {
        extend(this, { ...defaultOptions, ...options });
    }
}


module.exports = GeneticAlgorithm;

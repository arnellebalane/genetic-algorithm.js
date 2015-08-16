import 'babel/polyfill';
import { merge, extend } from './utils';


var defaultOptions = {
    populationSize: 10,
    maxGenerations: 1000
};


function GeneticAlgorithm(options) {
    options = merge(defaultOptions, options || {});
    extend(this, options);
}


module.exports = GeneticAlgorithm;

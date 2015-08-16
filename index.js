import 'babel/polyfill';
import { extend } from './utils';


var defaultOptions = {
    populationSize: 10,
    maxGenerations: 1000
};


function GeneticAlgorithm(options = {}) {
    extend(this, { ...defaultOptions, ...options });
}


module.exports = GeneticAlgorithm;

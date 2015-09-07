import 'babel/polyfill';
import Selection from './selection';
import Recombination from './recombination';
import Mutation from './mutation';
import { MissingRequiredPropertyError, ImproperlyConfiguredError }
    from '../errors';
import { extend, items } from '../utils';


const properties = {
    populationSize: { type: 'number' },
    survivalRate: { type: 'number' },
    maxGenerations: { type: 'number' },
    individual: { type: 'function' },
    selection: { required: true, class: Selection },
    recombination: { required: true, class: Recombination },
    mutation: { required: true, class: Mutation }
};


export default class GeneticAlgorithm {
    constructor(options = {}) {
        this.populationSize = 10;
        this.survivalRate = 0.2;
        this.maxGenerations = 1000;
        extend(this, options);

        for (let [key, config] of items(properties)) {
            if (config.required && !this.hasOwnProperty(key)) {
                throw new MissingRequiredPropertyError(key);
            } else if (config.class && !(this[key] instanceof config.class)
                    || config.type && typeof this[key] !== config.type) {
                throw new ImproperlyConfiguredError(key);
            }
        }
    }

    generatePopulation() {
        var population = [];
        for (let i = 0; i < this.populationSize; i++) {
            population.push(this.individual());
        }
        return population;
    }
}

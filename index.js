import 'babel/polyfill';
import { extend, items } from './utils';


const properties = {
    individual: { required: true, type: 'function' },
    recombine: { required: true, type: 'function' },
    mutate: { required: true, type: 'function' },
    fitness: { required: true, type: 'function' },
    deconstruct: { required: true, type: 'function' },
    reconstruct: { required: true, type: 'function' },
    perfectFitness: { required: true }
};


export default class GeneticAlgorithm {
    constructor(options = {}) {
        this.populationSize = 10;
        this.maxGenerations = 1000;
        extend(this, options);

        for (let [key, value] of items(properties)) {
            if (value.required && !this.hasOwnProperty(key)) {
                throw new Error(`Property "${key}" is required.`);
            } else if (value.type && typeof this[key] !== value.type) {
                throw new Error(`Property "${key}" should be of type `
                    + `"${value.type}".`);
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

import 'babel/polyfill';
import { extend, items } from './utils';


const properties = {
    individual: { required: true, type: 'function' },
    recombine: { required: true, type: 'function' },
    mutate: { required: true, type: 'function' },
    fitness: { required: true, type: 'function' },
    deconstruct: { required: true, type: 'function' },
    reconstruct: { required: true, type: 'function' },
    rank: { required: true, type: 'number' },
    perfectFitness: { required: true, type: 'number' }
};


export default class GeneticAlgorithm {
    constructor(options = {}) {
        this.populationSize = 10;
        this.maxGenerations = 1000;
        this.survivalRate = 0.25;
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

    rankPopulation(population) {
        return population.sort((a, b) => {
            var fa = this.fitness(a);
            var fb = this.fitness(b);
            if (fa < fb) {
                return -1 * this.rank;
            } else if (fb < fa) {
                return 1 * this.rank;
            }
            return 0;
        });
    }

    run() {
        var population = this.generatePopulation();
        var generation = 0;
        while (++generation <= this.maxGenerations) {
            population = this.rankPopulation(population);
            if (this.fitness(population[0]) === this.perfectFitness) {
                return population[0];
            }

            let survivors = population.slice(0,
                this.populationSize * this.survivalRate);
        }
    }
}

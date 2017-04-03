const Individual = require('./individual');
const { enumerate } = require('./utils');


const defaultOptions = {
    Individual: Individual,
    populationSize: 10,
    maxGenerations: 1000,
    survivalRate: 0.2
};


class GeneticAlgorithm {
    constructor(options={}) {
        this.options = Object.assign({}, defaultOptions, options);
    }

    run(input) {
        const options = this.options;

        // Generate initial population, filling in missing cells in each
        // individual with a random allele from the allele pool.
        let population = enumerate(options.populationSize).map(_ => {
            return new options.Individual(input, options.alleles);
        });
        population.forEach(individual => console.log(individual.fitness()));
    }
}


module.exports = GeneticAlgorithm;

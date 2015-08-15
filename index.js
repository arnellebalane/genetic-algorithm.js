import utils from './utils';


function GeneticAlgorithm(config) {
    this.generatePopulation = config.generatePopulation || utils.noop;
    this.calculateFitness = config.generatePopulation || utils.noop;
    this.recombinationProcess = config.recombinationProcess || utils.noop;
    this.mutationProcess = config.mutationProcess || utils.noop;
    this.maxGenerations = config.maxEpochs || 1000;
    this.perfectFitness = config.perfectFitness || 0;
}


module.export = GeneticAlgorithm;

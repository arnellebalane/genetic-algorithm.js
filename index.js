import utils from './utils';


var defaultOptions = {
    populationSize: 10,
    maxGenerations: 1000
};


function GeneticAlgorithm(options) {
    options = utils.extend(defaultOptions, options);
}


module.export = GeneticAlgorithm;

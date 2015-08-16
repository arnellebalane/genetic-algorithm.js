import utils from './utils';


var defaultOptions = {
    populationSize: 10,
    maxGenerations: 1000
};


function GeneticAlgorithm(options) {
    options = utils.merge(defaultOptions, options || {});
    utils.extend(this, options);
}


module.exports = GeneticAlgorithm;

import GeneticAlgorithm from '../index';


var magic = new GeneticAlgorithm({
    individual: () => {
        var individual = [];
        for (let i = 0; i < 3; i++) {
            individual.push([random(), random(), random()]);
        }
        return individual;
    },
    recombine: () => {},
    mutate: () => {},
    fitness: (individual) => {
        var sums = [0, 0];
        for (let i = 0, l = individual.length; i < l; i++) {
            sums.push(sum(individual[i]));
            sums.push(sum(individual.map(row => row[i])));
            sums[0] += individual[i][i];
            sums[1] += individual[i][l - i - 1];
        }
        var counts = sums.reduce((counts, sum) => {
            counts[sum] = counts.hasOwnProperty(sum) ? counts[sum] + 1 : 1;
            return counts;
        }, {});
        var highest = Object.keys(counts).map(count => counts[count])
            .reduce((highest, count) => count > highest ? count : highest, 0);
        return sums.length - highest;
    },
    deconstruct: () => {},
    reconstruct: () => {},
    perfectFitness: 0
});


magic.run();





function random() {
    return Math.ceil(Math.random() * 9);
}


function sum(array) {
    return array.reduce((sum, n) => sum + n, 0);
}

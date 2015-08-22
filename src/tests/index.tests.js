import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import GeneticAlgorithm from '../index';
import { merge } from '../utils';


function geneticAlgorithmFactory(options = {}) {
    var defaultOptions = {
        individual: () => [Math.random(), Math.random(), Math.random()],
        recombine: () => {},
        mutate: () => {},
        fitness: (individual) => individual.reduce((a, b) => a + b, 0),
        deconstruct: () => {},
        reconstruct: () => {},
        rank: 1,
        perfectFitness: 0
    };
    return new GeneticAlgorithm(merge(defaultOptions, options));
}


describe('GeneticAlgorithm', () => {
    it('should expose the class definition by default', () => {
        expect(GeneticAlgorithm).to.be.a('function');
    });

    it('should throw error when required properties are missing', () => {
        expect(() => new GeneticAlgorithm())
            .to.throwError(/Property "\w+" is required\./);
    });

    it('should throw error when given properties have incorrect type', () => {
        expect(() => geneticAlgorithmFactory({ individual: false }))
            .to.throwError(/Property "\w+" should be of type "\w+"\./);
    });

    it('should create new instance when given correct properties', () => {
        var instance = null;
        expect(() => instance = geneticAlgorithmFactory()).to.not.throwError();
        expect(instance).to.be.a(GeneticAlgorithm);
    });

    describe('generatePopulation()', () => {
        it('should generate population with the correct size', () => {
            var instance = geneticAlgorithmFactory();
            var population = instance.generatePopulation();
            expect(population.length).to.eql(instance.populationSize);
        });

        it('should use `individual` method to generate population', () => {
            var individual = sinon.spy();
            var instance = geneticAlgorithmFactory({ individual: individual });
            instance.generatePopulation();
            expect(individual.callCount).to.be(instance.populationSize);
        });
    });

    describe('rankPopulation(population)', () => {
        it('should rank population in ascending order when rank option is '
            + 'set to 1', () => {
                var instance = geneticAlgorithmFactory({ rank: 1 });
                var population = instance.generatePopulation();
                var expected = population.map(instance.fitness).sort();
                var actual = instance.rankPopulation(population)
                    .map(instance.fitness);
                expect(actual).to.eql(expected);
            }
        );

        it('should rank population in descending order when rank option is '
            + 'set to -1', () => {
                var instance = geneticAlgorithmFactory({ rank: -1 });
                var population = instance.generatePopulation();
                var expected = population.map(instance.fitness)
                    .sort().reverse();
                var actual = instance.rankPopulation(population)
                    .map(instance.fitness);
                expect(actual).to.eql(expected);
            }
        );

        it('should make use of `fitness` method to rank individuals by their '
            + 'fitness', () => {
                var instance = geneticAlgorithmFactory();
                var fitness = sinon.spy(instance, 'fitness');
                instance.rankPopulation(instance.generatePopulation());
                expect(fitness.called).to.be(true);
            }
        );
    });
});

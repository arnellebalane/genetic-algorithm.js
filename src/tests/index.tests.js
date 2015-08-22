import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import GeneticAlgorithm from '../index';
import { merge } from '../utils';


function geneticAlgorithmFactory(options = {}) {
    var defaultOptions = {
        individual: () => {},
        recombine: () => {},
        mutate: () => {},
        fitness: () => {},
        deconstruct: () => {},
        reconstruct: () => {},
        rank: () => {},
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
            var instance = geneticAlgorithmFactory({
                individual: () => [],
                populationSize: 5
            });
            var expected = [[], [], [], [], []];
            var actual = instance.generatePopulation();
            expect(actual).to.eql(expected);
        });

        it('should use `individual` method to generate population', () => {
            var individual = sinon.spy();
            var instance = geneticAlgorithmFactory({ individual: individual });
            instance.generatePopulation();
            expect(individual.callCount).to.be(instance.populationSize);
        });
    });
});

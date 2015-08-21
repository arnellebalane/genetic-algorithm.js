import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import GeneticAlgorithm from '../index';


describe('GeneticAlgorithm', () => {
    it('should expose the class definition by default', () => {
        expect(GeneticAlgorithm).to.be.a('function');
    });

    it('should throw error when required properties are missing', () => {
        expect(() => new GeneticAlgorithm())
            .to.throwError(/Property "\w+" is required\./);
    });

    it('should throw error when given properties have incorrect type', () => {
        expect(() => new GeneticAlgorithm({
            individual: false,
            recombine: () => {},
            mutate: () => {},
            fitness: () => {},
            deconstruct: () => {},
            reconstruct: () => {},
            perfectFitness: 0
        })).to.throwError(/Property "\w+" should be of type "\w+"\./);
    });

    it('should create new instance when given correct properties', () => {
        var instance = null;
        expect(() => instance = new GeneticAlgorithm({
            individual: () => {},
            recombine: () => {},
            mutate: () => {},
            fitness: () => {},
            deconstruct: () => {},
            reconstruct: () => {},
            perfectFitness: 0
        })).to.not.throwError();
        expect(instance).to.be.a(GeneticAlgorithm);
    });

    describe('generatePopulation()', () => {
        it('should generate population with the correct size', () => {
            var instance = new GeneticAlgorithm({
                individual: () => [],
                recombine: () => {},
                mutate: () => {},
                fitness: () => {},
                deconstruct: () => {},
                reconstruct: () => {},
                perfectFitness: 0,
                populationSize: 5
            });
            var expected = [[], [], [], [], []];
            var actual = instance.generatePopulation();
            expect(actual).to.eql(expected);
        });

        it('should use `individual` method to generate population', () => {
            var individual = sinon.spy();
            var instance = new GeneticAlgorithm({
                individual: individual,
                recombine: () => {},
                mutate: () => {},
                fitness: () => {},
                deconstruct: () => {},
                reconstruct: () => {},
                perfectFitness: 0
            });
            instance.generatePopulation();
            expect(individual.callCount).to.be(instance.populationSize);
        });
    });
});

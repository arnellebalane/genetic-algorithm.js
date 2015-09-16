import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import GeneticAlgorithm from '../../core/genetic-algorithm';
import Individual from '../../core/individual';
import SurvivorSelection from '../../core/survivor-selection';
import Recombination from '../../core/recombination';
import Mutation from '../../core/mutation';
import { merge } from '../../utils';


function createGeneticAlgorithm(options = {}) {
    var defaultOptions = {
        individual: () => new Individual(),
        survivorSelection: new SurvivorSelection(),
        recombination: new Recombination(),
        mutation: new Mutation()
    };
    return new GeneticAlgorithm(merge(defaultOptions, options));
}


describe('GeneticAlgorithm', () => {
    it('should throw error when required properties are not given', () => {
        expect(() => new GeneticAlgorithm()).to.throwError();
    });

    it('should throw error when properties are of not the expected type',
        () => {
            var options = { populationSize: 'big' };
            expect(() => createGeneticAlgorithm(options)).to.throwError();
        }
    );

    it('should throw error when properties are of not the expected class',
        () => {
            var options = { survivorSelection: {} };
            expect(() => createGeneticAlgorithm(options)).to.throwError();
        }
    );

    it('should create instance when given properties are correct',
        () => {
            expect(() => createGeneticAlgorithm()).to.not.throwError();
        }
    );

    describe('generatePopulation()', () => {
        it('should generate a population of correct size', () => {
            var instance = createGeneticAlgorithm();
            var population = instance.generatePopulation();
            expect(population.length).to.be(instance.populationSize);
        });

        it('should generate instances of `Individual` class', () => {
            var instance = createGeneticAlgorithm();
            var population = instance.generatePopulation();
            population.forEach(individual => expect(individual)
                .to.be.an(Individual));
        });

        it('should use `individual` method to create individuals', () => {
            var individual = sinon.spy();
            var instance = createGeneticAlgorithm({ individual });
            var population = instance.generatePopulation();
            expect(individual.called).to.be(true);
            expect(individual.callCount).to.be(instance.populationSize);
        });
    });
});

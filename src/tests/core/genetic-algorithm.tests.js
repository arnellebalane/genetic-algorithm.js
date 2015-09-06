import 'babel/polyfill';
import expect from 'expect.js';
import GeneticAlgorithm from '../../core/genetic-algorithm';
import Selection from '../../core/selection';
import Recombination from '../../core/recombination';
import Mutation from '../../core/mutation';
import { merge } from '../../utils';


function createGeneticAlgorithm(options = {}) {
    var defaultOptions = {
        selection: new Selection(),
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
            var options = { selection: new Object() };
            expect(() => createGeneticAlgorithm(options)).to.throwError();
        }
    );

    it('should create instance when given properties are correct',
        () => {
            expect(() => createGeneticAlgorithm()).to.not.throwError();
        }
    );
});

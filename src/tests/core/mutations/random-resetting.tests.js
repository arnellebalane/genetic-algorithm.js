import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import Allele from '../../../core/allele';
import Individual from '../../../core/individual';
import RandomResettingMutation from '../../../core/mutations/random-resetting';


function createIndividual() {
    var alleles = [];
    for (let i = 0; i < 3; i++) {
        alleles.push(new Allele(i + 1));
    }
    return new Individual(alleles, [1, 2, 3, 4, 5]);
}


describe('RandomResettingMutation', () => {
    it('should not randomize an allele when not within mutation rate', () => {
        var mutation = new RandomResettingMutation(0.5);
        var individual = createIndividual();
        var random = sinon.stub(Math, 'random').returns(0.75);
        var mutated = mutation.mutate(individual);
        random.restore();
        expect(mutated.alleles.map(allele => allele.value)).to.eql([1, 2, 3]);
    });

    it('should randomize allele when within mutation rate', () => {
        var mutation = new RandomResettingMutation(0.5);
        var individual = createIndividual();
        var random = sinon.stub(Math, 'random').returns(0.25);
        var allele = sinon.stub(individual, 'allele').returns(new Allele(1));
        var mutated = mutation.mutate(individual);
        random.restore();
        allele.restore();
        expect(mutated.alleles.map(allele => allele.value)).to.eql([1, 1, 1]);
    });
});

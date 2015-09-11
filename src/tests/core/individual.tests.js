import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import Allele from '../../core/allele';
import Individual from '../../core/individual';
import utils from '../../utils';


function createIndividual() {
    var alleles = [];
    for (let i = 0; i < 3; i++) {
        alleles.push(new Allele(i + 1));
    }
    return new Individual(alleles, [1, 2, 3, 4, 5]);
}


describe('Individual', () => {
    describe('#alleles', () => {
        it('getter should use the deconstruct method', () => {
            var individual = createIndividual();
            var deconstruct = sinon.spy(individual, 'deconstruct');
            var alleles = individual.alleles;
            expect(deconstruct.called).to.be(true);
            expect(alleles.map(allele => allele.value)).to.eql([1, 2, 3]);
        });

        it('setter should use the reconstruct method', () => {
            var individual = createIndividual();
            var reconstruct = sinon.spy(individual, 'reconstruct');
            individual.alleles = [3, 4, 5];
            expect(reconstruct.called).to.be(true);
            expect(individual.alleles).to.eql([3, 4, 5]);
        });
    });

    describe('deconstruct(alleles)', () => {
        it('should be called with the instance\'s current alleles', () => {
            var individual = createIndividual();
            var deconstruct = sinon.spy(individual, 'deconstruct');
            var alleles = individual.alleles;
            expect(deconstruct.calledWithExactly(alleles)).to.be(true);
            expect(alleles.map(allele => allele.value)).to.eql([1, 2, 3]);
        });
    });

    describe('allele()', () => {
        it('should return an allele contained in `possibleAlleles`', () => {
            var individual = createIndividual();
            var allele = individual.allele();
            expect([1, 2, 3, 4, 5]).to.contain(allele.value);
        });

        it('should not return the same allele all the time', () => {
            var individual = createIndividual();
            var count = 0;
            var repetitions = 0;
            var allele = individual.allele();
            while (count++ < 10) {
                if (individual.allele().value === allele.value) {
                    repetitions++;
                }
            }
            expect(repetitions).to.be.below(10);
        });
    });
});

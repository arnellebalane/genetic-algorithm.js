import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import Individual from '../../core/individual';
import utils from '../../utils';


describe('Individual', () => {
    describe('#alleles', () => {
        it('getter should use the deconstruct method', () => {
            var individual = new Individual([1, 2, 3], [1, 2, 3, 4, 5]);
            var deconstruct = sinon.spy(individual, 'deconstruct');
            var alleles = individual.alleles;
            expect(deconstruct.called).to.be(true);
            expect(alleles).to.eql([1, 2, 3]);
        });

        it('setter should use the reconstruct method', () => {
            var individual = new Individual([1, 2, 3], [1, 2, 3, 4, 5]);
            var reconstruct = sinon.spy(individual, 'reconstruct');
            individual.alleles = [3, 4, 5];
            expect(reconstruct.called).to.be(true);
            expect(individual.alleles).to.eql([3, 4, 5]);
        });
    });

    describe('deconstruct(alleles)', () => {
        it('should be called with the instance\'s current alleles', () => {
            var individual = new Individual([1, 2, 3], [1, 2, 3, 4, 5]);
            var deconstruct = sinon.spy(individual, 'deconstruct');
            var alleles = individual.alleles;
            expect(deconstruct.calledWithExactly([1, 2, 3])).to.be(true);
            expect(alleles).to.eql([1, 2, 3]);
        });
    });

    describe('allele()', () => {
        it('should return an element of `possibleAlleles`', () => {
            var individual = new Individual([1, 2, 3], [1, 2, 3, 4, 5]);
            var allele = individual.allele();
            expect([1, 2, 3, 4, 5]).to.contain(allele);
        });

        it('should not return the same allele all the time', () => {
            var possibleAlleles = [1, 2, 3, 4, 5];
            var individual = new Individual([1, 2, 3], possibleAlleles);
            var count = 0;
            var repetitions = 0;
            var allele = individual.allele();
            while (count++ < 10) {
                if (individual.allele() === allele) {
                    repetitions++;
                }
            }
            expect(repetitions).to.be.below(10);
        });
    });
});

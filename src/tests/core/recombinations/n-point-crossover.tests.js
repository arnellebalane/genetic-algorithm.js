import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import Allele from '../../../core/allele';
import Individual from '../../../core/individual';
import nPointCrossover from '../../../core/recombinations/n-point-crossover';


function createIndividual(alleles) {
    alleles = alleles.map(allele => new Allele(allele));
    return new Individual(alleles, [1, 2, 3, 4, 5]);
}


describe('nPointCrossover', () => {
    describe('recombine(a, b)', () => {
        it('should recombine given parents to produce children', () => {
            var a = createIndividual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            var b = createIndividual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
            var recombination = new nPointCrossover(3);
            var breakpoints = sinon.stub(recombination, 'breakpoints')
                .returns([2, 5, 8]);
            var [c, d] = recombination.recombine(a, b);
            breakpoints.restore();
            expect(c.alleles.map(allele => allele.value))
                .to.eql([1, 2, 6, 8, 10, 6, 7, 8, 18, 20]);
            expect(d.alleles.map(allele => allele.value))
                .to.eql([2, 4, 3, 4, 5, 12, 14, 16, 9, 10]);
        });

        it('should not modify the alleles of the given parents', () => {
            var a = createIndividual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            var b = createIndividual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
            var recombination = new nPointCrossover(3);
            var [c, d] = recombination.recombine(a, b);
            expect(a.alleles.map(allele => allele.value))
                .to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            expect(b.alleles.map(allele => allele.value))
                .to.eql([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
        });
    });

    describe('breakpoints(size)', () => {
        it('should return correct number of breakpoints', () => {
            var recombination = new nPointCrossover(3);
            var breakpoints = recombination.breakpoints(10);
            expect(breakpoints.length).to.be(3);
        });

        it('should return breakpoints within the given size', () => {
            var recombination = new nPointCrossover(3);
            var breakpoints = recombination.breakpoints(10);
            breakpoints.forEach(breakpoint =>
                expect(breakpoint).to.be.below(10));
        });

        it('should return breakpoints in ascending order', () => {
            var recombination = new nPointCrossover(3);
            var random = sinon.stub(Math, 'random');
            random.onCall(0).returns(0.5);
            random.onCall(1).returns(0.3);
            random.onCall(2).returns(0.8);
            var breakpoints = recombination.breakpoints(10);
            random.restore();
            expect(breakpoints).to.eql([3, 5, 8]);
        });
    });
});

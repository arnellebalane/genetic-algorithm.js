import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import ElitismSelection from '../../../core/selections/elitism';


function createPopulation(size = 5) {
    var population = [];
    for (let i = 0; i < size; i++) {
        let fitness = sinon.stub().returns(Math.random());
        population.push({ fitness: () => fitness });
    }
    return population;
}


describe('ElitismSelection', () => {
    it('should return correct number of survivors', () => {
        var population = createPopulation();
        var selection = new ElitismSelection(0);
        var survivors = selection.select(population);
        expect(survivors.length).to.be(0);

        selection = new ElitismSelection(0.5);
        survivors = selection.select(population);
        expect(survivors.length).to.be(2);

        selection = new ElitismSelection(1);
        survivors = selection.select(population);
        expect(survivors.length).to.be(5);
    });

    it('should return the fittest individuals in population', () => {
        var population = createPopulation();
        var selection = new ElitismSelection(0.5);
        var survivors = selection.select(population);
        var sorted = population.sort((a, b) => {
            if (a.fitness() < b.fitness()) {
                return -1;
            } else if (b.fitness() < a.fitness()) {
                return 1;
            }
            return 0;
        });
        expect(survivors[0].fitness()).to.be(sorted[0].fitness());
        expect(survivors[1].fitness()).to.be(sorted[1].fitness());
    });

    it('should make use of rank method to rank population', () => {
        var population = createPopulation();
        var selection = new ElitismSelection(0.5);
        var rank = sinon.spy(selection, 'rank');
        var survivors = selection.select(population);
        expect(rank.calledOnce).to.be(true);
    });
});

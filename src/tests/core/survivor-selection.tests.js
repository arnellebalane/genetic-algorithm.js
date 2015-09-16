import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import SurvivorSelection from '../../core/survivor-selection';


function createPopulation(size = 5) {
    var population = [];
    for (let i = 0; i < size; i++) {
        var fitness = sinon.stub().returns(Math.random());
        population.push({ fitness: fitness });
    }
    return population;
}


describe('SurvivorSelection', () => {
    describe('rank(population, order)', () => {
        it('should rank the population by increasing fitness', () => {
            var population = createPopulation();
            var selection = new SurvivorSelection(0.5);
            var ranked = selection.rank(population, 1);
            for (let i = 1; i < ranked.length; i++) {
                expect(ranked[i].fitness())
                    .to.be.above(ranked[i - 1].fitness());
            }
        });

        it('should rank the population by decreasing fitness', () => {
            var population = createPopulation();
            var selection = new SurvivorSelection(0.5);
            var ranked = selection.rank(population, -1);
            for (let i = 1; i < ranked.length; i++) {
                expect(ranked[i].fitness())
                    .to.be.below(ranked[i - 1].fitness());
            }
        });

        it('should not modify the given population', () => {
            var population = createPopulation();
            var backupPopulation = [...population];
            var selection = new SurvivorSelection(0.5);
            var ranked = selection.rank(population, 1);
            expect(population.map(a => a.fitness()))
                .to.eql(backupPopulation.map(a => a.fitness()));
        });
    });
});

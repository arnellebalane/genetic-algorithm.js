import 'babel/polyfill';
import expect from 'expect.js';
import sinon from 'sinon';
import Individual from '../../../core/individual';
import TournamentParentSelection
    from '../../../core/parent-selections/tournament';


function createPopulation(size = 5) {
    var population = [];
    for (let i = 0; i < size; i++) {
        var fitness = sinon.stub().returns(Math.random());
        population.push({ fitness: fitness });
    }
    return population;
}


describe('TournamentParentSelection', () => {
    describe('select(population)', () => {
        it('should return parents with same size as given population', () => {
            var population = createPopulation();
            var selection = new TournamentParentSelection(3);
            var parents = selection.select(population);
            expect(parents.length).to.be(population.length);
        });
    });
});

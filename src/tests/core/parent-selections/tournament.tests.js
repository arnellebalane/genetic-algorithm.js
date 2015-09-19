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

        it('should return fittest parents from their groups', () => {
            var population = createPopulation();
            var selection = new TournamentParentSelection(3);
            var group = sinon.stub(selection, 'group');
            var p = population;
            group.onCall(0).returns([p[0], p[3], p[2]]);
            group.onCall(1).returns([p[4], p[1], p[3]]);
            group.onCall(2).returns([p[1], p[3], p[1]]);
            group.onCall(3).returns([p[1], p[0], p[3]]);
            group.onCall(4).returns([p[1], p[2], p[2]]);
            var parents = selection.select(population);
            group.restore();
            var expected = [
                Math.max(...[p[0], p[3], p[2]].map(a => a.fitness())),
                Math.max(...[p[4], p[1], p[3]].map(a => a.fitness())),
                Math.max(...[p[1], p[3], p[1]].map(a => a.fitness())),
                Math.max(...[p[1], p[0], p[3]].map(a => a.fitness())),
                Math.max(...[p[1], p[2], p[2]].map(a => a.fitness()))
            ];
            expect(parents.map(parent => parent.fitness())).to.eql(expected);
        });

        it('should not modify the given population', () => {
            var population = createPopulation();
            var backupPopulation = [...population];
            var selection = new TournamentParentSelection(3);
            var parents = selection.select(population);
            expect(population.map(a => a.fitness()))
                .to.eql(backupPopulation.map(a => a.fitness()));
        });
    });

    describe('group(population)', () => {
        it('should return a group with the correct size', () => {
            var population = createPopulation();
            var selection = new TournamentParentSelection(3);
            var group = selection.group(population);
            expect(group.length).to.be(3);
        });

        it('should be called with the given population', () => {
            var population = createPopulation();
            var selection = new TournamentParentSelection(3);
            var group = sinon.spy(selection, 'group');
            var parents = selection.select(population);
            group.restore();
            expect(group.alwaysCalledWith(population)).to.be(true);
        });
    });

    describe('rank(population, order)', () => {
        it('should rank the population by increasing fitness', () => {
            var population = createPopulation(5);
            var selection = new TournamentParentSelection(3);
            var ranked = selection.rank(population, 1);
            for (let i = 1; i < ranked.length; i++) {
                expect(ranked[i].fitness())
                    .to.be.above(ranked[i - 1].fitness());
            }
        });

        it('should rank the population by decreasing fitness', () => {
            var population = createPopulation(5);
            var selection = new TournamentParentSelection(3);
            var ranked = selection.rank(population, -1);
            for (let i = 1; i < ranked.length; i++) {
                expect(ranked[i].fitness())
                    .to.be.below(ranked[i - 1].fitness());
            }
        });

        it('should not modify the given population', () => {
            var population = createPopulation(5);
            var backupPopulation = [...population];
            var selection = new TournamentParentSelection(3);
            var ranked = selection.rank(population, 1);
            expect(population.map(a => a.fitness()))
                .to.eql(backupPopulation.map(a => a.fitness()));
        });
    });
});

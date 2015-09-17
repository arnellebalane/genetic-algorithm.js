import 'babel/polyfill';
import ParentSelection from '../parent-selection';


export default class TournamentParentSelection extends ParentSelection {
    constructor(k) {
        super();
        this.k = k;
    }

    select(population) {
        var parents = [];
        while (parents.length !== population.length) {
            let group = [];
            while (group.length !== this.k) {
                let index = Math.floor(Math.random() * population.length);
                group.push(population[index]);
            }
            group = this.rank(group);
            parents.push(group[0]);
        }
        return parents;
    }

    rank(population, order = 1) {
        return [...population].sort((a, b) => {
            if (a.fitness() < b.fitness()) {
                return -1 * order;
            } else if (b.fitness() < a.fitness()) {
                return 1 * order;
            }
            return 0;
        });
    }
}

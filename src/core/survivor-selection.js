import 'babel/polyfill';
import { NotImplementedError } from '../errors';


export default class SurvivorSelection {
    constructor(survivalRate) {
        this.survivalRate = survivalRate;
    }

    select(population) {
        throw new NotImplementedError(`${this.constructor.name}.select`);
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

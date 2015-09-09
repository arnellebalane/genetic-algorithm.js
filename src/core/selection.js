import 'babel/polyfill';
import { NotImplementedError } from '../errors';


export default class Selection {
    constructor(survivalRate) {
        this.survivalRate = survivalRate;
    }

    select(population) {
        throw new NotImplementedError(`${this.constructor.name}.select`);
    }

    rank(population) {
        return population.sort((a, b) => {
            if (a.fitness() < b.fitness()) {
                return -1;
            } else if (b.fitness() < a.fitness()) {
                return 1;
            }
            return 0;
        });
    }
}

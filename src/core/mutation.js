import 'babel/polyfill';
import { NotImplementedError } from '../errors';


export default class Mutation {
    constructor(mutationRate) {
        this.mutationRate = mutationRate;
    }

    mutate(individual) {
        throw new NotImplementedError(`${this.constructor.name}.mutate`);
    }
}

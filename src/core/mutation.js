import 'babel/polyfill';
import { NotImplementedError } from '../errors';


export default class Mutation {
    mutate(individual) {
        throw new NotImplementedError(`${this.constructor.name}.mutate`);
    }
}

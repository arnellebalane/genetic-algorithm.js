import 'babel/polyfill';
import { NotImplementedError } from './errors';


export default class Recombination {
    recombine(a, b) {
        throw new NotImplementedError(`${this.constructor.name}.recombine`);
    }
}

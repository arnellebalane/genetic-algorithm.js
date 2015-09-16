import 'babel/polyfill';
import { NotImplementedError } from '../errors';


export default class ParentSelection {
    select(population) {
        throw new NotImplementedError(`${this.constructor.name}.select`);
    }
}

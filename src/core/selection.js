import 'babel/polyfill';
import { NotImplementedError } from './errors';


export default class Selection {
    select(population) {
        throw new NotImplementedError(`${this.constructor.name}.select`);
    }
}

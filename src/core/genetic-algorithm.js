import 'babel/polyfill';
import Selection from './selection';
import Recombination from './recombination';
import Mutation from './mutation';
import { MissingRequiredPropertyError, ImproperlyConfiguredError }
    from '../errors';
import { extend, items } from '../utils';


const properties = {
    populationSize: { required: true, type: 'number' },
    survivalRate: { required: true, type: 'number' },
    selection: { required: true, class: Selection },
    recombination: { required: true, class: Recombination },
    mutation: { required: true, class: Mutation }
};


export default class GeneticAlgorithm {
    constructor(options = {}) {
        extend(this, options);

        for (let [key, config] of items(properties)) {
            if (config.required && !this.hasOwnProperty(key)) {
                throw new MissingRequiredPropertyError(key);
            } else if (config.class && !(this[key] instanceof config.class)
                    || config.type && typeof this[key] !== config.type) {
                throw new ImproperlyConfiguredError(key);
            }
        }
    }
}
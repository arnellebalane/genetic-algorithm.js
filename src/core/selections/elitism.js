import 'babel/polyfill';
import Selection from '../selection';


export default class ElitismSelection extends Selection {
    select(population) {
        population = this.rank(population);
        return population.slice(0, population.length * this.survivalRate);
    }
}

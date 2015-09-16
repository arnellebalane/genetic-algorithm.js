import 'babel/polyfill';
import SurvivorSelection from '../survivor-selection';


export default class ElitismSelection extends SurvivorSelection {
    select(population) {
        population = this.rank(population);
        return population.slice(0, population.length * this.survivalRate);
    }
}

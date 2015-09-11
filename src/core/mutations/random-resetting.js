import 'babel/polyfill';
import Mutation from '../mutation';


export default class RandomResettingMutation extends Mutation {
    mutate(individual) {
        var alleles = individual.alleles;
        for (let i = 0; i < alleles.length; i++) {
            let chance = Math.random();
            if (chance <= this.mutationRate) {
                alleles[i] = individual.allele();
            }
        }
        individual.alleles = alleles;
        return individual;
    }
}

import 'babel/polyfill';


export default class Allele {
    constructor(value) {
        this.value = value;
    }

    clone() {
        return new Allele(this.value);
    }
}

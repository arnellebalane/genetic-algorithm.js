import 'babel/polyfill';


export class GeneticAlgorithmError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = (new Error()).stack;
        this.message = message;
    }
}


export class NotImplementedError extends GeneticAlgorithmError {
    constructor(message) {
        super(message);
    }
}

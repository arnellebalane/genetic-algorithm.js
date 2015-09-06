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
        super(`NotImplemented: ${message}`);
    }
}


export class MissingRequiredPropertyError extends GeneticAlgorithmError {
    constructor(message) {
        super(`MissingRequiredProperty: ${message}`);
    }
}


export class ImproperlyConfiguredError extends GeneticAlgorithmError {
    constructor(message) {
        super(`ImproperlyConfigured: ${message}`);
    }
}

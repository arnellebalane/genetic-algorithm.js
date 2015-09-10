import 'babel/polyfill';


export function merge(...objects) {
    return objects.reduce((merged, item) => extend(merged, item), {});
}


export function* items(object) {
    for (let key of Object.keys(object)) {
        yield [key, object[key]];
    }
}


export function extend(base, extension) {
    for (let [key, value] of items(extension)) {
        base[key] = value;
    }
    return base;
}


export function sum(...values) {
    return values.reduce((total, value) => total + value, 0);
}


export function shuffle(array) {
    return [...array].sort((a, b) => Math.random() - 0.5);
}

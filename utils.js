import 'babel/polyfill';


function merge(...objects) {
    return objects.reduce((merged, item) => extend(merged, item), {});
}


function* items(object) {
    for (let key of Object.keys(object)) {
        yield [key, object[key]];
    }
}


function extend(base, extension) {
    for (let [key, value] of items(extension)) {
        base[key] = value;
    }
    return base;
}


exports.merge = merge;
exports.items = items;
exports.extend = extend;
